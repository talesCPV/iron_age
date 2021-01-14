#!/bin/sh
echo 'UPLOAD DO SISTEMA BACKUP EM www.flexibus.com.br/iron_age'
rm -rf .git/

HOST='ftp.flexibus.com.br' 
USER='iron_age@flexibus.com.br'
PASS='iron2020'
HDIR="/"
LDIR=$(pwd)

echo $LDIR

ncftpput -R -v -u $USER -p $PASS $HOST $HDIR $LDIR
