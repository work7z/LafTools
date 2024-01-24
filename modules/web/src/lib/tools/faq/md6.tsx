// LafTools - The Leading All-In-One ToolBox for Programmers.
// 
// Date: Wed, 24 Jan 2024
// Author:   
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

import { Dot, loadDOT } from "../../../utils/TranslationUtils";
import { FAQItem } from "./types";
import React from "react";

loadDOT("MD6")


let faqForMD6: FAQItem[] = [
    {
        question: Dot("MD6-FAQ-001", "What is MD6?"),
        answer: (
            <p>
                {Dot("MD6-Def-002", "MD6 (Message-Digest Algorithm 6) is a cryptographic hash function designed by Ronald Rivest in 2008. It's an evolution of the MD family, offering variable output sizes ranging from 128 to 512 bits.")}<br />
                {Dot("MD6-Purpose-003", "MD6 aims to provide robust security features and improved performance compared to its predecessors, making it suitable for a variety of applications requiring collision-resistant hashing and message integrity checks.")}
            </p>
        ),
        links: []
    },
    {
        question: Dot("MD6-History-004", "How was MD6 developed and what led to its creation?"),
        answer: (
            <p>
                {Dot("MD6-Origin-005", "MD6 was created as a response to the vulnerabilities found in MD5 and SHA-1, which were widely used at the time. It aimed to provide a more secure alternative with increased flexibility regarding output size.")}<br />
                {Dot("MD6-SecurityUpgrade-006", "The design of MD6 is built on the concept of tree-based hashing, allowing it to offer better protection against preimage and collision attacks than previous MD algorithms, while also providing higher throughput for large data sets.")}
            </p>
        ),
        links: []
    },
    {
        question: Dot("MD6-Operation-007", "How does MD6 operation work?"),
        answer: (
            <p>
                {Dot("MD6-Process-008", "MD6 processes input messages through a series of compression functions that are applied in a tree-like structure. The algorithm can operate in parallel, which contributes to its performance for larger inputs.")}<br />
                {Dot("MD6-Rounds-009", "Each node in the MD6 tree undergoes multiple rounds of mixing operations involving modular addition, bitwise XOR, and non-linear permutations. The final root node value represents the hash digest of the input message.")}
            </p>
        ),
        links: [
            {
                name: Dot("MD6-AlgorithmDetails-010", "MD6 Algorithm Details"),
                link: "https://people.csail.mit.edu/rivest/pubs/RSW08.pdf"
            }
        ]
    },

    {
        question: Dot("MD6-ComparisonSHA3-020", "How does MD6 compare to SHA-3 (Keccak)?"),
        answer: (
            <p>
                {Dot("MD6-vs-SHA3-DiffDesign-021", "MD6 and SHA-3 are both designed with security in mind, but they employ different hashing techniques. MD6 uses a tree-based design for improved parallelism, while SHA-3 is based on the sponge construction.")}<br />
                {Dot("MD6-vs-SHA3-Flexibility-022", "MD6 offers variable output lengths, which can be advantageous for applications that require custom hash sizes. SHA-3 also supports variable output lengths, although its most common variant, SHAKE, provides even more flexibility with arbitrary-length outputs.")}<br />
                {Dot("MD6-vs-SHA3-Adoption-023", "SHA-3 has been adopted as an official NIST standard and gained widespread use due to its robust security and performance. MD6, despite being theoretically secure, hasn't seen the same level of adoption or standardization.")}
            </p>
        ),
        links: [
            {
                name: Dot("SHA3-NISTStandard-024", "SHA-3 Standardization"),
                link: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.202.pdf"
            }
        ]
    },
    {
        question: Dot("MD6-UseInPKI-025", "Can MD6 be used for Public Key Infrastructure (PKI) or digital signatures?"),
        answer: (
            <p>
                {Dot("MD6-PKI-Considerations-026", "While MD6 was intended to provide stronger security than earlier hash functions like MD5, it has not been widely adopted for PKI or digital signature schemes due to its relative novelty and lack of broad cryptographic community acceptance.")}<br />
                {Dot("MD6-PKI-Alternatives-027", "For PKI and digital signature applications, standards such as RSA/SHA-256 or ECDSA with SHA-2 or SHA-3 variants are commonly used instead. These have gone through extensive analysis and have established trust within the cryptographic community.")}
            </p>
        ),
        links: []
    },
    {
        question: Dot("MD6-FutureDevelopments-028", "Are there any future developments or improvements planned for MD6?"),
        answer: (
            <p>
                {Dot("MD6-FutureUnknown-029", "As of now, there isn't any publicly available information about ongoing development or plans to improve upon the MD6 algorithm. Cryptographic research continues to evolve, and new algorithms may emerge to address emerging threats or requirements.")}<br />
                {Dot("MD6-StayingCurrent-030", "It's essential to stay updated with the latest research findings and recommendations from cryptographic experts when choosing a hash function for any application, especially as the landscape of cryptographic security evolves over time.")}
            </p>
        ),
        links: []
    },
]

export default faqForMD6;