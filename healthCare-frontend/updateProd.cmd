call npm run build:prod

ssh ubuntu@168.138.150.229 "pm2 delete ssr.healthcare"

ssh ubuntu@168.138.150.229 "rm -rf /home/ubuntu/prd_projects/front/healthcare/*"

scp -r dist/healthcare-frontend/* ubuntu@168.138.150.229:/home/ubuntu/prd_projects/front/healthcare/

ssh ubuntu@168.138.150.229 "/home/ubuntu/start_scripts/start_healthcare.sh"
