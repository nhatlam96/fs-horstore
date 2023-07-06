# Starting the Webshop

## Requirements
Make sure the following commands are installed on your system:
- docker https://docs.docker.com/get-docker/
  - docker compose https://docs.docker.com/compose/install/
- node https://nodejs.org/en/download
- jest (install it with `npm install -g jest`, try with `sudo` on unix)

## Running the Commands
1. open Docker Desktop or have Docker Daemon running
2. open terminal
   1. `cd backend`
   2. `sudo docker stop webshop`
   3. `sudo docker rm webshop`
   4. `sudo docker-compose up`
3. open new terminal
   1. `cd backend`
   2. `sudo docker cp app/models/webshop.sql webshop:/var/lib/postgresql/data/` 
   3. `sudo docker exec -it webshop psql -U postgres -f /var/lib/postgresql/data/webshop.sql`
   4. `node app/build/webapp.js`
4. open new terminal
   1. `cd frontend`
   2. `ng serve`

### Startscripts
Alternatively, you can use the provided scripts in `backend` directory 
- For Windows: `start.bat`
- For Ubuntu: `start.sh`
  - This assumes docker can be run without sudo https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user

## Unit Tests
If you encounter any problems, please refer to https://jestjs.io/docs/

1. open terminal
   1. navigate to the respective directories:
      1. Backend: `cd backend/app/build`
      2. Frontend: `cd frontend/src`
   2. run `jest` command
      1. alternatively, you can use `npx jest`