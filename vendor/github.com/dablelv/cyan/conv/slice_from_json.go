package conv

import "encoding/json"

// JSONToSliceE converts the JSON-encoded data to any type slice with no error returned.
func JSONToSlice[S ~[]E, E any](data []byte) S {
	s, _ := JSONToSliceE[S](data)
	return s
}

// JSONToSliceE converts the JSON-encoded data to any type slice.
// E.g. a JSON value ["foo", "bar", "baz"] can be converted to []string{"foo", "bar", "baz"}
// when calling JSONToSliceE[[]string](`["foo", "bar", "baz"]`).
func JSONToSliceE[S ~[]E, E any](data []byte) (S, error) {
	var s S
	err := json.Unmarshal(data, &s)
	return s, err
}
