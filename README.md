 # Jobify
An application to manage Job offers.

Dev Notes:
- Yoman, grunt has been installed as local dev dependencies, 
and when is installed as that way (with out -g), the global alliases is not set, 
to do it run:
$ alias yo="./node_modules/.bin/yo"
$ alias grunt="./node_modules/.bin/grunt"
$ alias bower="./node_modules/.bin/bower"

If you want to run then automaticaly, every time that the venv is loaded, 
add the aliases to:
/home/<userdir>/.virtualenvs/<virtualenvName>/bin/posactivate

and the next to delete the aliases on venv deactivation:
$ unalias yo
$ unalias bower
$ unalias grunt
/home/<userdir>/.virtualenvs/<virtualenvName>/bin/posdeactivate

