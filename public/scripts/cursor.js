window.onload = () => {
    var mouseCursor = document.getElementById("cursor");
    mouseCursor.style.top = "50%";
    mouseCursor.style.left = "50%";
    mouseCursor.style.display = "unset";

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("scroll", moveCursor, false, { passive: true });

    function moveCursor(e) {
        mouseCursor.style.top = e.pageY + "px";
        mouseCursor.style.left = e.pageX + "px";
    }

    window.addEventListener("click", randomizeColor);

    function randomizeColor() {
        var colors = ["cyan", "yellow", "magenta"];
        var randomColor = colors[Math.floor(Math.random() * colors.length)];
        mouseCursor.style.border = "1px solid " + randomColor;
    }
    // Effects for cursor on hover, etc.

    var effectTriggers = document.querySelectorAll(".cursor-effect");

    effectTriggers.forEach((element) => {
        element.addEventListener("mouseover", () => {
            mouseCursor.classList.add("cursor-mouseover");
        });
        element.addEventListener("mouseleave", () => {
            mouseCursor.classList.remove("cursor-mouseover");
        });
    });

    // Disabling right click on canvas

    var canvas = document.getElementById("myCanvas");
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());

    console.info(`
    ██╗  ██╗███████╗███████╗██████╗     ██╗      ██████╗  ██████╗ ██╗  ██╗██╗███╗   ██╗ ██████╗ ██╗
    ██║ ██╔╝██╔════╝██╔════╝██╔══██╗    ██║     ██╔═══██╗██╔═══██╗██║ ██╔╝██║████╗  ██║██╔════╝ ██║
    █████╔╝ █████╗  █████╗  ██████╔╝    ██║     ██║   ██║██║   ██║█████╔╝ ██║██╔██╗ ██║██║  ███╗██║
    ██╔═██╗ ██╔══╝  ██╔══╝  ██╔═══╝     ██║     ██║   ██║██║   ██║██╔═██╗ ██║██║╚██╗██║██║   ██║╚═╝
    ██║  ██╗███████╗███████╗██║         ███████╗╚██████╔╝╚██████╔╝██║  ██╗██║██║ ╚████║╚██████╔╝██╗
    ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝         ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝
                                                                                                   
    `);
};
