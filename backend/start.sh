#!/bin/bash
sudo apt install gnome-terminal
docker stop webshop_backend webshop_frontend && docker rm webshop_backend webshop_frontend
sleep 2
gnome-terminal --title="database" --command="docker-compose up"
sleep 6
docker cp app/models/webshop.sql webshop_backend:/var/lib/postgresql/data/
sleep 2
docker exec -it webshop_backend psql -U postgres -f /var/lib/postgresql/data/webshop.sql
gnome-terminal --title="api" --command="node app/build/webapp.js"
gnome-terminal --title="jest" -- bash -c 'cd app/build && jest; read -p "Press Enter to exit"'
gnome-terminal --title="angular" -- bash -c 'cd ../frontend && sudo docker build -t webshop_frontend . && sudo docker run -p 4200:80 webshop_frontend'
sleep 4
firefox "http://localhost:4200/"