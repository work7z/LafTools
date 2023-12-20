package crypto

import (
	"crypto/hmac"
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"fmt"
	"hash"
)

//
// Desc: Hash-based Message Authentication Code functions.
//

// HMACMd5 generates 32 lowercase hexadecimal characters authentication code based on MD5.
func HMACMd5(str, key string) string {
	return HMAC(str, key, "md5", false)
}

// HMACMD5 generates 32 uppercase hexadecimal characters authentication code based on MD5.
func HMACMD5(str, key string) string {
	return HMAC(str, key, "MD5", true)
}

// HMACSha1 generates 40 lowercase hexadecimal characters authentication code based on SHA1.
func HMACSha1(str, key string) string {
	return HMAC(str, key, "sha1", false)
}

// HMACSHA1 generates 40 uppercase hexadecimal characters authentication code based on SHA1.
func HMACSHA1(str, key string) string {
	return HMAC(str, key, "SHA1", true)
}

// HMACSha224 generates 56 lowercase hexadecimal characters authentication code based on SHA224.
func HMACSha224(str, key string) string {
	return HMAC(str, key, "sha224", false)
}

// HMACSHA224 generates 56 uppercase hexadecimal characters authentication code based on SHA224.
func HMACSHA224(str, key string) string {
	return HMAC(str, key, "SHA224", true)
}

// HMACSha256 generates 64 lowercase hexadecimal characters authentication code based on SHA256.
func HMACSha256(str, key string) string {
	return HMAC(str, key, "sha256", false)
}

// HMACSHA256 generates 64 uppercase hexadecimal characters authentication code based on SHA256.
func HMACSHA256(str, key string) string {
	return HMAC(str, key, "SHA256", true)
}

// HMACSha384 generates 96 lowercase hexadecimal characters authentication code based on SHA384.
func HMACSha384(str, key string) string {
	return HMAC(str, key, "sha384", false)
}

// HMACSHA384 generates 96 uppercase hexadecimal characters authentication code based on SHA384.
func HMACSHA384(str, key string) string {
	return HMAC(str, key, "SHA384", true)
}

// HMACSha512 generates 128 lowercase hexadecimal characters authentication code based on SHA512.
func HMACSha512(str, key string) string {
	return HMAC(str, key, "sha512", false)
}

// HMACSHA512 generates 128 uppercase hexadecimal characters authentication code based on SHA512.
func HMACSHA512(str, key string) string {
	return HMAC(str, key, "SHA512", true)
}

// HMAC generates authentication code based on specified hash algorithm.
// e.g. HMAC("", "", "MD5", false) returns 74e6f7298a9c2d168935f58c001bad88.
func HMAC(str, key string, hashName string, capital bool) string {
	var hm hash.Hash
	switch hashName {
	case "md5", "MD5":
		hm = hmac.New(md5.New, []byte(key))
	case "sha1", "SHA1":
		hm = hmac.New(sha1.New, []byte(key))
	case "sha224", "SHA224":
		hm = hmac.New(sha256.New224, []byte(key))
	case "sha256", "SHA256":
		hm = hmac.New(sha256.New, []byte(key))
	case "sha384", "SHA384":
		hm = hmac.New(sha512.New384, []byte(key))
	case "sha512", "SHA512":
		hm = hmac.New(sha512.New, []byte(key))
	default:
		return ""
	}
	hm.Write([]byte(str))
	if capital {
		return fmt.Sprintf("%X", hm.Sum(nil))
	}
	return fmt.Sprintf("%x", hm.Sum(nil))
}
