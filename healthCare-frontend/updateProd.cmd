call npm run build:prod

ssh root@147.79.81.13 "pm2 delete ssr.healthcare"

ssh root@147.79.81.13 "rm -rf /var/www/html/healthcare/*"

scp -r dist/front-healthcare/* root@147.79.81.13:/var/www/html/healthcare/

ssh root@147.79.81.13 "/root/start_healthcare.sh"