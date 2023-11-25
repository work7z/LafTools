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
  Popover,
  Menu,
  MenuDivider,
} from "@blueprintjs/core";
import {
  VAL_CSS_MENU_TITLE_PANEL,
  VAL_CSS_TAB_TITLE_PANEL,
} from "../../FixedWorkBench/definitions/WB_Types";

export default () => {
  return (
    <div
      className=" common-bg-color-align "
      style={{
        height: `calc(100vh - ${VAL_CSS_MENU_TITLE_PANEL}px)`,
      }}
    >
      <div>this is main tools</div>
    </div>
  );
};
