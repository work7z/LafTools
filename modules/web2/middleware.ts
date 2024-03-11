import { deleteCookie, getCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import _ from "lodash";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import queryString from "query-string";
import i18nItems, { I18nItem } from "./app/__CORE__/config/i18n";

let _ = {
  every: (a: any, b: any) => {
    return a.every(b);
  },
  first: (a: any) => {
    return a[0];
  },
  toLower: (a: any) => {
    return a.toLowerCase();
  },
};

export type LocaleType = {
  langInHttp: string;
  langInHttpArr: string[];
  langInURL: string;
  langIni18n: string;
};
let zhCNI18nItem = i18nItems.find((x) => x.Value === "zh_CN");
let enUSI18nItem = i18nItems.find((x) => x.Value === "en_US");
if (!zhCNI18nItem) {
  throw new Error("zh_CN not found in i18nItems");
}
if (!enUSI18nItem) {
  throw new Error("en_US not found in i18nItems");
}
let convertI18nItemToLocale = (i18nItem: I18nItem): LocaleType => {
  return {
    langInHttpArr: i18nItem.LangInHttpLocaleCode || [],
    langInHttp: _.first(i18nItem.LangInHttpLocaleCode) || "unknown",
    langInURL: i18nItem.LangInExplicitURL || "",
    langIni18n: i18nItem.Value,
  };
};
export let zhCNLocale: LocaleType = convertI18nItemToLocale(zhCNI18nItem);
export let enUSLocale: LocaleType = convertI18nItemToLocale(enUSI18nItem);
export let all_locales: LocaleType[] = i18nItems.map((x) =>
  convertI18nItemToLocale(x),
);
let defaultLocale = enUSLocale; // default locale is zh_CN
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
  const requestHeaders = new Headers(request.headers);
  const { pathname } = request.nextUrl;
  requestHeaders.set("x-path", request.nextUrl.pathname);
  let thatHostname = request.nextUrl.hostname;
  requestHeaders.set("x-hostname", thatHostname);
  let finalLocaleObject: LocaleType =
    thatHostname == "laf-tools.com" ? zhCNLocale : enUSLocale; // zhCNLocale; // by default, we use zh_CN
  let a = request.nextUrl.search;
  requestHeaders.set("x-search", a);

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
  unstable_allowDynamic: [
    "/node_modules/lodash/**",
    "./node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/lodash.js",
  ],
};
