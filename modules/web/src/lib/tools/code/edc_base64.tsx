
import { Dot } from '../../../utils/TranslationUtils';
import { CodeImplMap, CodeImplDetail, PopularLanguages } from './types'
let r: CodeImplMap = {
    "node.js": {
        template: `const crypto = require('crypto');
const inputBuffer = Buffer.from('TEST12345', 'utf8');
const encodedData = inputBuffer.toString('base64');
const decodedData = Buffer.from(encodedData, 'base64').toString('utf8');

console.log('Encoded:', encodedData);
console.log('Decoded:', decodedData);`,
        howToRunItTips: <p>{Dot("x7dJc", "To run this in Node.js, you don't need any external libraries as the built-in 'crypto' module provides Base64 encoding and decoding functionality.")}</p>
    },

    "Python": {
        template: `import base64

input_data = b'TEST12345'
encoded_data = base64.b64encode(input_data)
decoded_data = base64.b64decode(encoded_data)

print('Encoded:', encoded_data.decode('utf-8'))
print('Decoded:', decoded_data.decode('utf-8'))`,
        howToRunItTips: <p>{Dot("aZV9q", "In Python, the built-in 'base64' module is used for Base64 encoding and decoding, so no additional installation is required.")}</p>
    },

    "Java": {
        template: `import java.util.Base64;

public class Main {
    public static void main(String[] args) {
        String input = "TEST12345";
        byte[] inputBytes = input.getBytes(java.nio.charset.StandardCharsets.UTF_8);
        
        // Encode
        String encodedString = Base64.getEncoder().encodeToString(inputBytes);
        System.out.println("Encoded: " + encodedString);
        
        // Decode
        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
        String decodedString = new String(decodedBytes, java.nio.charset.StandardCharsets.UTF_8);
        System.out.println("Decoded: " + decodedString);
    }
}`,
        howToRunItTips: <p>{Dot("R4zYg", "Java's built-in 'java.util.Base64' class, available since Java 8, provides Base64 encoding and decoding capabilities without requiring any external libraries.")}</p>
    },

    "C#": {
        template: `using System;
using System.Text;

class Program
{
    static void Main()
    {
        string input = "TEST12345";
        byte[] inputBytes = Encoding.UTF8.GetBytes(input);

        // Encode
        string encodedString = Convert.ToBase64String(inputBytes);
        Console.WriteLine("Encoded: " + encodedString);

        // Decode
        byte[] decodedBytes = Convert.FromBase64String(encodedString);
        string decodedString = Encoding.UTF8.GetString(decodedBytes);
        Console.WriteLine("Decoded: " + decodedString);
    }
}`,
        howToRunItTips: <p>{Dot("eUdXm", "In C#, the 'System.Convert' class provides methods for Base64 encoding and decoding, which are included in the .NET Framework and do not require additional installations.")}</p>
    },

    "C++": {
        template: `#include <iostream>
#include <string>
#include <openssl/bio.h>
#include <openssl/evp.h>
#include <openssl/buffer.h>

std::string base64_encode(const std::string &input) {
    BIO *bio, *b64;
    BUF_MEM *bufferPtr;

    bio = BIO_new(BIO_s_mem());
    b64 = BIO_new(BIO_f_base64());
    bio = BIO_push(b64, bio);

    BIO_set_flags(bio, BIO_FLAGS_BASE64_NO_NL); //Ignore newlines - write everything in one line
    BIO_write(bio, input.c_str(), input.length());
    BIO_flush(bio);
    BIO_get_mem_ptr(bio, &bufferPtr);
    BIO_set_close(bio, BIO_NOCLOSE);
    BIO_free_all(bio);

    std::string output(bufferPtr->data, bufferPtr->length);
    BUF_MEM_free(bufferPtr);

    return output;
}

std::string base64_decode(const std::string &input) {
    BIO *bio, *b64;
    int decodeLength = calcDecodeLength(input);
    char* buffer = (char*)malloc(decodeLength + 1);

    bio = BIO_new_mem_buf(input.data(), -1);
    b64 = BIO_new(BIO_f_base64());
    bio = BIO_push(b64, bio);

    BIO_set_flags(bio, BIO_FLAGS_BASE64_NO_NL); //Do not use newlines to flush buffer
    int length = BIO_read(bio, buffer, input.length());
    buffer[length] = '\0';

    BIO_free_all(bio);

    std::string output(buffer);
    free(buffer);

    return output;
}

int main() {
    std::string input = "TEST12345";
    std::string encoded = base64_encode(input);
    std::string decoded = base64_decode(encoded);

    std::cout << "Encoded: " << encoded << std::endl;
    std::cout << "Decoded: " << decoded << std::endl;

    return 0;
}`,
        howToRunItTips: <p>{Dot("k1WvF", "For C++, OpenSSL library is needed to handle Base64 encoding and decoding. You can install it using package managers like apt (Ubuntu), yum (CentOS), or brew (macOS).")}</p>
    },

    "PHP": {
        template: `<?php
$input = 'TEST12345';
$encodedData = base64_encode($input);
$decodedData = base64_decode($encodedData);

echo "Encoded: " . $encodedData . "\n";
echo "Decoded: " . $decodedData . "\n";`,
        howToRunItTips: <p>{Dot("fTt2N", "PHP has built-in functions 'base64_encode()' and 'base64_decode()' for Base64 operations, so no extra libraries are required.")}</p>
    },

    "Go": {
        template: `package main

import (
	"encoding/base64"
	"fmt"
)

func main() {
	input := "TEST12345"
	encodedData := base64.StdEncoding.EncodeToString([]byte(input))
	decodedData, _ := base64.StdEncoding.DecodeString(encodedData)

	fmt.Println("Encoded:", encodedData)
	fmt.Println("Decoded:", string(decodedData))
}`,
        howToRunItTips: <p>{Dot("sBzHr", "In Go, the 'encoding/base64' standard library package provides functions for Base64 encoding and decoding without needing any external dependencies.")}</p>
    },

    "Rust": {
        template: `use base64::{encode, decode};

fn main() {
    let input = "TEST12345".as_bytes();
    let encoded_data = encode(input);
    let decoded_data = decode(encoded_data).unwrap();

    println!("Encoded: {}", encoded_data);
    println!("Decoded: {:?}", String::from_utf8(decoded_data).unwrap());
}`,
        howToRunItTips: <p>{Dot("Q9ZwP", "In Rust, the 'base64' crate is required for Base64 operations. You can add it to your project by adding 'base64 = \"1.x\"' to your Cargo.toml file under the [dependencies] section and running 'cargo build'.")}</p>
    },

    "C": {
        template: `// Note: Base64 encoding and decoding in C requires a third-party library.
// Below is an example using OpenSSL:
#include <openssl/bio.h>
#include <openssl/evp.h>
#include <openssl/buffer.h>

// ... Define similar encode and decode functions as shown in the C++ example ...
`,
        howToRunItTips: <p>{Dot("Gy3Yj", "In C, there's no built-in support for Base64 encoding and decoding. OpenSSL library can be used similarly to the C++ example above. Include the necessary headers and link against the OpenSSL library during compilation.")}</p>
    }
};

export default r;