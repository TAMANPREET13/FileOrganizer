let fs = require("fs");
let path = require("path");

function tree(srcPath) {
    if (srcPath == undefined)
        srcPath = process.cwd();
    //if we dont put any path it will print tree for cwd or parentFolder(Activity)
    // console.log("Tree command", srcPath)
    let content = fs.readdirSync(srcPath);
    // console.log(content);
    // └──
    // ├──
    let parentFOlderName = path.basename(srcPath); // to get the last path of parent directory
    let completePath = "└──" + parentFOlderName;
    // console.log(completePath)

    for (let i = 0; i < content.length; i++) {
        completePath = completePath + "\n\t" + "├──" + content[i];
        // console.log(completePath)
    }

    console.log(completePath);
}
module.exports = {
    treeFn: tree
}