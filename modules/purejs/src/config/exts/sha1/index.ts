import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";
let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "sha1.text",
      Label: Dot("xo3poi", "Get SHA1 Hash"),
      Tooltip: Dot("xECm8j", "Click here to encrypt your input text"),
      CallFuncList: Dot("xsha1.ConvertText"),
    },
    // {
    //   Id: "sha1.file",
    //   Label: Dot("xgwo79", "SHA1 from File"),
    //   CallFuncList: Dot("xsha1.ConvertFile"),
    // },
  ],
  Info: {
    Id: "sha1",
    Label: Dot("xTtyeA", "SHA1"),
    Description: Dot(
      "gh9zxxA",
      "SHA-1, or Secure Hash Algorithm 1, is a cryptographic hash function that takes an input (or 'message') and returns a fixed-size 160-bit (20-byte) hash value. \n\nThis is typically rendered as a hexadecimal number, 40 digits long. It's commonly used in various security applications and protocols, including TLS and SSL, PGP, SSH, and IPsec. \n\nHowever, SHA-1 is not considered secure against well-funded attackers. As such, it's recommended to use stronger hash functions like SHA-256 or SHA-3.",
    ),
  },
};

export default v;
