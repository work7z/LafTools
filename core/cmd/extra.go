package cmd

import (
	"laftools-go/core/project/base/extra"

	"github.com/spf13/cobra"
)

var devExtraCmd = &cobra.Command{
	Use:   "dev-extra",
	Short: "Run dev extra stuff",
	Run: func(cmd *cobra.Command, args []string) {
		extra.HandleExtraAction(cmd, args)
	},
}
