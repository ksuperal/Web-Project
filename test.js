const track = document.getElementById('image-track');
let nextPercentage = 0;

window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0"; // Set it as a string, not a number
    track.dataset.prevPercentage = track.dataset.percentage || "0"; // Default to "0" if undefined
};

window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    track.dataset.percentage = nextPercentage.toString(); // Convert to string

    anime({
        targets: track,
        translateX: `${nextPercentage}%`,
        duration: 1200,
        easing: 'easeInOutQuad'
    });

    const images = track.getElementsByClassName("image");
    for (const image of images) {
        anime({
            targets: image,
            objectPosition: `${nextPercentage + 100}% center`,
            duration: 1200,
            easing: 'easeInOutQuad'
        });
    }
};
