@echo off

rem 1. Remover todos os arquivos da pasta build
del /Q "../build/*.*"

rem 2. Definindo env para linux
set GOOS=linux
set GOARCH=amd64

rem 3. Entrar na pasta cmd e compilar o código
cd /D "../cmd"
go build -o healthcare_api

rem 4. Mover o arquivo de build para a pasta build
move /Y "healthcare_api" "../build/healthcare_api"
cd ..

rem 5. Parar a api em produção e remover o arquivo de build
ssh root@147.79.81.13 "pm2 delete api.healthcare"
ssh root@147.79.81.13 "rm -rf /home/ubuntu/workspace/healthcare_api/*"

rem 6. Copiar o arquivo de build para a VM em produção
scp -r ./build/healthcare_api root@147.79.81.13:/home/ubuntu/workspace/healthcare_api/

rem 7. Conectar na VM de produção e reiniciar o serviço usando pm2
ssh root@147.79.81.13 "/root/start_healthcare_api.sh"

echo Concluído.
