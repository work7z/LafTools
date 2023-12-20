package middleware

import (
	gconfig "laftools-go/core/config"
	"laftools-go/core/handlers/config"
	"strings"
)

func Auth(headerClientToken, fullPath string) bool {

	allowURLDefinitions := config.Fn_GetAllowURLDefinitions()
	isThisPathCanbeSkipped := false
	for _, definition := range allowURLDefinitions {
		if fullPath == "" || fullPath == "/" {
			isThisPathCanbeSkipped = true
		}
		if strings.Index(fullPath, config.FormatThatPathGlobally(definition)) == 0 {
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
		_, userObj_f := gconfig.GetItemByTokenDirectly(headerClientToken)
		if !userObj_f {
			return false
		}
	}
	return true

}
