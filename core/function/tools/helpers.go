package tools

import (
	"laftools-go/core/codec"
	"laftools-go/core/form"

	"github.com/dablelv/cyan/crypto"
	"github.com/deatil/go-hash/hash"
)

func GetFileMD2(request form.TextRequest) (string, error) {
	return codec.FileMD2(request.InputFile)
}

func GetMD2Str(str string) string {
	return hash.FromString(str).MD2().ToHexString()
}

func GetMD2ForText(request form.TextRequest) string {
	return GetMD2Str(request.InputText)
}

func GetFileMD5(request form.TextRequest) (string, error) {
	return codec.FileMD5(request.InputFile)
}

func GetMD5ForText(request form.TextRequest) string {
	return crypto.Md5(request.InputText)
}
