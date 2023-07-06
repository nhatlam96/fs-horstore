#!/bin/bash
sudo apt install gnome-terminal
docker stop webshop && docker rm webshop
sleep 2
gnome-terminal --title="database" --command="docker-compose up"
sleep 6
docker cp app/models/webshop.sql webshop:/var/lib/postgresql/data/
sleep 2
docker exec -it webshop psql -U postgres -f /var/lib/postgresql/data/webshop.sql
gnome-terminal --title="api" --command="node app/build/webapp.js"
gnome-terminal --title="jest" -- bash -c 'cd app/build && jest; read -p "Press Enter to exit"'
gnome-terminal --title="frontend" --command="bash -c 'cd ../frontend/src && ng serve'"
sleep 6
firefox "http://localhost:4200/"