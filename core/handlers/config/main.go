package config

const CONFIG_URL_PUBLIC_BASE_PREFIX string = "/api"
const CONFIG_URL_OPENAPI_PREFIX string = "/open"
const CONFIG_URL_APP_FRONT_END_APP_PREFIX string = "/app"
const CONFIG_URL_APP_FRONT_END_STATIC_PREFIX string = "/static"
const CONFIG_URL_APP_FRONT_END_ASSETS_PREFIX string = "/assets"

// define an array for visit urls
var CONFIG_URL_VISIT_URLS []string = []string{
	//
}
var CONFIG_URL_ADMIN_URLS []string = []string{
	//
}

func Fn_GetAllowURLDefinitions() []string {
	filesList := []string{
		CONFIG_URL_APP_FRONT_END_APP_PREFIX,
		CONFIG_URL_APP_FRONT_END_STATIC_PREFIX,
		CONFIG_URL_APP_FRONT_END_ASSETS_PREFIX,
		"/ws/", // websocket has own auth logic, no need to be checked here
	}
	// append CONFIG_URL_ADMIN_URLS and CONFIG_URL_ADMIN_URLS into filesList
	filesList = append(filesList, CONFIG_URL_VISIT_URLS...)
	return filesList
}

func FormatThatPathGlobally(relativePath string) string {
	return CONFIG_URL_PUBLIC_BASE_PREFIX + relativePath
}
