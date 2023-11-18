// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Fri, 17 Nov 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
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
  Section,
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
  SectionCard,
} from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Dot } from "../../utils/TranslationUtils";
import exportUtils from "../../utils/ExportUtils";
import forgeSlice from "../../slice/ForgeSlice";
import { LafTools_DOC_HOME } from "../../styles/constants";
import systemSlice, { ACTION_initAllDataAtOnce } from "../../slice/SystemSlice";

interface PassProp {}

export default (props: PassProp): any => {
  let val_1 = exportUtils.useSelector((val) => ({
    dark: val.forge.DarkThemeMode,
  }));
  let dis = exportUtils.dispatch();
  return (
    <div>
      <ButtonGroup fill={true} vertical={false}>
        <Button
          small={true}
          // text="Software Updates"
          intent={val_1.dark ? "primary" : "none"}
          title={Dot(`r_n6h`, `Light or Dark Mode`)}
          text=""
          icon={val_1.dark ? "flash" : "moon"}
          onClick={() => {
            dis(forgeSlice.actions.updateDarkMode({ isDark: !val_1.dark }));
          }}
        />
        <Button
          small={true}
          // text="Software Updates"
          intent={"none"}
          title={Dot(`lQFII`, `Re-trigger the initialization`)}
          text=""
          icon={`refresh`}
          onClick={() => {
            dis(ACTION_initAllDataAtOnce());
          }}
        />
        <AnchorButton
          small={true}
          icon="map"
          href={LafTools_DOC_HOME}
          target="_blank"
          title={Dot(`x009`, `To access our usage documentation`)}
        ></AnchorButton>
      </ButtonGroup>
      <Section
        title={Dot(`about_LafTools_toolbox`, "About LafTools")}
        collapsible
      >
        <SectionCard>
          <p>
            {Dot(
              "toolbox_wiki",
              "A toolbox is a container designed to organize, transport, and safeguard an owner's tools. It is commonly used in various fields, such as trade, hobbies, and DIY projects, and its contents vary depending on the craft. In computing, the term toolbox refers to a collection of subroutines (or functions) and global variables that are used to implement missing functionality using capabilities available in the core software."
            )}
          </p>
          <p>
            {Dot(
              "from_my_part",
              "The preceding paragraph, cited from Wikipedia, explains what a toolbox is. As for the mission of LafTools, we aim to provide a versatile assistant for programmers to work efficiently, offering a comprehensive set of professional tools in the computer science domain. To ensure a seamless user experience, we prioritize using native technology to develop these tools, starting with version 2. Stay tuned for future updates and additional functionalities that will be added to LafTools."
            )}
          </p>
        </SectionCard>
      </Section>
      {/* <Section title={t("fyr", "Other things ")} collapsible>
        <SectionCard>
          <p>
            {t(
              "x01293",
              `To access our official website, please follow below links.`
            )}
          </p>
          <ul>
            <li>{t(`x0123123`, "")}: https://LafTools.cc</li>
          </ul>
        </SectionCard>
      </Section> */}
    </div>
  );
};
