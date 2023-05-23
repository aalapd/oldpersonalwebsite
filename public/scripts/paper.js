// For debugging

var statsDisplay = false;
console.log = function () {};
var t0, fps;

// Main

var mousePoint = view.center;
var clicked;

var colorPalette = [
    new Color(255, 0, 255),
    new Color(255, 255, 0),
    new Color(0, 255, 255),
    "black",
];
var color1, color2, color3, color4;
var colors = [];

var children = project.activeLayer.children;
var visibleChildren = 0;
var childrenLimit = 500;

var stats = document.getElementById("stats");
var startTime;

var displayWidth = window.screen.width;
var displayHeight = window.screen.height;

console.log("Screen width: " + displayWidth);
console.log("Screen height: " + displayHeight);

randomizeColors();
generateChildren(15);

function randomizeColors() {
    color1 = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    color2 = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    color3 = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    color4 = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors = [color1, color2, color3, color4];

    for (var i = 0; i < colors.length - 1; i++) {
        while (colors[i] === colors[i + 1]) {
            colors[i] =
                colorPalette[Math.floor(Math.random() * colorPalette.length)];
        }
    }
}

function generateChildren(amount) {
    amount = Math.min(amount, 15) / 2;
    // amount = 200;
    console.log("amount:" + amount);

    for (var i = 0; i < amount; i++) {
        var rect = new Rectangle([0, 0], [50, 50]);
        rect.center = mousePoint;

        var path = new Path.Rectangle(
            rect,
            (Math.floor(Math.random() * 10) / Math.random()) * 5
        );
        path.strokeColor = colors[i % 4];
        path.strokeWidth = Math.floor(children.length);
        path.strokeCap = "round";
        path.smooth();
        // path.simplify();

        var scale = ((1 - i / amount) * displayWidth) / 220;
        path.scale(scale);
    }
}

function getElapsedTime() {
    var newTime = new Date().getTime();
    var elapsed = newTime - startTime;
    console.log("elapsed:" + newTime);
    return elapsed;
}

function onMouseMove(event) {
    mousePoint = event.point;
}

function onMouseDown() {
    startTime = new Date().getTime();
    console.log("start:" + startTime);

    clicked = true;
}

function onMouseUp() {
    var elapsedTime = getElapsedTime();
    console.log(elapsedTime);

    generateChildren(elapsedTime);
    clicked = false;
}

function onFrame(event) {
    for (var i = 0, l = children.length; i < l; i++) {
        var item = children[i];
        if (item == undefined) {
            return;
        }

        var delta = (mousePoint - item.position) / (i + 50);
        if (clicked === true) {
            item.rotate(Math.sin((event.count + i) / 3) * 5);
            item.scale(1 + children.length / 25000, mousePoint);
        } else {
            item.rotate(Math.sin((event.count + i) / 240) * 1);
            item.scale(1 - children.length / 50000, mousePoint);
        }
        if (delta.length > 0.1) item.position += delta;

        if (item.bounds.width < 5 || item.bounds.width > displayWidth * 2) {
            // remove item if smaller than 5px or larger than display width * 2
            item.remove();
        }
        while (children.indexOf(item) > 15) {
            children[0].remove();
        }
    }
    if (statsDisplay === true) {
        if (!t0) {
            t0 = performance.now();
            fps = 0;
            return;
        }

        delta = (performance.now() - t0) / 1000;
        t0 = performance.now();
        fps = Math.floor(1 / delta);

        stats.innerText = "Objects: " + children.length + "\n" + "FPS: " + fps;
    }
}
