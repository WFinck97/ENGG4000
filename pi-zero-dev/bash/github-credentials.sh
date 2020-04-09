#!/bin/bash

#adding github credentials so dont have to enter every time
git config --global credential.helper store
git pull

#will then be prompted to enter github credentials and they should save