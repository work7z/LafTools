// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sun, 14 Jan 2024
// Second Author: Ryan Laf
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

/**
 * @author h345983745
 * @copyright Crown Copyright 2019
 * @license Apache-2.0
 */
import Operation from "../Operation.tsx";
import OperationError from "../errors/OperationError.mjs";

/**
 * DNS over HTTPS operation
 */
class DNSOverHTTPS extends Operation {
  /**
   * DNSOverHTTPS constructor
   */
  constructor() {
    super();

    this.name = "DNS over HTTPS";
    this.module = "Default";
    this.description = [
      "Takes a single domain name and performs a DNS lookup using DNS over HTTPS.",
      "<br><br>",
      "By default, <a href='https://developers.cloudflare.com/1.1.1.1/dns-over-https/'>Cloudflare</a> and <a href='https://developers.google.com/speed/public-dns/docs/dns-over-https'>Google</a> DNS over HTTPS services are supported.",
      "<br><br>",
      "Can be used with any service that supports the GET parameters <code>name</code> and <code>type</code>.",
    ].join("\n");
    this.infoURL = "https://wikipedia.org/wiki/DNS_over_HTTPS";
    this.inputType = "string";
    this.outputType = "JSON";
    this.manualBake = true;
    this.args = [
      {
        name: "Resolver",
        type: "editableOption",
        value: [
          {
            name: "Google",
            value: "https://dns.google.com/resolve",
          },
          {
            name: "Cloudflare",
            value: "https://cloudflare-dns.com/dns-query",
          },
        ],
      },
      {
        name: "Request Type",
        type: "option",
        value: [
          "A",
          "AAAA",
          "ANAME",
          "CERT",
          "CNAME",
          "DNSKEY",
          "HTTPS",
          "IPSECKEY",
          "LOC",
          "MX",
          "NS",
          "OPENPGPKEY",
          "PTR",
          "RRSIG",
          "SIG",
          "SOA",
          "SPF",
          "SRV",
          "SSHFP",
          "TA",
          "TXT",
          "URI",
          "ANY",
        ],
      },
      {
        name: "Answer Data Only",
        type: "boolean",
        value: false,
      },
      {
        name: "Disable DNSSEC validation",
        type: "boolean",
        value: false,
      },
    ];
  }

  /**
   * @param {string} input
   * @param {Object[]} args
   * @returns {JSON}
   */
  run(input, args) {
    const [resolver, requestType, justAnswer, DNSSEC] = args;
    let url = URL;
    try {
      url = new URL(resolver);
    } catch (error) {
      throw new OperationError(
        error.toString() +
          "\n\nThis error could be caused by one of the following:\n" +
          " - An invalid Resolver URL\n",
      );
    }
    const params = { name: input, type: requestType, cd: DNSSEC };

    url.search = new URLSearchParams(params);

    return fetch(url, { headers: { accept: "application/dns-json" } })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (justAnswer) {
          return extractData(data.Answer);
        }
        return data;
      })
      .catch((e) => {
        throw new OperationError(
          `Error making request to ${url}\n${e.toString()}`,
        );
      });
  }
}

/**
 * Construct an array of just data from a DNS Answer section
 *
 * @private
 * @param {JSON} data
 * @returns {JSON}
 */
function extractData(data) {
  if (typeof data == "undefined") {
    return [];
  } else {
    const dataValues = [];
    data.forEach((element) => {
      dataValues.push(element.data);
    });
    return dataValues;
  }
}

export default DNSOverHTTPS;
