// LafTools - The Leading All-In-One ToolBox for Programmers.
//
// Date: Sat, 7 Oct 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://laf-tools.com and https://codegen.cc
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

package api

import (
	"codegen-go/core/config"
	"codegen-go/core/context"
	"codegen-go/core/gutils"
	"codegen-go/core/log"
	"codegen-go/core/nocycle"
	"errors"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/samber/lo"
)

type CalcPasswordForm struct {
	Pw string `json:"pw" binding:"required"`
}

func API_USER_CalcPassword(c *gin.Context) {
	form := CalcPasswordForm{}
	err := c.BindJSON(&form)
	wc := context.NewWC(c)
	if HasError(wc, err) {
		return
	}
	pw := form.Pw
	log.Ref().Debug("pw is " + pw)
	OKLa(c, DoValueRes(gin.H{
		"CalcPW": config.EncryptUserPassword(pw),
	}))
}

type VerifyUserServletForm struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Token    string `json:"token"`
}

func API_USER_VerifyUserServlet(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	form := &VerifyUserServletForm{}
	e := c.BindJSON(&form)
	if lo.IsEmpty(form.Username) {
		ErrLa2(c, wc.Dot("2144", "Username is required"))
		return
	}
	form.Username = strings.TrimSpace(form.Username)
	form.Password = strings.TrimSpace(form.Password)
	if HasError(wc, e) {
		return
	}
	userConfig, err := config.GetUserConfigFromFile()
	if HasError(wc, err) {
		return
	}
	// submit local account and local user
	submittedUsername := form.Username
	submittedPassword := form.Password
	pw_f := !lo.IsEmpty(submittedPassword)
	submittedToken := form.Token
	t_f := !lo.IsEmpty(submittedToken)
	if !pw_f && !t_f {
		HasErrorS(wc, wc.Dot("1604", "Unable to detect any auth value"))
	}
	obj, found := config.GetItemByUserName(userConfig, submittedUsername)

	if !found {
		HasError(wc, errors.New(wc.Dot("1600", "Account Not Found")))
		return
	}
	if pw_f {
		checkPw := config.EncryptUserPassword(submittedPassword)
		if checkPw != config.GetUserPassword(obj) {
			HasErrorS(wc, wc.Dot("1603", "Password Does Not Match"))
			return
		}
	} else if t_f {
		if submittedToken != obj.Token {
			HasErrorS(wc, wc.Dot("1605", "Token Does Not Match."))
			return
		}
	}
	OKLa(wc.GinContext, DoValueRes(gin.H{
		"token": obj.Token,
	}))
}

// func API_USER_GetForgeByUserId(c *gin.Context) {
// 	wc := context.WebContext{C: c}
// 	userId := wc.GetUserID()
// 	str, err := config.ReadUserForgeFromFile(userId)
// 	if HasError(wc, err) {
// 		return
// 	}
// 	OKLa(c, DoValueRes(gin.H{
// 		"ForgeState": str,
// 	}))
// }

func API_USER_GetAnyKeyByUserId(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	userId := wc.GetUserID()
	key := c.Query("key")
	str, err := config.ReadUserAnyKeyFromFile(userId, key)
	if HasError(wc, err) {
		return
	}
	OKLa(c, DoValueRes(gin.H{
		"StateStr": str,
	}))
}

type API_USER_SetForgeByUserIdForm struct {
	StateStr string
}

func API_USER_SetAnyKeyByUserId(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	key := c.Query("key")
	userId := wc.GetUserID()
	form := &API_USER_SetForgeByUserIdForm{}
	c.BindJSON(&form)
	fs, fs_f := form.StateStr, lo.IsNotEmpty(form.StateStr)
	if !fs_f {
		IncompleteParam(wc)
		return
	}
	if userId == "" {
		ErrLa2(c, "No available user id")
		return
	}
	err := config.WriteUserAnyKeyFromFile(userId, key, fs)
	if HasError(wc, err) {
		return
	}
	// iterate value from GetWSMarkListByTokenId(c), and send message to all
	markList := GetWSMarkListByTokenId(c)
	for _, v := range markList {
		v.wsConn.WriteJSON(DoValueResForWS(200, "FORGE_STATE_UPDATE", gin.H{
			"ack": 1,
		}))
	}
	OKLa(c, DoValueRes(1))
}

