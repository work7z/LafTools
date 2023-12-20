package tools

import (
	"laftools-go/core/project/base/env"
	"os"
)

const LEN_LIMIT_TRANSLATION_KEYS = 25

var (
	RefId                 string        // for port information, if it's empty, then I will tell you in the home directory
	IsDevMode             bool   = true // by default, it's true
	SystemUserLanguage    string = "en_US"
	LafToolsAppBaseDir    string = env.GetEnvValueForLafToolsRoot()
	LafToolsHomeConfigDir string = os.Getenv("CODEGEN_APP_DIR")
)
