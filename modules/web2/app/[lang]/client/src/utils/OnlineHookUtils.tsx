// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 6 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2024 - Present, https://laf-tools.com and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { logutils } from "./LogUtils";
import _ from "lodash";
import TranslationUtils, { Dot } from "./cTranslationUtils";
import QS from "querystring";
import axios, { AxiosError, AxiosResponse } from "axios";
import gutils from "./GlobalUtils";
import devJson from "../static/dev.json";
import TokenUtils from "./TokenUtils";
import exportUtils from "./ExportUtils";
import { useEffect, useMemo } from "react";
import { ifError } from "assert";
import { useHistory } from "react-router";
import { PayloadValueData } from "../types/constants";
import onlineAPISlice from "../reducers/onlineAPISlice";
import { PROTECTED_PATH_LIST, URL_NAV_FORM_SIGN_IN } from "../types/online";
import QueryUtils from "./QueryUtils";

export function getPayloadValue<T>(
  x: PayloadValueData<T> | undefined | null
): T | null {
  if (_.isNil(x)) {
    return null;
  }
  return x.payload.value;
}

export default {
  anyError(e): string[] {
    return (
      _.get(e, "data.payload.value.errors") ||
      _.get(e, "error.data.payload.value.errors")
    );
  },
  useUserStatusHook() {
    let userStatus = onlineAPISlice.useGetUserStatusQuery(
      exportUtils.refresh_v1(),
      {
        ...exportUtils.refresh_v2(),
        pollingInterval: 9000,
      }
    );

    let hist = useHistory();

    useEffect(() => {
      if (userStatus.isSuccess) {
        let crtUser = userStatus.data.payload.value;
        if (!crtUser.isLogin) {
          let pathname = hist.location.pathname;
          let pathList = PROTECTED_PATH_LIST;
          _.every(pathList, (x) => {
            if (pathname.toString().startsWith(x)) {
              hist.push(URL_NAV_FORM_SIGN_IN);
              setTimeout(() => {
                window.location.reload();
              }, 3000);
              return false;
            }
            return true;
          });
        } else {
          //
        }
      }
    }, [userStatus.status]);

    return getPayloadValue(userStatus.data);
  },
  useOnlinePlansData() {
    let planRes = onlineAPISlice.useGetPlanInitDataQuery(
      {}
      //   exportUtils.refresh_v1() as any,
      //   exportUtils.refresh_v2()
    );
    let r = QueryUtils.validateResult(planRes, {
      label: Dot("gDjbs", "Historical Data"),
    });

    let a = useMemo(() => {
      let currentMonthlyRMB = 0;
      let currentMonthlyUSD = 0;
      let currentYearlyRMB = 0;
      let currentYearlyUSD = 0;
      if (planRes.isSuccess) {
        let allPlans = planRes.data?.payload.value.allPlans || [];
        // assign value currentMonthlyRMB, currentMonthlyUSD, currentMaxRMBYearly,  currentMaxUSDYearly from the list according to the period label
        // if the period label is "1M", then assign the value to currentMonthlyRMB, currentMonthlyUSD
        // if the period label is "1Y", then assign the value to currentMaxRMBYearly, currentMaxUSDYearly
        _.every(allPlans, (item) => {
          if (item.planCode == "premium_5_devices") {
            _.map(item.v2ProductPricingList, (x) => {
              if (x.pricingPeriod == "1M") {
                currentMonthlyRMB = x.priceRMB;
                currentMonthlyUSD = x.priceUSD;
              } else if (x.pricingPeriod == "1Y") {
                currentYearlyRMB = x.priceRMB;
                currentYearlyUSD = x.priceUSD;
              }
            });
            return false;
          } else {
            return true;
          }
        });
      }
      let ccy = TranslationUtils.IsChinese() ? "￥" : "$";
      return {
        showMonthlyLabel: {
          ccy: ccy,
          value: TranslationUtils.IsChinese()
            ? currentMonthlyRMB
            : currentMonthlyUSD,
        },
        showYearlyLabel: {
          ccy: ccy,
          value: TranslationUtils.IsChinese()
            ? currentYearlyRMB
            : currentYearlyUSD,
        },
        currentYearlyRMB: currentYearlyRMB,
        currentYearlyUSD: currentYearlyUSD,
        currentMonthlyRMB,
        currentMonthlyUSD,
        planRes,
        planRes_r: r,
      };
    }, [r, planRes.status]);
    return a;
  },
};
