#!/bin/bash
set -e
sudo docker push codegentoolbox/laftools-linux-x64:insider
/home/jerrylai/Documents/PersonalProjects/codegen-portal/pipeline/redeploy-docker.sh