'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
let getPath = function (args) {
    let filePath = null;
    if (args && args.length > 0) {
        filePath = args[0].fsPath;
    }
    if (!filePath) {
        filePath = vscode.window.activeTextEditor?.document.fileName || null;
    }
    return filePath;
};
let pasteAndShowMessage = function (fileDir) {
    vscode.env.clipboard.writeText(fileDir);
    vscode.window.setStatusBarMessage(`The file directory "${fileDir}" was copied to the clipboard.`, 3000);
};
function activate(context) {
    let disposable = vscode.commands.registerCommand('copy-file-directory.copyFileDirectory', (...args) => {
        const fullPath = getPath(args);
        if (fullPath) {
            const fileDir = path.dirname(fullPath);
            pasteAndShowMessage(fileDir);
        }
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map