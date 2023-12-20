package conv

import "strings"

// SplitStrToSlice splits a string to a slice by the specified separator.
func SplitStrToSlice[T any](s, sep string) []T {
	v, _ := SplitStrToSliceE[T](s, sep)
	return v
}

// SplitStrToSliceE splits a string to a slice by the specified separator and returns an error if occurred.
// Note that this function is implemented through 1.18 generics, so the element type needs to
// be specified when calling it, e.g. SplitStrToSliceE[int]("1,2,3", ",").
func SplitStrToSliceE[T any](s, sep string) ([]T, error) {
	ss := strings.Split(s, sep)
	r := make([]T, len(ss))
	for i := range ss {
		v, err := ToAnyE[T](ss[i])
		if err != nil {
			return nil, err
		}
		r[i] = v

	}
	return r, nil
}
