@echo off
start "docker stop rm" cmd /c "docker stop webshop && docker rm webshop"
timeout /t 2
start "database" cmd /c "docker-compose up"
timeout /t 8
start "cp" cmd /c "docker cp app/models/webshop.sql webshop:/var/lib/postgresql/data/"
timeout /t 3
start "exec" cmd /c "docker exec -it webshop psql -U postgres -f /var/lib/postgresql/data/webshop.sql"
start "api" cmd /c "node app/build/webapp.js"
start "jest" cmd /c "cd app/build && jest && pause"
start "frontend" cmd /c "cd ../webshop_frontend/ && ng serve"
timeout /t 8
start "browser" "http://localhost:4200/"
@echo on