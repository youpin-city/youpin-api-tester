#!/bin/bash

METHOD=$1
# 'https://you-pin.firebaseio.com/pin_geofires.json'
URL=$2
FILE=$3

if [ "$METHOD" == "GET" ]; then
  curl -i -X GET \
       -H "Host:you-pin.firebaseio.com" \
        "${URL}"
elif [ "$METHOD" == "POST" ]; then
  echo "Send POST request..."
  curl -i -X POST \
    -H "Content-Type: application/json" \
    -d "@${FILE}" \
    "${URL}"
elif [ "$METHOD" == "PUT" ]; then
  echo "Send PUT request..."
  curl -i -X PUT \
    -H "Content-Type: application/json" \
    -d "@${FILE}" \
    "${URL}"
elif [ "$METHOD" == "SEARCH" ]; then
  echo "Send SEARCH request..."
  curl -i -X GET \
    "${URL}/pins?location=-33.8670,151.1957&radius=10"
fi
