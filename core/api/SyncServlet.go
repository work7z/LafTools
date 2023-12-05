package api

import (
	"sync"

	"github.com/gin-gonic/gin"
)

var tmpReducerValueMap map[string]interface{} = make(map[string]interface{})
var lock = &sync.Mutex{}

func API_Sync_Reducer_Get(c *gin.Context) {
	lock.Lock()
	defer lock.Unlock()
	// get reducer
	reducerName := c.Param("name")
	reducer := tmpReducerValueMap[reducerName]
	if reducer == nil {
		c.JSON(404, gin.H{
			"error": "Reducer not found",
		})
		return
	}
	// get state
	OKLa(c, DoValueRes(reducer))
}

func API_Sync_Reducer_Save(c *gin.Context) {
	lock.Lock()
	defer lock.Unlock()

	// get reducer
	reducerName := c.Param("name")
	reducer := tmpReducerValueMap[reducerName]
	if reducer == nil {
		c.JSON(404, gin.H{
			"error": "Reducer not found",
		})
		return
	}
	// get state
	var state interface{}
	if err := c.BindJSON(&state); err != nil {
		ErrLa(c, err)
		return
	}
	// save state
	tmpReducerValueMap[reducerName] = state
	OKLa(c, DoValueRes("saved"))
}
