package tools

import (
	"fmt"
	"net"
	"strconv"
)

func GetAvailableTCPPortFrom(startPort int) (int, error) {
	for port := startPort; port <= 65535; port++ {
		address := net.JoinHostPort("localhost", strconv.Itoa(port))
		listener, err := net.Listen("tcp", address)
		if err == nil {
			listener.Close()
			return port, nil
		}
	}
	return 0, fmt.Errorf("no available TCP port found")
}
