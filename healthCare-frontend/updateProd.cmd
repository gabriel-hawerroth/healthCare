ssh root@15.229.18.114 "pm2 delete ssr.healthcare"

ssh root@15.229.18.114 "rm -rf /var/www/html/healthcare/*"

scp -r dist/front-healthcare/* root@15.229.18.114:/var/www/html/healthcare/

ssh root@15.229.18.114 "/root/start_healthcare.sh"