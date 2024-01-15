import Operation from "./Operation.mjs";

export default {
  load: (): Promise<Operation> => {
    let variable = "ToBase64";
    return import(`./impl/${variable}.js`);
  },
};
