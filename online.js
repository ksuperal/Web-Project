document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener("load", () => {
        const loader = document.querySelector(".loader");
      
        loader.classList.add("loader--hidden");
      
        loader.addEventListener("transitionend", () => {
          document.body.removeChild(loader);
        });
    });
});
    
        

// Get the video file input element
const videoInput = document.getElementById('video-input');

// Listen for changes to the input element
videoInput.addEventListener('change', () => {
    // Get the selected file
    const file = videoInput.files[0];

    // Create a URL for the selected file
    const fileURL = URL.createObjectURL(file);

    // Get the inner-video div element
    const innerVideo = document.getElementById('inner-video');

    // Set the innerHTML of the inner-video div to an HTML video element with the selected file as the source
    innerVideo.innerHTML = `<video src="${fileURL}" controls></video>`;
});
