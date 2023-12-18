package api

import (
	"encoding/json"
	"laftools-go/core/context"
	"laftools-go/core/gutils"
	"laftools-go/core/nocycle"
	"path"

	"github.com/gin-gonic/gin"
)

type AppI18nRaw struct {
	Label []string
	Value string
}

type AppI18nFormatted struct {
	Label string
	Value string
}

func API_Get_i18n_Lang(c *gin.Context) {

	var indexJSONFile = path.Join(gutils.GetPureJSFolder(), "app-i18n.json")
	returnValue := []AppI18nRaw{}
	// read file and unmarhsla it to returnValue
	b, er := nocycle.ReadFileAsStrWithNoTrim(indexJSONFile)
	if er != nil {
		ErrLa(c, er)
		return
	}
	er = json.Unmarshal([]byte(b), &returnValue)
	if er != nil {
		ErrLa(c, er)
		return
	}
	formattedReturnValue := []AppI18nFormatted{}
	wc := context.NewWC(c)
	// format returnValue to formattedReturnValue
	for _, v := range returnValue {
		formattedReturnValue = append(formattedReturnValue, AppI18nFormatted{
			Label: wc.Dot(v.Label[0], v.Label[1]),
			Value: v.Value,
		})
	}
	OKLa(c, DoValueRes(formattedReturnValue))
}
