#!/bin/bash
s aux | grep start.sh | awk '{print $2}' | xargs -I {} kill -9 {}