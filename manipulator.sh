#!/bin/bash

METHOD=$1
# Original url on firebase 'https://you-pin.firebaseio.com/pin_geofires.json'
URL=$2
FILE=$3

# ./manipulator.sh GET api.youpin.city/pins/-KLHYT8SThD-uCAEL_nJ
if [ "$METHOD" == "GET" ]; then
  curl -i -X GET \
        "${URL}"
# ./manipulator.sh POST api.youpin.city/pins data1.json
elif [ "$METHOD" == "POST" ]; then
  echo "Send POST request..."
  curl -i -X POST \
    -H "Content-Type: application/json" \
    -d "@${FILE}" \
    "${URL}"
# ./manipulator.sh PUT api.youpin.city/pins data1.json
elif [ "$METHOD" == "PUT" ]; then
  echo "Send PUT request..."
  curl -i -X PUT \
    -H "Content-Type: application/json" \
    -d "@${FILE}" \
    "${URL}"
# ./manipulator.sh SEARCH api.youpin.city/pins
elif [ "$METHOD" == "SEARCH" ]; then
  echo "Send SEARCH request..."
  curl -i -X GET \
    "${URL}/pins?location=-33.8670,151.1957&radius=10"
fi
