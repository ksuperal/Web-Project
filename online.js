document.addEventListener('DOMContentLoaded', function() {
    
    fetch('http://localhost:8000/videos')
        .then(response => response.json())
        .then(data => {
            videos = data;
            renderVideos();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    // Function to render videos
    function renderVideos() {
        const videosContainer = document.getElementById('videosContainer');
        videosContainer.innerHTML = '';

        videos.forEach((video, index) => {
            const videoElement = document.createElement('div');
            videoElement.classList.add('video');
            videoElement.innerHTML = `
                <h2>${video.title}</h2>
                ${video.url}`;
            videosContainer.appendChild(videoElement);
        });
    }

    // Function to handle form submission
    document.getElementById('submit').addEventListener('click', function(event) {
        event.preventDefault();
        const videoUrl = document.getElementById('videoUrl').value;
        const videoTitle = document.getElementById('videoTitle').value;

        if (videoUrl && videoTitle) {
            let videopost = { url: videoUrl, title: videoTitle };
            videos.push(videopost);
            renderVideos();
            document.getElementById('videoUrl').value = '';
            document.getElementById('videoTitle').value = '';
            fetch('http://localhost:8000/add_video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(videopost),
            })
            .then(response => response.text())
            .then(data => {
                console.log(data); // Message from the server
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }

        
    });

    renderVideos();    
});
