package conv

import (
	"reflect"
	"strings"
	"time"
)

// ToSlice converts any type slice or array to the specified type slice.
func ToSlice[T any](a any) []T {
	r, _ := ToSliceE[T](a)
	return r
}

// ToSliceE converts any type slice or array to the specified type slice.
// An error will be returned if an error occurred.
func ToSliceE[T any](a any) ([]T, error) {
	if a == nil {
		return nil, nil
	}
	switch v := a.(type) {
	case []T:
		return v, nil
	case string:
		return ToSliceE[T](strings.Fields(v))
	}

	kind := reflect.TypeOf(a).Kind()
	switch kind {
	case reflect.Slice, reflect.Array:
		// If input is a slice or array.
		v := reflect.ValueOf(a)
		if kind == reflect.Slice && v.IsNil() {
			return nil, nil
		}
		s := make([]T, v.Len())
		for i := 0; i < v.Len(); i++ {
			val, err := ToAnyE[T](v.Index(i).Interface())
			if err != nil {
				return nil, err
			}
			s[i] = val
		}
		return s, nil
	default:
		// If input is a single value.
		v, err := ToAnyE[T](a)
		if err != nil {
			return nil, err
		}
		return []T{v}, nil
	}
}

// ToBoolSlice converts any type to []bool.
func ToBoolSlice(a any) []bool {
	return ToSlice[bool](a)
}

// ToBoolSliceE converts any type slice or array to []bool with returned error.
func ToBoolSliceE(a any) ([]bool, error) {
	return ToSliceE[bool](a)
}

// ToIntSlice converts any type slice or array to []int.
// E.g. covert []string{"1", "2", "3"} to []int{1, 2, 3}.
func ToIntSlice(a any) []int {
	return ToSlice[int](a)
}

// ToIntSliceE converts any type slice or array to []int with returned error..
func ToIntSliceE(a any) ([]int, error) {
	return ToSliceE[int](a)
}

// ToInt8Slice converts any type slice or array to []int8.
// E.g. covert []string{"1", "2", "3"} to []int8{1, 2, 3}.
func ToInt8Slice(a any) []int8 {
	return ToSlice[int8](a)
}

// ToInt8SliceE converts any type slice or array to []int8 with returned error.
func ToInt8SliceE(a any) ([]int8, error) {
	return ToSliceE[int8](a)
}

// ToInt16Slice converts any type slice or array to []int16.
// For example, covert []string{"1", "2", "3"} to []int16{1, 2, 3}.
func ToInt16Slice(a any) []int16 {
	return ToSlice[int16](a)
}

// ToInt16SliceE converts any type slice or array to []int16 with returned error.
func ToInt16SliceE(a any) ([]int16, error) {
	return ToSliceE[int16](a)
}

// ToInt32Slice converts any type slice or array to []int32.
// For example, covert []string{"1", "2", "3"} to []int32{1, 2, 3}.
func ToInt32Slice(a any) []int32 {
	return ToSlice[int32](a)
}

// ToInt32SliceE converts any type slice or array []int32 with returned error.
func ToInt32SliceE(a any) ([]int32, error) {
	return ToSliceE[int32](a)
}

// ToInt64Slice converts any type slice or array to []int64 slice.
// For example, covert []string{"1", "2", "3"} to []int64{1, 2, 3}.
func ToInt64Slice(a any) []int64 {
	return ToSlice[int64](a)
}

// ToInt64SliceE converts any type slice or array to []int64 slice with returned error.
func ToInt64SliceE(a any) ([]int64, error) {
	return ToSliceE[int64](a)
}

// ToUintSlice converts any type slice or array to []uint.
// For example, covert []string{"1", "2", "3"} to []uint{1, 2, 3}.
func ToUintSlice(a any) []uint {
	return ToSlice[uint](a)
}

// ToUintSliceE converts any type slice or array to []uint with returned error.
func ToUintSliceE(a any) ([]uint, error) {
	return ToSliceE[uint](a)
}

// ToUint8Slice converts any type slice or array to []uint8.
// E.g. covert []string{"1", "2", "3"} to []uint8{1, 2, 3}.
func ToUint8Slice(a any) []uint8 {
	return ToSlice[uint8](a)
}

// ToUint8SliceE converts any type slice or array to []uint8 slice with returned error.
func ToUint8SliceE(a any) ([]uint8, error) {
	return ToSliceE[uint8](a)
}

// ToByteSlice converts an type slice or array to []byte.
// E.g. covert []string{"1", "2", "3"} to []byte{1, 2, 3}.
func ToByteSlice(a any) []byte {
	return ToUint8Slice(a)
}

// ToByteSliceE converts any type slice or array to []byte with returned error.
func ToByteSliceE(a any) ([]byte, error) {
	return ToUint8SliceE(a)
}

// ToUint16Slice converts any type slice or array to []uint16.
// For example, covert []string{"1", "2", "3"} to []uint16{1, 2, 3}.
func ToUint16Slice(a any) []uint16 {
	return ToSlice[uint16](a)
}

// ToUint16SliceE converts any type slice or array to []uint16 slice with returned error.
func ToUint16SliceE(a any) ([]uint16, error) {
	return ToSliceE[uint16](a)
}

// ToUint32Slice converts any type slice or array to []uint32.
// For example, covert []string{"1", "2", "3"} to []uint32{1, 2, 3}.
func ToUint32Slice(a any) []uint32 {
	return ToSlice[uint32](a)
}

// ToUint32SliceE converts any type slice or array to []uint32 slice with returned error.
func ToUint32SliceE(a any) ([]uint32, error) {
	return ToSliceE[uint32](a)
}

// ToUint64Slice converts any type slice or array to []uint64.
// For example, covert []string{"1", "2", "3"} to []uint64{1, 2, 3}.
func ToUint64Slice(a any) []uint64 {
	return ToSlice[uint64](a)
}

// ToUint64SliceE converts any type slice or array to []uint64 with returned error.
func ToUint64SliceE(a any) ([]uint64, error) {
	return ToSliceE[uint64](a)
}

// ToDurationSlice converts any type slice or array to []time.Duration.
func ToDurationSlice(a any) []time.Duration {
	return ToSlice[time.Duration](a)
}

// ToDurationSliceE converts any type to []time.Duration with returned error.
func ToDurationSliceE(a any) ([]time.Duration, error) {
	return ToSliceE[time.Duration](a)
}

// ToStrSlice converts any type slice or array to []string.
// For example, covert []int{1, 2, 3} to []string{"1", "2", "3"}.
func ToStrSlice(a any) []string {
	return ToSlice[string](a)
}

// ToStrSliceE converts any type slice or array to []string with returned error.
func ToStrSliceE(a any) ([]string, error) {
	return ToSliceE[string](a)
}
