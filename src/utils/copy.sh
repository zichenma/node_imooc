#!/bin/sh
cd D:\Dropbox\javascript\NodeJS_imooc\blog-1\logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log