  
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");
      
        loader.classList.add("loader--hidden");
      
        loader.addEventListener("transitionend", () => {
          document.body.removeChild(loader);
        });
        });
    let blogPosts = []
    let activePostIndex = null;

    function displayAlert() {
        var userChoice = confirm("Do you want to delete the post?");

        return userChoice;
    }

    function renderBlogPosts() {
        posts = {};
        const blogPostsContainer = document.getElementById('blogPosts');
        blogPostsContainer.innerHTML = '';
        blogPosts.reverse();

        blogPosts.forEach((post, index) => {
            posts[index] = post.title;
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title} </h2>
                <p>by ${post.name}</p>
                <p>${post.content}</p>
                <button class="toggleReplies" data-index="${index}">Show Replies</button>
                <div class="replies" style="display:none;"></div>
                <input type="text" class="commentText" id="commentText${index}" placeholder="Your Comment" style="display:none;">
                <button class="commentButton" data-index="${index}" style="display:none;">Comment</button>
                <button class="deletePost" data-index="${index}">Delete Post</button>
            `;
            blogPostsContainer.appendChild(postElement);

            const toggleButton = postElement.querySelector('.toggleReplies');
            const repliesContainer = postElement.querySelector('.replies');
            const commentTextInput = postElement.querySelector('.commentText');
            const commentButton = postElement.querySelector('.commentButton');
            const deleteButton = postElement.querySelector('.deletePost');
            

            toggleButton.addEventListener('click', () => {
                repliesContainer.innerHTML = '';
                post.subthread.forEach(reply => {
                    const replyElement = document.createElement('div');
                    replyElement.classList.add('reply');
            
                    // Create elements for name and reply
                    const nameElement = document.createElement('p');
                    nameElement.textContent = `Name: ${reply.name}`;
                    nameElement.style.fontSize = '12px'; // Set font size for name
            
                    const replyContent = document.createElement('p');
                    replyContent.textContent = `Reply: ${reply.reply}`;
                    replyContent.style.fontSize = '12px'; // Set font size for reply
            
                    // Apply border style to create separation between replies
                    replyElement.style.border = '1px solid #ccc'; // Adding a border
            
                    // Append name and reply to the replyElement
                    replyElement.appendChild(nameElement);
                    replyElement.appendChild(replyContent);
            
                    // Append the replyElement to the repliesContainer
                    repliesContainer.appendChild(replyElement);
                });

                repliesContainer.style.display = repliesContainer.style.display === 'none' ? 'block' : 'none';

                if (activePostIndex !== null && activePostIndex !== index) {
                    const prevCommentTextInput = document.getElementById(`commentText${activePostIndex}`);
                    const prevCommentButton = document.querySelector(`.commentButton[data-index="${activePostIndex}"]`);
                    prevCommentTextInput.style.display = 'none';
                    prevCommentButton.style.display = 'none';
                }

                commentTextInput.style.display = commentTextInput.style.display === 'none' ? 'block' : 'none';
                commentButton.style.display = commentButton.style.display === 'none' ? 'block' : 'none';

                activePostIndex = index;
            });

            
            deleteButton.addEventListener('click', () => {
                if(displayAlert()){
                    deletePost(index);
                }
            });
            
            commentButton.addEventListener('click', () => {
                commentOnPost(index, posts[index]);
            });
        });
    }

    

    var id;

        fetch('http://localhost:8000/tokenGet')
        .then(response => response.json())
        .then(data => {
          if (data.length == 0) {
            console.log("no token");
            // add whatever
  
            return;
          }
          id = data[0].userID;
          var expire = data[0].expire;
          let now = new Date(); // Get the current date and time
          let hours = now.getHours(); // Get the hours component
          let minutes = now.getMinutes(); // Get the minutes component
  
          let nowInMinutes = hours * 60 + minutes; // Convert hours and minutes to total minutes
  
          // console.log("expire: " + expire);
          // console.log("nowInMinutes: " + nowInMinutes);
          if (nowInMinutes > expire) {
  
            fetch('http://localhost:8000/expiredToken', {
              method: 'post',
              headers: {
                'Content-Type': 'application/json',
              },
  
              body: JSON.stringify({
                "userID": data[0].userID
              })
            });
  
            console.log("token expired");
  
            return;
          }
          
        });

    function deletePost(selectedPostIndex) {
        if (id != blogPosts[selectedPostIndex].name) {
            alert("You can only delete your own posts!");
            return;
        }
        const postToDelete = blogPosts[selectedPostIndex];
        blogPosts.splice(selectedPostIndex, 1);
        blogPosts.reverse();
        renderBlogPosts();

        fetch('http://localhost:8000/deletepost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postToDelete),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Message from the server
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }


    function createNewPost(title, content) {
       
        console.log("id: " + id);

        const newPost = {
            
            name: id,
            title: title,
            content: content,
            subthread: []
        };

        blogPosts.push(newPost);
        

        // Send a POST request to the server to update the JSON file
        fetch('http://localhost:8000/newpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // Message from the server
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        renderBlogPosts();
    }

    function commentOnPost(selectedPostIndex, title) {
        const commentText = document.getElementById(`commentText${selectedPostIndex}`).value;

        if (commentText) {
            const newComment = {
                name: id,
                title: title, 
                reply: commentText };
            blogPosts[selectedPostIndex].subthread.push(newComment);
            

            document.getElementById(`commentText${selectedPostIndex}`).value = '';

            fetch('http://localhost:8000/newcomment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            })
            .then(response => response.text())
            .then(data => {
                console.log(data); // Message from the server
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        blogPosts.reverse();
        renderBlogPosts();
        
       
    }


    fetch('http://localhost:8000/posts')
        .then(response => response.json())
        .then(data => {
            blogPosts = data;
            renderBlogPosts(blogPosts);
        })
        .catch((error) => {
            console.error('Error:', error);
            });
        
    document.getElementById('newPostButton').addEventListener('click', function() {
        const newPostTitle = document.getElementById('newPostTitle').value;
        const newPostContent = document.getElementById('newPostContent').value;

        if (newPostTitle && newPostContent) {
            createNewPost(newPostTitle, newPostContent);
            document.getElementById('newPostTitle').value = '';
            document.getElementById('newPostContent').value = '';
        }
    });

    renderBlogPosts();

    document.getElementById('searchButton').addEventListener('click', function () {
        const searchInput = document.getElementById('searchInput').value;
    
        if (searchInput) {
            // Send a GET request to the server to search for posts
            fetch(`http://localhost:8000/search?query=${searchInput}`)
                .then(response => response.json())
                .then(data => {
                    // Update the blogPosts array with the filtered results
                    blogPosts = data;
                    renderBlogPosts();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else {
            // If search input is empty, reload all blog posts
            fetch('http://localhost:8000/posts')
                .then(response => response.json())
                .then(data => {
                    blogPosts = data;
                    renderBlogPosts();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    });
    
});


