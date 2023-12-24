import { ExtensionInfo, ExtensionVM } from "../../../purejs-types";
import { Dot } from "../../../utils/translation";

let v: ExtensionVM = {
  Layout: "form",
  Actions: [
    {
      Id: "md5.text",
      Label: Dot("vQqqe", "Get MD5 Hash"),
      CallFuncList: Dot("md5.ConvertText"),
    },
    // {
    //   Id: "md5.file",
    //   Label: Dot("vu10K", "MD5 from File"),
    //   CallFuncList: Dot("md5.ConvertFile"),
    // },
  ],
  Info: {
    Id: "md5",
    Label: Dot("AWqXD", "MD5"),
    Description: Dot(
      "1g20QB9",
      `The MD5 message-digest algorithm is a widely used hash function producing a 128-bit hash value. \n\nMD5 was designed by Ronald Rivest in 1991 to replace an earlier hash function MD4, and was specified in 1992 as RFC 1321. MD5 can be used as a checksum to verify data integrity against unintentional corruption. Historically it was widely used as a cryptographic hash function; however it has been found to suffer from extensive vulnerabilities. \n\nIt remains suitable for other non-cryptographic purposes, for example for determining the partition for a particular key in a partitioned database, and may be preferred due to lower computational requirements than more recent Secure Hash Algorithms.`,
    ),
  },
};

export default v;
