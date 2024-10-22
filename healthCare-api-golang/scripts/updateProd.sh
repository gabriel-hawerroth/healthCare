ssh ubuntu@hawetec "pm2 delete api.healthcare"

scp -r healthcare_api ubuntu@hawetec:/home/ubuntu/prd_projects/back/healthcare/

ssh ubuntu@hawetec "/home/ubuntu/start_scripts/start_healthcare_api.sh"

rm healthcare_api
