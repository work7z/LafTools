package crypto

import (
	"crypto"
	"crypto/rand"
	"crypto/rsa"
	"crypto/sha256"
	"crypto/sha512"
	"crypto/x509"
	"encoding/pem"
	"errors"
)

// GenRsaKey generates an PKCS#1 RSA keypair of the given bit size in PEM format.
func GenRsaKey(bits int) (prvkey, pubkey []byte, err error) {
	// Generates private key.
	privateKey, err := rsa.GenerateKey(rand.Reader, bits)
	if err != nil {
		return
	}
	derStream := x509.MarshalPKCS1PrivateKey(privateKey)
	block := &pem.Block{
		Type:  "RSA PRIVATE KEY",
		Bytes: derStream,
	}
	prvkey = pem.EncodeToMemory(block)

	// Generates public key from private key.
	publicKey := &privateKey.PublicKey
	derPkix, err := x509.MarshalPKIXPublicKey(publicKey)
	if err != nil {
		return
	}
	block = &pem.Block{
		Type:  "RSA PUBLIC KEY",
		Bytes: derPkix,
	}
	pubkey = pem.EncodeToMemory(block)
	return
}

// RsaEncrypt encrypts data using rsa public key.
func RsaEncrypt(pubkey, data []byte) ([]byte, error) {
	block, _ := pem.Decode(pubkey)
	if block == nil {
		return nil, errors.New("decode public key error")
	}
	pub, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return nil, err
	}
	return rsa.EncryptPKCS1v15(rand.Reader, pub.(*rsa.PublicKey), data)
}

// RsaDecrypt decrypts data using rsa private key.
func RsaDecrypt(prvkey, cipher []byte) ([]byte, error) {
	block, _ := pem.Decode(prvkey)
	if block == nil {
		return nil, errors.New("decode private key error")
	}
	prv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}
	return rsa.DecryptPKCS1v15(rand.Reader, prv, cipher)
}

// RsaSign signs using private key in PEM format.
func RsaSign(prvkey []byte, hash crypto.Hash, data []byte) ([]byte, error) {
	block, _ := pem.Decode(prvkey)
	if block == nil {
		return nil, errors.New("decode private key error")
	}
	privateKey, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		return nil, err
	}

	// MD5 and SHA1 are not supported as they are not secure.
	var hashed []byte
	switch hash {
	case crypto.SHA224:
		h := sha256.Sum224(data)
		hashed = h[:]
	case crypto.SHA256:
		h := sha256.Sum256(data)
		hashed = h[:]
	case crypto.SHA384:
		h := sha512.Sum384(data)
		hashed = h[:]
	case crypto.SHA512:
		h := sha512.Sum512(data)
		hashed = h[:]
	}
	return rsa.SignPKCS1v15(rand.Reader, privateKey, hash, hashed)
}

// RsaVerifySign verifies signature using public key in PEM format.
// A valid signature is indicated by returning a nil error.
func RsaVerifySign(pubkey []byte, hash crypto.Hash, data, sig []byte) error {
	block, _ := pem.Decode(pubkey)
	if block == nil {
		return errors.New("decode public key error")
	}
	pub, err := x509.ParsePKIXPublicKey(block.Bytes)
	if err != nil {
		return err
	}

	// SHA1 and MD5 are not supported as they are not secure.
	var hashed []byte
	switch hash {
	case crypto.SHA224:
		h := sha256.Sum224(data)
		hashed = h[:]
	case crypto.SHA256:
		h := sha256.Sum256(data)
		hashed = h[:]
	case crypto.SHA384:
		h := sha512.Sum384(data)
		hashed = h[:]
	case crypto.SHA512:
		h := sha512.Sum512(data)
		hashed = h[:]
	}
	return rsa.VerifyPKCS1v15(pub.(*rsa.PublicKey), hash, hashed, sig)
}
