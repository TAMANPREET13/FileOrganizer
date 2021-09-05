let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organize(srcPath) {
    if (srcPath == undefined)
        srcPath = process.cwd();
    // console.log("organize implemneted", srcPath);
    // 1 create organized_files -> directory
    let organizedFilesPath = path.join(srcPath, "organized_files");
    // ⬆ this is written so that organized_files folder is formed under the srcPath provided
    if (fs.existsSync(organizedFilesPath) == false) {
        fs.mkdirSync(organizedFilesPath);
    }
    // 2 scan whole srcPath 
    let allTheFiles = fs.readdirSync(srcPath);
    // will provide the name of all the files or folder under parent folder(directory)
    //console.log(allTheFiles);
    // 3. extension check -> classify
    for (let i = 0; i < allTheFiles.length; i++) {
        let fullOriginalPath = path.join(srcPath, allTheFiles[i]);
        if (fs.lstatSync(fullOriginalPath).isFile() == true) { // we are organizing only for files so this will check if it is a file or folder

            let folderName = checkextnTellFolder(allTheFiles[i]);
            copyFileTOdest(folderName, fullOriginalPath, srcPath);
        }
    }
    //  3. copy to that folder to which it belongs
    // folder
    // // file copy 
    // other
    // // file copy  
}

function copyFileTOdest(folderName, fullOriginalPath, srcPath) {
    let destFolderPath = path.join(srcPath, "organized_files", folderName); // so that every file in srcPath is organized under (oorganized_files) directory
    if (fs.existsSync(destFolderPath) == false) {
        fs.mkdirSync(destFolderPath);
    }
    let originalFileName = path.basename(fullOriginalPath);
    // ⬆⬆ this will give the last name of all the files in original unorganized folder
    let destFilePath = path.join(destFolderPath, originalFileName) // C:\Users\param\Documents\MEGAsync\PP12 DEV\Module_1\JsOrganizer\activity\Downloads\organized_files\app\WhatsAppSetup (1).exe
        // ⬆⬆ this command copied the name of file and put it behind destinaltionPath 
    fs.copyFileSync(fullOriginalPath, destFilePath);
    // ⬆⬆ used to copy the content of all the files from originalPath to destPath
    console.log(originalFileName, "copied to ", folderName);

}

function checkextnTellFolder(fileName) {
    let extName = path.extname(fileName); // will tell the extensions of all the files(eg- .pdf,.js,.txt)
    extName = extName.slice(1); // used to remove dot(.) from  extension of all files to match types object
    for (let key in types) { // loop for archives, media ,apps etc
        for (let i = 0; i < types[key].length; i++) { // loop for content of array inside archives, media ,apps etc
            if (types[key][i] == extName) {
                return key;
            }
        }
    }
    return "others";
}
module.exports = {
    organizeFn: organize
}