package crypto

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"encoding/base64"
	"errors"
)

//
// Desc: symmetric aes encryption and decryption functions.
//

// PKCS7Padding fills plaintext as an integral multiple of the block length.
// In cryptography, PKCS stands for "Public Key Cryptography Standards".
// These are a group of public key cryptography standards devised and published by RSA Security LLC, starting in the early 1990s.
// PKCS#7 is Cryptographic Message Syntax Standard used to sign and/or encrypt messages under a PKI.
// More information about PKCS#7 please refer to the RFC 2315.
// The PKCS#7 padding method works by adding bytes that all have the same value as the number
// of bytes added to the plaintext. For example, if the last block of plaintext is 3 bytes long
// and the block size is 8 bytes, then 5 bytes of padding are added to make the total length of the plaintext 8 bytes.
// The value of the 5 bytes will be the hex value 0x05, since 5 bytes were added as padding.
func PKCS7Padding(p []byte, blockSize int) []byte {
	pad := blockSize - len(p)%blockSize
	padtext := bytes.Repeat([]byte{byte(pad)}, pad)
	return append(p, padtext...)
}

// PKCS7UnPadding removes padding data from the tail of plaintext.
func PKCS7UnPadding(p []byte) ([]byte, error) {
	l := len(p)
	paddLen := int(p[l-1])
	if paddLen > l {
		return nil, errors.New("data is not illegal")
	}
	return p[:(l - paddLen)], nil
}

// AESCBCEncrypt encrypts data with AES algorithm in CBC mode.
// Note that key length must be 16, 24 or 32 bytes to select AES-128, AES-192, or AES-256.
func AESCBCEncrypt(p, key []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	p = PKCS7Padding(p, block.BlockSize())
	ciphertext := make([]byte, len(p))
	blockMode := cipher.NewCBCEncrypter(block, key[:block.BlockSize()])
	blockMode.CryptBlocks(ciphertext, p)
	return ciphertext, nil
}

// AESCBCDecrypt decrypts cipher text with AES algorithm in CBC mode.
// Note that key length must be 16, 24 or 32 bytes to select AES-128, AES-192, or AES-256.
func AESCBCDecrypt(c, key []byte) ([]byte, error) {
	block, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	plaintext := make([]byte, len(c))
	blockMode := cipher.NewCBCDecrypter(block, key[:block.BlockSize()])
	blockMode.CryptBlocks(plaintext, c)
	return PKCS7UnPadding(plaintext)
}

// Base64AESCBCEncrypt encrypts data with AES algorithm in CBC mode and then encode using base64.
func Base64AESCBCEncrypt(p, key []byte) (string, error) {
	c, err := AESCBCEncrypt(p, key)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(c), nil
}

// Base64AESCBCDecrypt decrypts cipher text encoded by base64 with AES algorithm in CBC mode.
func Base64AESCBCDecrypt(c string, key []byte) ([]byte, error) {
	oriCipher, err := base64.StdEncoding.DecodeString(c)
	if err != nil {
		return nil, err
	}
	p, err := AESCBCDecrypt(oriCipher, key)
	if err != nil {
		return nil, err
	}
	return p, nil
}
