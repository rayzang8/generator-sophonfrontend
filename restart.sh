#!/bin/bash
pid=$(lsof -i:9000 |grep \(LISTEN\) |awk '{print $2}')
echo $pid
kill -9 $pid
yarn start