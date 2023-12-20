// Package conv provides utility functions related to type conversions,
// such as to int using ToAny[int](any), to int set using ToSet[int](any),
// to  a slice or array to set type (map[bool]struct{}),
// map keys and values to slice in random order etc.
package conv

import (
	"fmt"
	"time"
)

// ToAny converts one type to another type.
func ToAny[T any](a any) T {
	v, _ := ToAnyE[T](a)
	return v
}

// ToAnyE converts one type to another and returns an error if error occurred.
func ToAnyE[T any](a any) (T, error) {
	var t T
	switch any(t).(type) {
	case bool:
		v, err := ToBoolE(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case int:
		v, err := ToIntE(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case int8:
		v, err := ToInt8E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case int16:
		v, err := ToInt16E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case int32:
		v, err := ToInt32E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case int64:
		v, err := ToInt64E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case uint:
		v, err := ToUintE(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case uint8:
		v, err := ToUint8E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case uint16:
		v, err := ToUint16E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case uint32:
		v, err := ToUint32E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case uint64:
		v, err := ToUint64E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case float32:
		v, err := ToFloat32E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case float64:
		v, err := ToFloat64E(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case time.Duration:
		v, err := ToDurationE(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	case string:
		v, err := ToStringE(a)
		if err != nil {
			return t, err
		}
		t = any(v).(T)
	default:
		return t, fmt.Errorf("The type %T isn't supported", t)
	}
	return t, nil
}
