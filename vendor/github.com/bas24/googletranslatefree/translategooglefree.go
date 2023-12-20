package translategooglefree

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"strings"
)

// javascript "encodeURI()"
// so we embed js to our golang programm
func encodeURI(s string) string {
	return url.QueryEscape(s)
}

func Translate(source, sourceLang, targetLang string) (string, error) {
	var text []string
	var result []interface{}

	encodedSource := encodeURI(source)
	url := "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" +
		sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodedSource

	r, err := http.Get(url)
	if err != nil {
		return "err", errors.New("Error getting translate.googleapis.com")
	}
	defer r.Body.Close()

	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		return "err", errors.New("Error reading response body")
	}

	bReq := strings.Contains(string(body), `<title>Error 400 (Bad Request)`)
	if bReq {
		return "err", errors.New("Error 400 (Bad Request)")
	}

	err = json.Unmarshal(body, &result)
	if err != nil {
		return "err", errors.New("Error unmarshaling data")
	}

	if len(result) > 0 {
		inner := result[0]
		for _, slice := range inner.([]interface{}) {
			for _, translatedText := range slice.([]interface{}) {
				text = append(text, fmt.Sprintf("%v", translatedText))
				break
			}
		}
		cText := strings.Join(text, "")

		return cText, nil
	} else {
		return "err", errors.New("No translated data in responce")
	}
}
