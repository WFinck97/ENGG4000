#!/bin/bash

#not sure what this is doing, but in a tutorial - there is an error because of hw architecture of pi zero
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

#install nodejs
sudo apt-get install -y nodejs

#check the version
node -v

# now need to get npm working

#download file from nodejs
wget https://nodejs.org/dist/v8.9.0/node-v8.9.0-linux-armv6l.tar.gz

#extract file
tar -xzf node-v8.9.0-linux-armv6l.tar.gz

#copy node to /usr/local
cd node-v8.9.0-linux-armv6l/
sudo cp -R * /usr/local

# check version
npm -v