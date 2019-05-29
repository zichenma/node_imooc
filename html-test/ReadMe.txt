Windows:
1. Make html-test as root folder, use live server (port:5500) open index.html
2. Copy nginx.conf to C:\nginx-1.16.0\conf
3. Under C:\nginx-1.16.0 use cil type: to check if all settings in nginx.conf file are valid.
   nginx.exe -t
4. Under C:\nginx-1.16.0 start nginx:
   nginx.exe
   if no error message, it means nginx is running
5. Go to http://localhost:8080/