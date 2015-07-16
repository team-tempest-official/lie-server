#!/bin/bash

function lie-adduser {
	curl -v -X POST --data "email=$1&name=$2" localhost:3000/users/create
}

function lie-listusers {
	curl -v -X GET localhost:3000/users/
}

output="Error"

if [ "$1" == "adduser" ]; then
	echo "Adding user"
	output="$(lie-adduser $2 $3)"
elif [ "$1" == "listusers" ]; then
	echo "Listing users"
	output="$(lie-listusers)"
fi

echo $output