let inputArr = process.argv.slice(2);
let helpObj = require("./command/help");
let treeObj = require("./command/tree");
let organizeObj = require("./command/organize");
let cmd = inputArr[0];
switch (cmd) {
    case "help":
        helpObj.helpFn();
        break;
    case "tree":
        treeObj.treeFn(inputArr[1])
        break;
    case "organize":
        // index out of bound -> undefined
        organizeObj.organizeFn(inputArr[1]);
        break;
    default:
        console.log(`Wrong command 
        .Kindly enter help to see all the commands`);
        break;
}