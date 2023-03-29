'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

let getPath = function (args: vscode.Uri[]): string | null {
	let filePath = null;
	if (args && args.length > 0) {
		filePath = args[0].fsPath;
	}
	if (!filePath) {
		filePath = vscode.window.activeTextEditor?.document.fileName || null;
	}
	return filePath;
};

let pasteAndShowMessage = function (fileDir: string) {
	vscode.env.clipboard.writeText(fileDir);
	vscode.window.setStatusBarMessage(`The file directory "${fileDir}" was copied to the clipboard.`, 3000);
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy-file-directory.copyFileDirectory', (...args) => {
		const fullPath = getPath(args);
		if (fullPath) {
			const fileDir = path.dirname(fullPath);
			pasteAndShowMessage(fileDir);
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}