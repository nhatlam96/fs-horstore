# Hier ein Readme um das Frontend zu laden, wenn es noch nicht der Fall mit der Script-Datei ist.
# METHOD 1

1) Navigate to root directory
-After you finish to pull the project, -please navigate to the root directory. 
## Frontend/

2) Run this command. 
## ng serve
### Make sure to install angular and node(link for node download https://nodejs.org/en)
### npm install -g @angular/cli
The default port is 4200.

# METHOD 2

1) Navigate to root directory
-After you finish to pull the project, -please navigate to the root directory. 
## cd Frontend/

2)  Build the Docker Image
## sudo docker build -t webshop_frontend .

3) Run the Docker Container
## sudo docker run -p 4300:80 webshop_frontend

4) Access Your Angular App
## http://localhost:4300
Please always start with the /index.html or / route because of docker we need to come first here.


# METHOD 3

1) Navigate to root directory After you finish to pull the project, please navigate to the root directory. 
## Frontend/

2)  Make the script file executable by running the following command
## chmod +x start.sh

3) Run the script by executing the following command
## ./start.sh

4) Access Your Angular App on
## http://localhost:8081
Please always start with the /index.html or / route because of docker we need to come first here.




