#!/bin/bash
clear
echo clear and fetch the repo
git clone -n -b release https://github.com/Unixono/jobify.git --depth 1
echo .
echo bring the client files up
rm client -rf
cd jobify
git checkout HEAD public/Dockerfile
git checkout HEAD public/dist
mv public ../client
echo .
echo bring the coreos files up
git checkout HEAD coreos/update-server.sh
git checkout HEAD coreos/deploy.sh
git checkout HEAD coreos/jobify-mongo.service
git checkout HEAD coreos/jobify-server.service
git checkout HEAD coreos/jobify-client.service
mv coreos/* ../ -f
rm coreos -rf
cd ..
rm jobify -rf
echo .
echo destroy coreos units
fleetctl destroy jobify-client.service
sleep 10
echo .
echo remove client image
docker rmi jobify-client
echo .
echo build client image
docker build -t jobify-client client
echo .
echo run coreos units
fleetctl start jobify-client.service
sleep 5
