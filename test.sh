#!/bin/sh

echo "Which script did you like to run?"
read  SC


case $SC in
    post)
        curl -d '{"email":"test@gmail.com", "name": "joe", "password":"1234"}' \
            -H "Content-type: application/json" \
            -X POST http://localhost:3002/auth/signup ;;
    get)
        echo "Is a get command" ;;
    *)
        echo "Is something else" ;;
esac
