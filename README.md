# Running Docker App

To run the Docker app, follow the instructions below:

1. Open the terminal on your computer.
2. Navigate to the directory where the Docker Compose file is located.
3. Enter the command "DOCKER_BUILDKIT=0 docker-compose up" to build and start the Docker app.
4. Once the Docker app is running, open your preferred web browser.
5. In the browser, enter "localhost:8080" in the address bar.
6. The app should now be running and accessible through the web browser.

# Rules for Greddit

- Usernames must be unique.
- Each subgreddit must have a unique name.
- Once a post has been reported and "blocked", users will not be able to report the post any further.

# Pages present in Greddit

### Profile Page

- Shows the basic details of the user with an option to edit them
- Can check followers and following - with the ability to remove a follower and also stop following someone

### My Sub Greddits Page

- There’s a button to create a new subgreddit that asks the user to fill a form with appropriate information.
- Lists out the existing subgreddits created by the user and has a drop down button for basic information/stats about the subgreddit.
- Delete button to delete an existing subgreddit of the user.

### Sub Greddit Page

This page opens when you click on one of your subgreddits and the following pages appear on the navbar:

**Users Page**

Shows a list of users who have joined the subgreddit as well as those who have been blocked.

**Joining Requests Page**
Shows a list of users who have requested to join, with an option to either accept or reject the request.

**Reported Page**

Shows the reports that have been made on the subgreddit so far with an option to either - block the user who made the post that has been reported, delete the post that has been reported or ignore the report.

### Discover / Common Forum for all Subgreddits

Shows all the subgreddits created by the user and others as well.

- shows the list of joined subgreddits, with an option to leave them
- shows the list of subgreddits not joined, with an option to send a request
- tag based search implemented
- normal search implemented
- search with sorting based on Name(ascending), Followers(descending), Creation Date - has been implemented.

On clicking a subgreddit that you have joined, it takes you to a page where you can create a post as well see other posts that have been made. 

- Can bookmark a post
- Can report a post
- Can like/dislike a post

### Saved Posts Page

shows all the posts that have been saved/bookmarked across various subgreddits.

- Provides option to make any change to the post similar to ones you can make on the actual page
