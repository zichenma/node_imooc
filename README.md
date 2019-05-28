# Start:
npm run dev
# Redis start:
# Redis Installation:
Windows: http://www.runoob.com/redis/redis-install.html
Mac: brew install redis
# NPM:
npm install redis --save
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
