package cmd

import (
	"laftools-go/core/fn/tools"

	"github.com/spf13/cobra"
)

var middlewareCmd = &cobra.Command{
	Use:   "fn",
	Short: "Do fn stuff",
	Long:  `To call what LafTools needs`,
	Run:   tools.RunCMD,
}
