import { Dot, loadDOT, } from "../../../utils/TranslationUtils";
import { FAQItem } from "./types";
import React from "react";

loadDOT("edc_base64")

let faqForBase64: FAQItem[] = [
  {
    label: Dot("123e4567", "What is Base64?"),
    value: <p>
      {Dot("abc12345", "Base64 is an encoding scheme that represents binary data as a sequence of ASCII characters.")}<br/>
      {Dot("fghi6789", "It's used to transmit or store binary files in text-based formats, ensuring compatibility across various systems.", "EncodingPurpose")}
    </p>
  },
  {
    label: Dot("abcdef12", "How does Base64 work?"),
    value: <p>
      {Dot("bcdef01a", "Base64 works by dividing binary data into groups of 6 bits and mapping each group to a specific character from an alphabet of 64 characters (A-Za-z0-9+/).")}<br/>
      {Dot("cdefg234", "Padding characters (=) are added at the end to ensure the encoded data length is a multiple of 4 characters.", "PaddingUsage")}
    </p>
  },
  {
    label: Dot("1a2b3c4d", "Why use Base64?"),
    value: <p>
      {Dot("5e6f7g8h", "Base64 is used when binary data needs to be transmitted through text-based protocols like email or JSON, or embedded in places where only text is allowed.", "TransmittingBinaryData")}
      {Dot("9i0j1k2l", "It's also used for embedding small images directly into HTML or CSS as data URLs.", "EmbeddingImages")}
    </p>
  },
  {
    label: Dot("mno34567", "Advantages of Base64"),
    value: <p>
      {Dot("pqrs890t", "<b>Universal Compatibility:</b> Base64 is widely recognized and supported in all major programming languages.", "Compatibility")}<br/>
      {Dot("uvwxyza1", "<b>No Data Loss:</b> Since it's a reversible process, Base64 encoding doesn't result in any loss of information.", "NoDataLoss")}
    </p>
  },
  {
    label: Dot("2bcde3fg", "Disadvantages of Base64"),
    value: <p>
      {Dot("4hijk5lm", "<b>Size Increase:</b> Encoded data is roughly 33% larger than the original binary data.", "SizeIncrease")}<br/>
      {Dot("6nopqrst", "<b>No Encryption:</b> Base64 is not an encryption method; it's easily decoded and provides no security.", "NotEncryption")}
    </p>
  },
  {
    label: Dot("u7vwx8yz", "Common Base64 operations"),
    value: <p>
      {Dot("ab9c0d1e", "The primary operations include <b>encoding</b> (converting binary to Base64) and <b>decoding</b> (converting Base64 back to binary).", "CommonOperations")}
    </p>
  },
  {
    label: Dot("23fgh456", "History of Base64"),
    value: <p>
      {Dot("78ijk9lm", "Base64 was first defined in RFC 1421 (1993) and later standardized in RFC 4648 (2006).", "Base64History")}
    </p>
  },
  {
    label: Dot("n0pqrstu", "Example usage of Base64"),
    value: <p>
      {Dot("vwx1yza2", "An example is encoding an image file to embed it in an HTML <code>&lt;img&gt;</code> tag:", "ExampleUsage")}
      <pre><code>&lt;img src="data:image/jpeg;base64,{'{EncodedImageData}'}" /&gt;</code></pre>
    </p>
  },
  {
    label: Dot("34wxyz56", "How to encode/decode Base64 in JavaScript?"),
    value: <p>
      {Dot("78abcdef", "JavaScript offers built-in functions such as <code>btoa()</code> and <code>atob()</code> for Base64 encoding and decoding respectively.", "JavaScriptUsage")}
      <pre>
        <code>// Encoding:
        let binaryData = new Blob(['Hello World']);
        let base64String = btoa(String.fromCharCode.apply(null, new Uint8Array(binaryData)));

        // Decoding:
        let decodedData = atob(base64String);</code>
      </pre>
    </p>
  },
  {
    label: Dot("efg45678", "Comparison with Base32"),
    value: <p>
      {Dot("hij90klm", "Base32 uses a smaller alphabet (A-Z2-7), resulting in longer but more human-readable strings.", "Base32Comparison")}
      {Dot("nopqrs01", "While Base64 optimizes for compactness, Base32 is chosen when minimizing input errors, like manual entry, is crucial.", "HumanReadable")}
    </p>
  },
  {
    label: Dot("tuv23456", "Base64 URL safe variant"),
    value: <p>
      {Dot("wxyzabcd", "There's a URL-safe version of Base64 that replaces '+' with '-' and '/' with '_', and omits padding '=', making it suitable for web URLs.", "URLSafeVariant")}
      {Dot("efghi678", "This variant is often used for filenames, URLs, or situations where special characters must be avoided.", "AvoidingSpecialChars")}
    </p>
  },
  {
    label: Dot("mnoijklm", "Are there other BaseXX encodings?"),
    value: <p>
      {Dot("qrstuvwx", "Yes, apart from Base64 and Base32, there are also Base16 (Hexadecimal), Base58, and Base85, each designed for different scenarios.", "OtherBaseXX")}
    </p>
  },
  {
    label: Dot("zyx98765", "Can Base64 be used for compression?"),
    value: <p>
      {Dot("cba54321", "No, Base64 isn't a compression technique; it only changes the representation of data, not its size.", "CompressionExplanation")}
    </p>
  }
];
export default faqForBase64