type CreateNewAccounttForm struct {
	Username       string `json:"username"`
	Password       string `json:"password"`
	Token          string `json:"token"`
	InvitationCode string `json:"invitationCode"`
}

func API_USER_CreateNewAccount(c *gin.Context) {
	wc := context.WebContext{GinContext: c}
	form := &CreateNewAccounttForm{}
	c.BindJSON(&form)
	if lo.IsEmpty(form.Username) {
		ErrLa2(c, wc.Dot("0356", "Username is required"))
		return
	}
	form.Username = strings.TrimSpace(form.Username)
	form.Password = strings.TrimSpace(form.Password)
	u1 := form.Username
	p1 := form.Password
	uf1 := lo.IsNotEmpty(u1)
	pf1 := lo.IsNotEmpty(p1)
	InvitationCode := form.InvitationCode
	InvitationCode_f := lo.IsNotEmpty(InvitationCode)
	if !uf1 || !pf1 || !InvitationCode_f {
		IncompleteParam(wc)
		return
	}
	anyAck := false
	userConfigMap, err := config.GetUserConfigFromFile()
	if err != nil {
		HasError(wc, err)
		return
	}
	if FN_verifyUserStatus(userConfigMap, u1, wc) {
		return
	}
	for _, userConfig := range userConfigMap {
		if userConfig.IsAdmin {
			if userConfig.InvitationCode != "" && userConfig.InvitationCode == InvitationCode {
				anyAck = true
			}
		}
	}
	if !anyAck {
		HasErrorS(wc, wc.Dot("1722", "The token for creating new user is incorrect"))
		return
	} else {
		userConfig := config.UserConfig{
			Id:             gutils.UUID(),
			Username:       u1,
			Password:       config.EncryptUserPassword(p1),
			Token:          gutils.UUID(),
			CreateTime:     time.Now(),
			IsAdmin:        false,
			InvitationCode: "",
		}
		userConfigMap[userConfig.Id] = userConfig
		err := config.SetUserConfigIntoFile(userConfigMap)
		if HasError(wc, err) {
			return
		}
		OKLa(c, DoValueRes(userConfigMap))
	}
}

func FN_verifyUserStatus(userConfigMap map[string]config.UserConfig, u1 string, wc context.WebContext) bool {
	_, foundPrev := config.GetItemByUserName(userConfigMap, u1)
	if foundPrev {
		HasErrorS(wc, wc.Dot("1753", "Username is already used in system."))
		return true
	}
	return false
}

type API_USER_ResetPasswordByOldPasswordForm struct {
	Username    string
	Password    string
	NewPassword string
}

func API_USER_ResetPasswordByOldPassword(c *gin.Context) {
	wc := context.NewWC(c)
	form := &API_USER_ResetPasswordByOldPasswordForm{}
	c.BindJSON(&form)
	u, u_f := nocycle.CheckStr(form.Username)
	p, p_f := nocycle.CheckStr(form.Password)
	np, np_f := nocycle.CheckStr(form.NewPassword)
	if AnyIsFalse(u_f, p_f, np_f) {
		IncompleteParam(wc)
		return
	}
	userConfigMap, err := config.GetUserConfigFromFile()
	if HasError(wc, err) {
		return
	}
	obj, foundPrev := config.GetItemByUserName(userConfigMap, u)
	if foundPrev {
		HasErrorS(wc, wc.Dot("1758", "Username is already used in system."))
		return
	}
	p = config.EncryptUserPassword(p)
	np = config.EncryptUserPassword(np)
	if config.GetUserPassword(obj) != p {
		HasErrorS(wc, wc.Dot("1756", "Password does not match."))
		return
	}
	obj.Password = np
	err2 := config.SetUserConfigIntoFile(userConfigMap)
	if HasError(wc, err2) {
		return
	}
	os.Remove(config.GetUserPasswordPatchFile(*obj))
	OKLa(wc.GinContext, DoValueRes("this is get user token"))
}
