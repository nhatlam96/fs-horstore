@echo off
start "docker stop rm" cmd /c "docker stop webshop_backend webshop_frontend && docker rm webshop_backend webshop_frontend"
timeout /t 2
start "database" cmd /c "docker-compose up"
timeout /t 8
start "cp" cmd /c "docker cp app/models/webshop.sql webshop_backend:/var/lib/postgresql/data/"
timeout /t 3
start "exec" cmd /c "docker exec -it webshop_backend psql -U postgres -f /var/lib/postgresql/data/webshop.sql"
start "api" cmd /c "node app/build/webapp.js"
start "jest" cmd /c "cd app/build && jest && pause"
start "angular" cmd /c "cd ../frontend && docker build -t webshop_frontend . && docker run -p 4200:80 webshop_frontend"
timeout /t 8
start "browser" "http://localhost:4200/"
@echo on