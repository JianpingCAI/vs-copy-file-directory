// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

/**
 * Retrieves the file path from the provided URI arguments or the active text editor
 * @param args - Array of URI objects from VS Code context menu or command palette
 * @returns The file system path of the file, or null if no file is available
 */
const getFilePath = function (args: vscode.Uri[]): string | null {
	let filePath = null;
	if (args && args.length > 0) {
		filePath = args[0].fsPath;
	}
	if (!filePath) {
		filePath = vscode.window.activeTextEditor?.document.fileName || null;
	}
	return filePath;
};

/**
 * Retrieves the relative file path of the active document with respect to the workspace folder
 * @returns The relative path from the workspace root to the file, or null if no workspace or file is active
 */
const getFileRelativePath = function (): string | null {
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

/**
 * Retrieves the file path (note: duplicate of getFilePath - consider consolidation)
 * @param args - Array of URI objects from VS Code context menu or command palette
 * @returns The file system path of the file, or null if no file is available
 */
const getFileDirectory = function (args: vscode.Uri[]): string | null {
	let filePath = null;
	if (args && args.length > 0) {
		filePath = args[0].fsPath;
	}
	if (!filePath) {
		filePath = vscode.window.activeTextEditor?.document.fileName || null;
	}
	return filePath;
};

/**
 * Retrieves the relative directory path of the active document with respect to the workspace folder
 * @returns The relative path from the workspace root to the file's directory, or null if no workspace or file is active
 */
const getFileRelativeDirectory = function (): string | null {
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

/**
 * Copies the provided message to the clipboard and displays a status bar notification
 * @param msg - The text to copy to the clipboard
 */
const pasteAndShowMessage = function (msg: string): void {
	vscode.env.clipboard.writeText(msg);
	vscode.window.setStatusBarMessage(`The file directory "${msg}" was copied to the clipboard.`, 3000);
};

/**
 * Activates the extension and registers all commands
 * @param context - The extension context provided by VS Code
 */
export function activate(context: vscode.ExtensionContext): void {
	let disposable = vscode.commands.registerCommand('copy-file-directory.copyFileName', (...args) => {
		const fullPath = getFilePath(args);
		if (fullPath) {
			const extName = path.extname(fullPath);
			const fileName = path.basename(fullPath, extName);
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

/**
 * Deactivates the extension and performs cleanup
 * Called when the extension is deactivated by VS Code
 */
export function deactivate(): void {
}