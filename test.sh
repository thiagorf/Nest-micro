#!/bin/sh

echo "Which script did you like to run?"
read  SC


case $SC in
    post)
        curl -d '{"email":"test@gmail.com", "firstName":"john", "lastName":"doe", "username": "joe"}' \
            -H "Content-type: application/json" \
            -X POST http://localhost:8080/admin/realms/master/users ;;
    get)
        echo "Is a get command" ;;
    *)
        echo "Is something else" ;;
esac
