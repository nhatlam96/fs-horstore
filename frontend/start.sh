#!/bin/bash

# Function to check if Docker is installed
is_docker_installed() {
    if ! command -v docker &> /dev/null; then
        return 1
    fi
    return 0
}

# Check if Docker is installed
if ! is_docker_installed; then
    echo "Docker is not installed. \n Install Docker!\nHere a tutorial https://docs.docker.com/engine/install/ubuntu/"

    # Install Docker
    # curl -fsSL https://get.docker.com -o get-docker.sh
    # sudo sh get-docker.sh
    # sudo usermod -aG docker $USER
    # sudo systemctl enable docker
    # sudo systemctl start docker

    # # Clean up
    # rm get-docker.sh

    # echo "Docker has been installed."
    return 1
else
    echo "Docker is already installed.\nNow Building of the image"
fi

# Build the Docker image
sudo docker build -t frontend .

# Run the Docker container
# Change the port if this is already in use
sudo docker run -p 8081:80 frontend

# Open the link in the browser
# http://localhost:8081