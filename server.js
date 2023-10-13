const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors()); // Allow all origins for simplicity. Configure as needed.

// Load existing blog posts
let blogPosts = [];

fs.readFile('blogPosts.json', (err, data) => {
    if (err) {
        console.error('Error reading blogPosts.json:', err);
    } else {
        blogPosts = JSON.parse(data);
    }
});

// Endpoint to get all blog posts
app.get('/posts', (req, res) => {
    res.json(blogPosts);
});

// Endpoint to handle new posts
app.post('/newpost', (req, res) => {
    const newPost = req.body;

    blogPosts.push(newPost);

    // Write updated posts back to file
    fs.writeFile('blogPosts.json', JSON.stringify(blogPosts), (err) => {
        if (err) {
            console.error('Error writing blogPosts.json:', err);
        }
    });

    res.send('Post created successfully!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
