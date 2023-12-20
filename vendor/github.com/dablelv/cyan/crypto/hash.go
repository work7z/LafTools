package crypto

import (
	"crypto/md5"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"fmt"
	"hash"
)

//
// Desc: Hash functions.
//

// Md5 generates 32 lowercase hexadecimal characters of MD5 value.
func Md5(s string) string {
	return Hash(s, "md5", false)
}

// MD5 generates 32 uppercase hexadecimal characters of MD5 value.
func MD5(s string) string {
	return Hash(s, "MD5", true)
}

// Sha1 generates 40 lowercase hexadecimal characters of SHA1 value.
func Sha1(s string) string {
	return Hash(s, "sha1", false)
}

// SHA1 generates 40 uppercase hexadecimal characters of SHA1 value.
func SHA1(s string) string {
	return Hash(s, "SHA1", true)
}

// Sha224 generates 56 lowercase hexadecimal characters of SHA224 value.
func Sha224(s string) string {
	return Hash(s, "sha224", false)
}

// SHA224 generates 56 uppercase hexadecimal characters of SHA224 value.
func SHA224(s string) string {
	return Hash(s, "SHA224", true)
}

// Sha256 generates 64 lowercase hexadecimal characters of SHA256 value.
func Sha256(s string) string {
	return Hash(s, "sha256", false)
}

// SHA256 generates 64 uppercase hexadecimal characters of SHA256 value.
func SHA256(s string) string {
	return Hash(s, "SHA256", true)
}

// Sha384 generates 96 lowercase hexadecimal characters of SHA384 value.
func Sha384(s string) string {
	return Hash(s, "sha384", false)
}

// SHA384 generates 96 uppercase hexadecimal characters of SHA384 value.
func SHA384(s string) string {
	return Hash(s, "SHA384", true)
}

// Sha512 generates 128 lowercase hexadecimal characters of SHA512 value.
func Sha512(s string) string {
	return Hash(s, "sha512", false)
}

// SHA512 generates 128 uppercase hexadecimal characters of SHA512 value.
func SHA512(s string) string {
	return Hash(s, "SHA512", true)
}

// Hash generates a checksum of the specified hash algorithm.
// E.g. Hash("", "MD5", false) returns d41d8cd98f00b204e9800998ecf8427e.
func Hash(s string, name string, capital bool) string {
	var h hash.Hash
	switch name {
	case "md5", "MD5":
		h = md5.New()
	case "sha1", "SHA1":
		h = sha1.New()
	case "sha224", "SHA224":
		h = sha256.New224()
	case "sha256", "SHA256":
		h = sha256.New()
	case "sha384", "SHA384":
		h = sha512.New384()
	case "sha512", "SHA512":
		h = sha512.New()
	default:
		return ""
	}
	h.Write([]byte(s))
	if capital {
		return fmt.Sprintf("%X", h.Sum(nil))
	}
	return fmt.Sprintf("%x", h.Sum(nil))
}
