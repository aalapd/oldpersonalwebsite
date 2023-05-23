console.log = function () { };

var container = document.getElementById("post-container");

function addPost(id, title, body, date, tags, single) {

    // keep each post inside a div
    let postDiv = document.createElement("article");
    postDiv.classList = "post-div container-item extra-padding magenta animation-expand no-margin";
    container.append(postDiv);

    // header anchor not sure why
    let postHeaderAnchor = document.createElement("a");
    postHeaderAnchor.classList = "link";
    postHeaderAnchor.target = "_self";
    postDiv.append(postHeaderAnchor);

    // a neat post heading
    let postHeading = document.createElement("h1");
    postHeading.classList = "post-header text-glow";
    postHeading.innerHTML = title;

    postHeaderAnchor.append(postHeading);

    if (!single) {
        // abbreviated post content
        let postContent = document.createElement("p");
        postContent.classList = "post-desc";
        postHeaderAnchor.href = "writings/" + id;
        let text = jQuery(body).text();
        postContent.innerHTML = text.substring(0, Math.min(250, text.length)) + "...";
        postDiv.append(postContent);

        // keeping onlick event only for the list of posts
        postDiv.onclick = () => {
            location.assign("writings/" + id);
        };
    } else {
        // an entire post
        // a div for the post content
        postHeaderAnchor.href = id;
        postDiv.classList.remove("animation-expand");
        let postContentDiv = document.createElement("article");
        postContentDiv.classList = "post-content";
        postContentDiv.innerHTML = body;
        // console.log(item.content);
        postDiv.append(postContentDiv);

        // forward backward buttons
        // let buttonPrev = document.createElement("button");
        // let buttonNext = document.createElement("button");

        // buttonPrev.classList = "nav-button";
        // buttonNext.classList = "nav-button";

        // buttonPrev.onclick = () => {};
        // buttonNext.onclick = () => {};
    }

    // tags
    let tagsDiv = document.createElement("section");
    tagsDiv.classList = "tags-div";
    tagsDiv.innerHTML = "Tags: " + tags;
    postDiv.append(tagsDiv);

    // date
    let dateDiv = document.createElement("section");
    dateDiv.classList = "date-div";
    dateDiv.innerHTML = date;
    postDiv.append(dateDiv);
}

function clearContainer() {
    container.innerHTML = "";
}
