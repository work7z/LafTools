package crypto

import (
	"crypto/cipher"
	"crypto/des"
	"encoding/base64"
)

//
// Desc: symmetric des encryption and decryption functions.
//

// DESCBCEncrypt encrypts data with DES algorithm in CBC mode.
// Note that key length must be 8 bytes.
func DESCBCEncrypt(p, key []byte) ([]byte, error) {
	block, err := des.NewCipher(key)
	if err != nil {
		return nil, err
	}
	p = PKCS7Padding(p, block.BlockSize())
	blockMode := cipher.NewCBCEncrypter(block, key)
	c := make([]byte, len(p))
	blockMode.CryptBlocks(c, p)
	return c, nil
}

// DESCBCDecrypt decrypts cipher text with DES algorithm in CBC mode.
// Note that key length must be 8 bytes.
func DESCBCDecrypt(c, key []byte) ([]byte, error) {
	block, err := des.NewCipher(key)
	if err != nil {
		return nil, err
	}
	blockMode := cipher.NewCBCDecrypter(block, key)
	p := make([]byte, len(c))
	blockMode.CryptBlocks(p, c)
	return PKCS7UnPadding(p)
}

// Base64DESCBCEncrypt encrypts data with DES algorithm in CBC mode and encoded by base64.
func Base64DESCBCEncrypt(p, key []byte) (string, error) {
	c, err := DESCBCEncrypt(p, key)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(c), nil
}

// Base64DESCBCDecrypt decrypts cipher text encoded by base64 with DES algorithm in CBC mode.
func Base64DESCBCDecrypt(c string, key []byte) ([]byte, error) {
	oriCipher, err := base64.StdEncoding.DecodeString(c)
	if err != nil {
		return nil, err
	}
	p, err := DESCBCDecrypt(oriCipher, key)
	if err != nil {
		return nil, err
	}
	return p, nil
}

// TriDESCBCEncrypt encrypts data with 3DES algorithm in CBC mode.
// Note that key length must be 24 bytes
func TriDESCBCEncrypt(src, key []byte) ([]byte, error) {
	block, err := des.NewTripleDESCipher(key)
	if err != nil {
		return nil, err
	}
	src = PKCS7Padding(src, block.BlockSize())
	blockMode := cipher.NewCBCEncrypter(block, key[:block.BlockSize()])
	dst := make([]byte, len(src))
	blockMode.CryptBlocks(dst, src)
	return dst, nil
}

// TriDESCBCDecrypt decrypts cipher text with 3DES algorithm in CBC mode.
// Note that key length must be 24 bytes
func TriDESCBCDecrypt(src, key []byte) ([]byte, error) {
	block, err := des.NewTripleDESCipher(key)
	if err != nil {
		return nil, err
	}
	blockMode := cipher.NewCBCDecrypter(block, key[:block.BlockSize()])
	dst := make([]byte, len(src))
	blockMode.CryptBlocks(dst, src)
	dst, err = PKCS7UnPadding(dst)
	return dst, err
}

// Base64TriDESCBCEncrypt encrypts data with 3DES algorithm in CBC mode and encoded by base64.
func Base64TriDESCBCEncrypt(p, key []byte) (string, error) {
	c, err := TriDESCBCEncrypt(p, key)
	if err != nil {
		return "", err
	}
	return base64.StdEncoding.EncodeToString(c), nil
}

// Base64TriDESCBCDecrypt decrypts cipher text encoded by base64 with 3DES algorithm in CBC mode.
func Base64TriDESCBCDecrypt(c string, key []byte) ([]byte, error) {
	oriCipher, err := base64.StdEncoding.DecodeString(c)
	if err != nil {
		return nil, err
	}
	p, err := TriDESCBCDecrypt(oriCipher, key)
	if err != nil {
		return nil, err
	}
	return p, nil
}
