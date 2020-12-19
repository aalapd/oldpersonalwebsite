module.exports.getImageFiles = function (folder) {
    const path = require("path");
    const fs = require("fs");
    const directoryPath = path.join(
        __dirname,
        "../public/assets/projects",
        folder
    );

    const dirents = fs.readdirSync(directoryPath, { withFileTypes: true });
    var imgArray = []; // not required

    var images = dirents
        .filter((dirent) => dirent.isFile())
        .map((dirent) => dirent.name);

    for (let i in images) {
        imgArray.push(images[i]);
    }
    return imgArray; // not required. simply return images
};
