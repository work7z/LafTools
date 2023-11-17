#!/bin/bash
cd $CODEGEN_GO_ROOT
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSendReqToNodeProcessForPerformance$ codegen-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSendReqToNodeProcess$ codegen-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSimplePutAndGet$ codegen-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSimpleRunNode$ codegen-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestSimplePutAndGet$ codegen-go/core/cmd -v
# /usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestGetAllSubExtCategory$ codegen-go/core/cmd -v
/usr/local/go/bin/go test -count=1 -timeout 30s -run ^TestNodeMultipleRequest$ codegen-go/core/cmd -v




