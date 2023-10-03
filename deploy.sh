#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

# git init
git add -A
git commit -m 'feat: 完善了文档'
git pull
git remote set-url origin https://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@github.com/eveningwater/my-web-projects.git
git push -f https://github.com/eveningwater/my-web-projects.git master
# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -