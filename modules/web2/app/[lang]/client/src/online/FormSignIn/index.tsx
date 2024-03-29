// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Sat, 6 Jan 2024
// Author: LafTools Team - FX <work7z@outlook.com>
// Description: 
// Copyright (C) 2024 - Present, https://laftools.dev and https://codegen.cc
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

import localforage from "localforage";
import {
  Callout,
  PanelStack,
  ProgressBar,
  AnchorButton,
  Tooltip,
  Dialog,
  Drawer,
  Overlay,
  Alert,
  RadioGroup,
  MenuItem,
  Radio,
  ButtonGroup,
  TextArea,
  HotkeysProvider,
  Intent,
  Position,
  Toaster,
  Checkbox,
  NumericInput,
  FormGroup,
  HTMLSelect,
  ControlGroup,
  InputGroup,
  Navbar,
  NavbarHeading,
  NonIdealState,
  NavbarDivider,
  NavbarGroup,
  Alignment,
  Classes,
  Icon,
  Card,
  Elevation,
  Button,
} from "@blueprintjs/core";
import "./index.scss";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import DateUtils from "../../utils/DateUtils";
import _ from "lodash";
import AlertUtils from "../../utils/AlertUtils";

import exportUtils from "../../utils/ExportUtils";
import onlineAPISlice from "../../reducers/onlineAPISlice";
import { CLZ_FORM_SINGLE_CLZ } from "../../types/styles";
import { Dot } from "../../utils/cTranslationUtils";
import { URL_NAV_FORM_SIGN_UP, URL_NAV_FORM_USER_PASSWORD, getOnlineFullLink } from "../../types/online";
import VerifyCodeFormGroup from "../../containers/VerifyCodeFormGroup";
import OnlineHookUtils, { getPayloadValue } from "../../utils/OnlineHookUtils";
import PasswordInput from "../../components/PasswordInput";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyCode, setVerifyCode] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // handle form submission
  }

  let [trigger, result, lastPromiseInfo] =
    onlineAPISlice.useLazyUserForSignInQuery({});
  let signInRes = getPayloadValue(result.data);
  const [kety, setKev] = useState("1");

  const hist = useHistory();
  const dis = exportUtils.dispatch();

  return (
    <div className="common-form-box w-full ">
      <Card className={"" + " w-full  margin-0-auto bg-transparent "} style={{
        paddingTop: '12px'
      }}>
        {/* <h2>{Dot("7MOO1", "Sign In")}</h2> */}
        <form onSubmit={handleSubmit}>
          <FormGroup label={Dot("oNLxH", "Username")} labelFor="username">
            <InputGroup
              large
              id="username"
              placeholder={Dot("V6XEO", "Enter username or Email")}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </FormGroup>
          <div className="pt-form-helper-text text-right">
            <a target="_blank" href={getOnlineFullLink(URL_NAV_FORM_USER_PASSWORD)}>
              {Dot("2D9a6", "Forgot Password?")}
            </a>
          </div>
          <FormGroup label={Dot("zc3Hf", "Password")} labelFor="password">
            <PasswordInput
              large
              id="password"
              type="password"
              placeholder={Dot("vOjNC", "Enter password or secure key")}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <VerifyCodeFormGroup
            key={kety}
            verifyCode={verifyCode}
            setVerifyCode={setVerifyCode}
          />
          <Button
            type="button"
            onClick={() => {
              trigger({
                username,
                password,
                verifyCode,
              }).then((x) => {
                let err = OnlineHookUtils.anyError(x);
                if (err) {
                  // AlertUtils.popError(
                  //   new Error(
                  //     Dot("FBVyc", "Please reinput the verification code")
                  //   )
                  // );
                  AlertUtils.popError(new Error(_.join(err, ",")));
                  setKev(_.uniqueId(""));
                  return;
                } else {
                  AlertUtils.popOK(
                    Dot("s4OeX", "Sign in the system successfully")
                  );
                  // hist.push(URL_NAV_USER_CENTRE);
                }
              });
            }}
            loading={result.isLoading}
            intent="primary"
            fill
            large
            text={Dot("fV_1P", "Sign In")}
          />
        </form>
        <div
          className="pt-form-helper-text text-right"
          style={{ marginTop: "15px" }}
        >
          {Dot("ssDaOq", "New to LafTools?")}
          <a target="_blank" href={getOnlineFullLink(URL_NAV_FORM_SIGN_UP)}>
            {Dot("32D9a6", "Create an Account")}
          </a>
        </div>
      </Card>
    </div>
  );
}
