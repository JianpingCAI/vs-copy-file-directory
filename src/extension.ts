'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

let getFilePath = function (args: vscode.Uri[]): string | null {
	let filePath = null;
	if (args && args.length > 0) {
		filePath = args[0].fsPath;
	}
	if (!filePath) {
		filePath = vscode.window.activeTextEditor?.document.fileName || null;
	}
	return filePath;
};

let getFileRelativePath = function (): string | null {
	const activeDocument = vscode.window.activeTextEditor?.document;
	if (activeDocument) {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(activeDocument.uri);
		if (workspaceFolder) {
			const workspaceFolderPath = workspaceFolder.uri.fsPath;
			const activeDocumentPath = activeDocument.fileName;
			const relativePath = path.relative(workspaceFolderPath, activeDocumentPath);
			return relativePath;
		}
	}
	return null;
};

let getFileDirectory = function (args: vscode.Uri[]): string | null {
	let filePath = null;
	if (args && args.length > 0) {
		filePath = args[0].fsPath;
	}
	if (!filePath) {
		filePath = vscode.window.activeTextEditor?.document.fileName || null;
	}
	return filePath;
};

let getFileRelativeDirectory = function (): string | null {
	const activeDocument = vscode.window.activeTextEditor?.document;
	if (activeDocument) {
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(activeDocument.uri);
		if (workspaceFolder) {
			const workspaceFolderPath = workspaceFolder.uri.fsPath;
			const activeDocumentPath = activeDocument.fileName;
			const fileDir = path.dirname(activeDocumentPath);
			const relativePath = path.relative(workspaceFolderPath, fileDir);
			return relativePath;
		}
	}
	return null;
};


let pasteAndShowMessage = function (msg: string) {
	vscode.env.clipboard.writeText(msg);
	vscode.window.setStatusBarMessage(`The file directory "${msg}" was copied to the clipboard.`, 3000);
};

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('copy-file-directory.copyFileName', (...args) => {
		const fullPath = getFilePath(args);
		if (fullPath) {
			let extName = path.extname(fullPath);
            var fileName = path.basename(fullPath, extName);
			pasteAndShowMessage(fileName);
		}
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('copy-file-directory.copyFileNameWithExtension', (...args) => {
		const fullPath = getFilePath(args);
		if (fullPath) {
			let fileName = path.basename(fullPath);
			pasteAndShowMessage(fileName);
		}
	});
	context.subscriptions.push(disposable);

	
	disposable = vscode.commands.registerCommand('copy-file-directory.copyFilePath', (...args) => {
		const filePath = getFilePath(args);
		if (filePath) {
			pasteAndShowMessage(filePath);
		}
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('copy-file-directory.copyFileRelativePath', (...args) => {
		const fileRelativePath = getFileRelativePath();
		if (fileRelativePath) {
			pasteAndShowMessage(fileRelativePath);
		}
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('copy-file-directory.copyFileDirectory', (...args) => {
		const fullPath = getFileDirectory(args);
		if (fullPath) {
			const fileDir = path.dirname(fullPath);
			pasteAndShowMessage(fileDir);
		}
	});
	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('copy-file-directory.copyRelativeFileDirectory', () => {
		const relativeDirectory = getFileRelativeDirectory();
		if (relativeDirectory) {
			pasteAndShowMessage(relativeDirectory);
		}
	});
	context.subscriptions.push(disposable);

}

// this method is called when your extension is deactivated
export function deactivate() {
}