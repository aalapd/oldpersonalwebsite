// var videoplayerL = document.createElement("video");
// var videoplayerR = videoplayerL.cloneNode(true);
// var playerAttributes = {
//     autoplay: true,
//     loop: true,
//     muted: true,
//     playsinline: true,
// };

// window.onload = function () {
//     initDuplicateVideo();

//     const galleryContainer = document.getElementById("gallery-container");
//     const videos = galleryContainer.getElementsByClassName("gallery-video");
//     // console.dir(videos);
//     for (let i = 0; i < videos.length; i++) {
//         // videos[i].("onhover", showDuplicateVideo(videos[i].src));
//         videos[i].setAttribute("onmouseover", updateDuplicateVideo());
//     }
// };

// function setVideoAttributes(element, attributes) {
//     for (var key in attributes) {
//         element.setAttribute(key, attributes[key]);
//     }
// }

function displayLightbox(image) {
    const lightboxDiv = document.createElement("div");
    lightboxDiv.id = "lightbox-div";
    lightboxDiv.setAttribute("onclick", "closeLightbox(this)");
    const lightbox = document.createElement("img");
    lightbox.src = image;
    lightbox.id = "lightbox-img";
    lightboxDiv.append(lightbox);
    document.body.append(lightboxDiv);
}

function closeLightbox(element) {
    element.remove();
}

// function initDuplicateVideo() {
//     videoplayerL.id = "videoplayer-L";
//     videoplayerL.classList = "duplicate-players";
//     videoplayerR.id = "videoplayer-R";
//     videoplayerR.classList = "duplicate-players";
//     setVideoAttributes(videoplayerL, playerAttributes);
//     setVideoAttributes(videoplayerR, playerAttributes);

//     document.body.appendChild(videoplayerL);
//     document.body.appendChild(videoplayerR);
// }

// function updateDuplicateVideo() {
//     console.log("updating");
//     var hoveredEl = getInnermostHovered();
//     if (hoveredEl && hoveredEl.src) {
//         videoplayerL.src = hoveredEl.src;
//         videoplayerR.src = hoveredEl.src;
//     }
// }

// function getInnermostHovered() {
//     var element = document.querySelector(":hover");
//     var innermost;
//     while (element) {
//         innermost = element;
//         element = innermost.querySelector(":hover");
//         // console.log(innermost);
//     }
// }

function scrollToElement(element) {
    let target = document.getElementById(element);
    target.setAttribute("tabindex", "0");
    setTimeout(() => {
        let container = document.getElementById("gallery-container");
        let top = target.offsetTop;
        container.scrollTop = top;
        target.focus();
    }, 250);
}

function removeFocus(element) {
    let target = document.getElementById(element);
    target.setAttribute("tabindex", "1");
}
