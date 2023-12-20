package conv

import (
	"reflect"
)

//
// Converts an any element type slice or array to the specified type mapping set.
// Note that the the element type of input don't need to be equal to the map key type.
// For example, []uint64{1, 2, 3} can be converted to map[uint64]struct{}{1:{}, 2:{},3:{}}
// and also can be converted to map[string]struct{}{"1":{}, "2":{}, "3":{}} if you want.
//

// ToSet converts a slice or array to map[T]struct{}.
// An error will be returned if an error occurred.
func ToSet[T comparable](a any) map[T]struct{} {
	m, _ := ToSetE[T](a)
	return m
}

// ToSetE converts a slice or array to map[T]struct{} and returns an error if occurred.
// Note that the the element type of input don't need to be equal to the map key type.
// For example, []uint64{1, 2, 3} can be converted to map[uint64]struct{}{1:{},2:{},3:{}}
// and also can be converted to map[string]struct{}{"1":{},"2":{},"3":{}} if you want.
// Note that this function is implemented through 1.18 generics, so the element type needs to
// be specified when calling it, e.g. ToSetE[int]([]int{1,2,3}).
func ToSetE[T comparable](a any) (map[T]struct{}, error) {
	t := reflect.TypeOf(a)
	v := reflect.ValueOf(a)
	if t.Kind() == reflect.Slice && v.IsNil() {
		return nil, nil
	}

	// Execute the conversion.
	mapT := reflect.MapOf(t.Elem(), reflect.TypeOf(struct{}{}))
	mapV := reflect.MakeMapWithSize(mapT, v.Len())
	for i := 0; i < v.Len(); i++ {
		mapV.SetMapIndex(v.Index(i), reflect.ValueOf(struct{}{}))
	}
	if v, ok := mapV.Interface().(map[T]struct{}); ok {
		return v, nil
	}
	// Convert the element to the type T.
	set := make(map[T]struct{}, v.Len())
	for _, k := range mapV.MapKeys() {
		v, err := ToAnyE[T](k.Interface())
		if err != nil {
			return nil, err
		}
		set[v] = struct{}{}
	}
	return set, nil
}
