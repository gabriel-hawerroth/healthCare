#!/bin/bash

npm run build:prod

if [ $? -ne 0 ]; then
    echo "O build falhou. Parando a execução do script."
    exit 1
fi

ssh ubuntu@hawetec "pm2 delete ssr.healthcare"

ssh ubuntu@hawetec "rm -rf /home/ubuntu/prd_projects/front/healthcare/*"

scp -r dist/healthcare-frontend/* ubuntu@hawetec:/home/ubuntu/prd_projects/front/healthcare/

ssh ubuntu@hawetec "/home/ubuntu/start_scripts/start_healthcare.sh"
