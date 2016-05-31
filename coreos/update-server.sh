#!/bin/bash
clear
echo clear and fetch the repo
git fetch -n -b release https://github.com/Unixono/jobify.git --depth 1
echo .
echo bring the server files up
rm server -rf
mv jobify server
cd server
git checkout HEAD Dockerfile
git checkout HEAD server.js
git checkout HEAD app
git checkout HEAD models
git checkout HEAD LICENSE
git checkout HEAD package.json
git checkout HEAD README.md
echo .
echo bring the coreos files up
git checkout HEAD coreos/update-client.sh
git checkout HEAD coreos/deploy.sh
git checkout HEAD coreos/jobify-mongo.service
git checkout HEAD coreos/jobify-server.service
git checkout HEAD coreos/jobify-client.service
mv coreos/* ../ -f
rm coreos -rf
cd ..
echo .
echo destroy coreos units
fleetctl destroy jobify-server.service
sleep 10
echo .
echo remove server image
docker rmi jobify-server
echo .
echo build server image
docker build -t jobify-server server
echo .
echo run coreos units
fleetctl start jobify-server.service
sleep 5
