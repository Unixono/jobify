#!/bin/bash

clear
echo clear and fetch the repo
git clone -n -b release https://github.com/Unixono/jobify.git --depth 1
echo .
echo bring the server files up
mv jobify server
cd server
#to fetch the repo
git fetch origin
git checkout HEAD Dockerfile
git checkout HEAD server.js
git checkout HEAD app
git checkout HEAD models
git checkout HEAD LICENSE
git checkout HEAD package.json
git checkout HEAD README.md
echo .
echo bring the client files up
git checkout HEAD public/Dockerfile
git checkout HEAD public/dist
mv public ../client
echo .
echo bring the coreos files up
git checkout HEAD coreos/jobify-mongo.service
git checkout HEAD coreos/jobify-server.service
git checkout HEAD coreos/jobify-client.service
mv coreos/* ../
rm coreos -r
cd ..
echo .
echo build server image
docker build -t jobify-server server
echo .
echo build client image
docker build -t jobify-client client
echo .
echo run coreos units
fleetctl start jobify-mongo.service
sleep 5
fleetctl start jobify-server.service
sleep 5
fleetctl start jobify-client.service
