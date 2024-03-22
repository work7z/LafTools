#!/bin/bash
while [ 1 -eq 1 ];
do
(
    cd $LAFTOOLS_ROOT/modules/web2
    npx vitest run -t "generate-app-op-detail-list"
)
(
    cd $LAFTOOLS_ROOT
    npm run fe-scan-zh
)
sleep 30
done