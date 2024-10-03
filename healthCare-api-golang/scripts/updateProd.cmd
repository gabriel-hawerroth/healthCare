@echo off

rem 1. Remover todos os arquivos da pasta build
del /Q "../build/*.*"

rem 2. Definindo env para linux
set GOOS=linux
set GOARCH=amd64

rem 3. Entrar na pasta cmd e compilar o código
cd /D "../cmd"
go build -ldflags="-linkmode=internal -w -s -extldflags '-static' -X main.BuildCPUFlags=native" -o healthcare_api ./main.go

rem 4. Mover o arquivo de build para a pasta build
move /Y "healthcare_api" "../build/healthcare_api"
cd ..

rem 5. Parar a api em produção e remover o arquivo de build
ssh ubuntu@168.138.150.229 "pm2 delete api.healthcare"

rem 6. Copiar o arquivo de build para a VM em produção
scp -r ./build/healthcare_api ubuntu@168.138.150.229:/home/ubuntu/prd_projects/back/healthcare/

rem 7. Conectar na VM de produção e reiniciar o serviço usando pm2
ssh ubuntu@168.138.150.229 "/home/ubuntu/start_scripts/start_healthcare_api.sh"

echo Concluído.
