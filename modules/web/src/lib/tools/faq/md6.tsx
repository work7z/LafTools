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
]

export default faqForMD6;