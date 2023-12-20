package file

import (
	"os"
	"path/filepath"
)

// Create creates or truncates file specified by path.
// If the file already exists, it is truncated.
// If the parent directory does not exist, it will be created with mode os.ModePerm(0777).
// If the file does not exist, it is created with mode 0666.
// If successfully called Create, the returned file can be used for I/O
// and the associated file descriptor has mode O_RDWR.
func Create(path string) (*os.File, error) {
	exist, err := IsExist(path)
	if err != nil {
		return nil, err
	}
	if exist {
		return os.Create(path)
	}
	if err := os.MkdirAll(filepath.Dir(path), os.ModePerm); err != nil {
		return nil, err
	}
	return os.Create(path)
}

// CreateFile creates a file specified by path.
// If the file already exists, it is truncated.
// If the parent directory does not exist, it will be created with mode os.ModePerm(0777).
func CreateFile(path string) error {
	file, err := Create(path)
	if err != nil {
		return err
	}
	defer file.Close()
	return nil
}

// FileToBytes serialize the file to bytes.
func FileToBytes(path string) []byte {
	bytes, _ := os.ReadFile(path)
	return bytes
}

// BytesToFile writes data to a file.
// If the file does not exist it will be created with permission mode 0644.
func BytesToFile(path string, data []byte) error {
	exist, _ := IsExist(path)
	if !exist {
		if err := CreateFile(path); err != nil {
			return err
		}
	}
	return os.WriteFile(path, data, 0644)
}

// ClearFile clears a file content.
func ClearFile(path string) error {
	f, err := os.OpenFile(path, os.O_WRONLY|os.O_TRUNC, 0777)
	if err != nil {
		return err
	}
	defer f.Close()
	return nil
}
