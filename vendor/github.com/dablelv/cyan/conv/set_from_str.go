package conv

import "strings"

// SplitStrToSet convert a string to map set after split
func SplitStrToSet(s string, sep string) map[string]struct{} {
	if s == "" {
		return nil
	}
	m := make(map[string]struct{})
	for _, v := range strings.Split(s, sep) {
		m[v] = struct{}{}
	}
	return m
}
