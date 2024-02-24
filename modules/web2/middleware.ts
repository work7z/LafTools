import { deleteCookie, getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import _ from "lodash";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export type LocaleType = {
  langInHttp: string;
  langInHttpArr: string[];
  langInURL: string;
  langIni18n: string;
};
export let zhCNLocale: LocaleType = {
  langInHttpArr: ["zh-cn", "zh-sg", "zh-hans"],
  langInHttp: "zh-cn",
  langInURL: "cn",
  langIni18n: "zh_CN",
};
export let all_locales: LocaleType[] = [
  {
    langInHttpArr: ["en-US", "en-GB", "en-AU", "en-CA", "en-NZ", "en-ZA"],
    langInHttp: "en-US",
    langInURL: "en",
    langIni18n: "en_US",
  },
  zhCNLocale,
  {
    langInHttpArr: ["zh-hk", "zh-tw", "zh-mo", "zh-my"],
    langInHttp: "zh-hk",
    langInURL: "hk",
    langIni18n: "zh_HK",
  },
];
let defaultLocale = zhCNLocale; // default locale is zh_CN
const locales_http = all_locales.map((x) => x.langInHttp);
const rever_locales_http = all_locales
  .map((x) => x.langInHttpArr)
  .reverse()
  .map((x) => {
    return x.map((y) => _.toLower(y));
  });

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  let acceptLanguage = _.toLower(request.headers.get("accept-language") + "");
  let val = defaultLocale.langInHttp;
  let ack = false;
  rever_locales_http.every((locale) => {
    _.every(locale, (x) => {
      if (acceptLanguage?.includes(x)) {
        val = _.first(locale) || defaultLocale.langInHttp;
        ack = true;
      }
      return !ack;
    });
    return !ack;
  });
  return val;
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  let finalLocaleObject: LocaleType = zhCNLocale; // by default, we use zh_CN
  const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  requestHeaders.set("x-path", request.nextUrl.pathname);
  requestHeaders.set("x-hostname", request.nextUrl.hostname);
  let handleLocaleSet = () => {
    requestHeaders.set("x-locale", finalLocaleObject.langInHttp);
  };
  if (pathname != "/" && pathname != "" && pathname.indexOf("/api") == -1) {
    const pathnameHasLocale = all_locales.some((locale) => {
      let mat =
        pathname.startsWith(`/${locale.langInURL}`) ||
        pathname === `/${locale.langInURL}`;
      if (mat) {
        finalLocaleObject = locale;
      }
      return mat;
    });
    if (!pathnameHasLocale) {
      // Redirect if there is no locale
      const locale = getLocale(request);
      let localeObj = all_locales.find((x) => x.langInHttp === locale);
      finalLocaleObject = localeObj || all_locales[0];
      request.nextUrl.pathname = `/${localeObj?.langInURL}${pathname}`;
      // e.g. incoming request is /products
      // The new URL is now /en-US/products
      handleLocaleSet();
      return Response.redirect(request.nextUrl);
    }
  }
  handleLocaleSet();

  requestHeaders.set("x-url", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
  runtime: "experimental-edge", // for Edge API Routes only
  unstable_allowDynamic: ["/node_modules/lodash/**"],
};
