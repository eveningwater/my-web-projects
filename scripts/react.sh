#!/bin/bash
echo "第一个参数:$1"
case $1 in 1)
    cd react/1/dist
    live-server ./
    ;;
    2)
    cd react/2/
    #yarn install
    npm run $2
    ;;
    3)
    cd react/3/
    if [[ $2 ]];
        then 
            # yarn install
            npm run $2
    else live-server ./
    fi
    ;;
    4)
    cd react/4/
    live-server ./
    ;;
esac