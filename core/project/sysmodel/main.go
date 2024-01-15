package sysmodel

import "time"

type UserConfig struct {
	Id             string
	Username       string
	Password       string
	Token          string
	CreateTime     time.Time
	IsAdmin        bool
	InvitationCode string
}
type UserConfigMap = map[string]UserConfig

type SystemInfo struct {
	HasAdminInit    bool      `json:"HasAdminInit"`
	LastUpdatedTime time.Time `json:"LastUpdatedTime"`
}
