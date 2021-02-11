#!/bin/bash

sudo apt-get update
sudo apt-get install -y curl

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node


#curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh -y
#
#sudo apt-get install nodejs -y