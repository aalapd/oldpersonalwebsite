// var allPosts;
var container = document.getElementById("post-container");

function getContent(post) {
    // initiate loader
    loader(true);

    let url = "https://adblog-39d8.restdb.io/rest/posts";
    let settings = {
        async: true,
        crossDomain: true,
        url: url,
        method: "GET",
        headers: {
            "content-type": "application/json",
            "x-apikey": "5f80741d5799e648a5a8ee5d",
            "cache-control": "no-cache",
        },
        error: function (error) {
            notification("Error loading data.");
            console.error(error);
        },
    };

    if (post === "") {
        console.log("There are more than one posts!");

        $.ajax(settings).done(function (response) {
            updateContainer(response, false);
            return;
        });
    } else {
        console.log("There is one post");
        settings.url = url + "/" + post;

        $.ajax(settings).done(function (response) {
            console.log("The one post: " + response);
            updateContainer(response, true);
            return;
        });
    }
}

function updateContainer(content, post) {
    clearContainer();
    if (!post) {
        // Display all posts
        content.forEach((item) => {
            addPost(item, false);
        });
    } else {
        // Display single post

        addPost(content, post); // find the post with the correct ID
    }

    // console.log("Container updated!: " + content);

    loader(false);
}

function addPost(item, post) {
    // keep each post inside a div
    let postDiv = document.createElement("article");
    postDiv.classList =
        "post-div container-item extra-padding magenta animation-expand no-margin";
    container.append(postDiv);

    // header anchor not sure why
    let postHeaderAnchor = document.createElement("a");
    postHeaderAnchor.classList = "link";
    postHeaderAnchor.href = "writings/" + item._id;
    postDiv.append(postHeaderAnchor);

    // a neat post heading
    let postHeading = document.createElement("h1");
    postHeading.classList = "post-header text-glow";
    postHeading.innerHTML = item.title;

    postHeaderAnchor.append(postHeading);

    if (!post) {
        // abbreviated post content
        let postContent = document.createElement("p");
        postContent.classList = "post-desc";
        let text = jQuery(item.content).text();
        postContent.innerHTML =
            text.substring(0, Math.min(250, text.length)) + "...";
        postDiv.append(postContent);

        // keeping onlick event only for the list of posts
        postDiv.onclick = () => {
            location.assign("writings/" + item._id);
        };
    } else {
        // an entire post
        // a div for the post content
        postDiv.classList.remove("animation-expand");

        let postContentDiv = document.createElement("article");
        postContentDiv.classList = "post-content";
        postContentDiv.innerHTML = item.content;
        // console.log(item.content);
        postDiv.append(postContentDiv);

        // forward backward buttons
        let buttonPrev = document.createElement("button");
        let buttonNext = document.createElement("button");

        buttonPrev.classList = "nav-button";
        buttonNext.classList = "nav-button";

        buttonPrev.onclick = () => {};
        buttonNext.onclick = () => {};
    }

    // tags
    let tagsDiv = document.createElement("section");
    tagsDiv.classList = "tags-div";
    tagsDiv.innerHTML = "Tags: " + item.tags;
    postDiv.append(tagsDiv);

    // date
    let dateDiv = document.createElement("section");
    dateDiv.classList = "date-div";
    dateDiv.innerHTML = item.date;
    postDiv.append(dateDiv);
}

// function findPost(id) {
//     console.log("finding post: " + id);
//     allPosts.some((item) => {
//         console.log("current item: " + item._id);
//         if (item._id === id) {
//             clearContainer();
//             addPost(item, true);
//             // location.assign(item._id);
//             console.log("post found");
//             return true;
//         }
//     });
//     // console.log("post not found!");
// }

function clearContainer() {
    container.innerHTML = "";
}

function loader(x) {
    let loader = document.getElementById("loading");
    let container = document.getElementById("writings-container");

    if (x === true) {
        loader.style.display = "block";
        container.style.overflowY = "hidden";
    } else {
        loader.style.display = "none";
        container.style.overflowY = "auto";
    }
}
