package middleware

import (
	"laftools-go/core/config"
	"laftools-go/core/url"
	"strings"
)

func Auth(headerClientToken, fullPath string) bool {

	allowURLDefinitions := url.Fn_GetAllowURLDefinitions()
	isThisPathCanbeSkipped := false
	for _, definition := range allowURLDefinitions {
		if fullPath == "" || fullPath == "/" {
			isThisPathCanbeSkipped = true
		}
		if strings.Index(fullPath, url.FormatThatPathGlobally(definition)) == 0 {
			isThisPathCanbeSkipped = true
		}
		if strings.Index(fullPath, definition) == 0 {
			isThisPathCanbeSkipped = true
		}
		if isThisPathCanbeSkipped {
			break
		}
	}
	if !isThisPathCanbeSkipped {
		_, userObj_f := config.GetItemByTokenDirectly(headerClientToken)
		if !userObj_f {
			return false
		}
	}
	return true

}
