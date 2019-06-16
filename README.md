# Start:
npm run dev
# Redis start:
# Redis Installation:
Windows: http://www.runoob.com/redis/redis-install.html
Mac: brew install redis
# NPM:
npm install redis --save
# When using Express:
npm i redis connect-redis --save
# Start redis server: 
redis-server
# Connect redis client locally: 
redis-cli.exe -h 127.0.0.1 -p 6379
# Basic Usages:
set myKey
get myKey
# Get all keys:
keys * 
# Delete key:
del myKey
# Redis end
# Nginx start:
Windows: C:\nginx\conf\nginx.conf
Mac: /usr/local/nginx/nginx.conf
start: 
1. go to nginx.exe folder in cli
2. nginx.exe
test: 
1. go to nginx.exe folder in cli
2. nginx.exe -t
# Log: 
# Only for Linux
sh copy.sh
#pm2:
#installation:
npm install pm2 -g
pm2 --version
#Command:
#Check:
pm2 list
#Start:
pm2 start ... ,
#Restart:
pm2 restart <AppName>/<id>
#Stop/Delete:
pm2 stop <AppName>/<id>, pm2 delete <AppName>/<id>
#Info:
pm2 info <AppName>/<id>
#Log:
pm2 log <AppName>/<id>
# Monit:
pm2 monit <AppName>/<id>

