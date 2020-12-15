#!/bin/bash
# Upload files to Github - https://github.com/talesCPV/iron_age.git

git config --global user.email "tales@flexibus.com.br"

git config --global user.name "talesCPV"

git init

git add .

git commit -m "by_script_tales"

git remote add origin "https://github.com/talesCPV/iron_age.git"

git commit -m "by_script"

git push -f origin teste
