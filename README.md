# Running Docker App

To run the Docker app, follow the instructions below:

1. Open the terminal on your computer.
2. Navigate to the directory where the Docker Compose file is located.
3. Enter the command "DOCKER_BUILDKIT=0 docker-compose up" to build and start the Docker app.
4. Once the Docker app is running, open your preferred web browser.
5. In the browser, enter "localhost:8080" in the address bar.
6. The app should now be running and accessible through the web browser.

## Assumptions for Greddit

- Usernames must be unique.
- Each subgreddit must have a unique name.
- Once a post has been reported and "blocked", the report will be deleted from the database.
- Once a post has been reported and "blocked", users will not be able to report the post any further.