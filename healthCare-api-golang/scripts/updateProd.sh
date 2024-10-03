rm -rf ../build/

export GOOS=linux
export GOARCH=amd64

cd ../cmd

go build -ldflags="-linkmode=internal -w -s -extldflags '-static' -X main.BuildCPUFlags=native" -o healtchare_api ./main.go

mv healthcare_api ../build/

cd ..

ssh ubuntu@168.138.150.229 "pm2 delete api.healthcare"

scp -r ./build/healthcare_api ubuntu@168.138.150.229:/home/ubuntu/prd_projects/back/healthcare/

ssh ubuntu@168.138.150.229 "/home/ubuntu/start_scripts/start_healthcare_api.sh"
