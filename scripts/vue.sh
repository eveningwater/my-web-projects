#!/bin/bash
for loop in 1 2 3 4 5
do
    if [[ $1 == $loop ]];
    then 
        cd vue/$1
        live-server ./
    fi
done