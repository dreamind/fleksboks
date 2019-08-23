git push origin master -f
git checkout gh-pages
git pull origin gh-pages -f
git merge master
git push origin gh-pages
git checkout master