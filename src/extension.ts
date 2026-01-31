// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as utils from './utils/filePathUtils';

/**
 * Activates the extension and registers all commands
 * @param context - The extension context provided by VS Code
 */
export function activate(context: vscode.ExtensionContext): void {
	// Register command: Copy File Name (without extension)
	let disposable = vscode.commands.registerCommand('copy-file-directory.copyFileName', async (...args) => {
		const fullPath = utils.getFilePath(args);
		if (fullPath) {
			const fileName = utils.getFileName(fullPath);
			await utils.copyToClipboardWithFeedback(fileName, 'File name');
		} else {
			utils.handleFileOperationError('copy file name');
		}
	});
	context.subscriptions.push(disposable);

	// Register command: Copy File Name with Extension
	disposable = vscode.commands.registerCommand('copy-file-directory.copyFileNameWithExtension', async (...args) => {
		const fullPath = utils.getFilePath(args);
		if (fullPath) {
			const fileName = utils.getFileNameWithExtension(fullPath);
			await utils.copyToClipboardWithFeedback(fileName, 'File name');
		} else {
			utils.handleFileOperationError('copy file name');
		}
	});
	context.subscriptions.push(disposable);

	// Register command: Copy File Path (absolute)
	disposable = vscode.commands.registerCommand('copy-file-directory.copyFilePath', async (...args) => {
		const filePath = utils.getFilePath(args);
		if (filePath) {
			await utils.copyToClipboardWithFeedback(filePath, 'File path');
		} else {
			utils.handleFileOperationError('copy file path');
		}
	});
	context.subscriptions.push(disposable);

	// Register command: Copy File Relative Path
	disposable = vscode.commands.registerCommand('copy-file-directory.copyFileRelativePath', async (...args) => {
		const fileRelativePath = utils.getFileRelativePath(args);
		if (fileRelativePath !== null) {
			await utils.copyToClipboardWithFeedback(fileRelativePath, 'Relative file path');
		} else {
			utils.handleFileOperationError('copy relative file path');
		}
	});
	context.subscriptions.push(disposable);

	// Register command: Copy File Directory (absolute)
	disposable = vscode.commands.registerCommand('copy-file-directory.copyFileDirectory', async (...args) => {
		const fileDir = utils.getFileDirectory(args);
		if (fileDir) {
			await utils.copyToClipboardWithFeedback(fileDir, 'File directory');
		} else {
			utils.handleFileOperationError('copy file directory');
		}
	});
	context.subscriptions.push(disposable);

	// Register command: Copy Relative File Directory
	disposable = vscode.commands.registerCommand('copy-file-directory.copyRelativeFileDirectory', async (...args) => {
		const relativeDirectory = utils.getFileRelativeDirectory(args);
		if (relativeDirectory !== null) {
			await utils.copyToClipboardWithFeedback(relativeDirectory, 'Relative directory');
		} else {
			utils.handleFileOperationError('copy relative directory');
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