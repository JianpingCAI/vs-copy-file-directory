import * as vscode from 'vscode';
import * as path from 'path';

/**
 * Retrieves the file path from the provided URI arguments or the active text editor
 * @param args - Array of URI objects from VS Code context menu or command palette
 * @returns The file system path of the file, or null if no file is available
 * @throws Error if unable to determine file path
 */
export function getFilePath(args: vscode.Uri[]): string | null {
	try {
		let filePath: string | null = null;
		
		// First, check if we have URI arguments (from context menu)
		if (args && args.length > 0) {
			filePath = args[0].fsPath;
		}
		
		// If no arguments, try to get from active editor
		if (!filePath) {
			const activeEditor = vscode.window.activeTextEditor;
			if (activeEditor) {
				filePath = activeEditor.document.fileName;
			}
		}
		
		return filePath;
	} catch (error) {
		console.error('Error getting file path:', error);
		return null;
	}
}

/**
 * Retrieves the relative file path of the active document with respect to the workspace folder
 * @returns The relative path from the workspace root to the file, or null if no workspace or file is active
 * @throws Error if unable to determine relative path
 */
export function getFileRelativePath(): string | null {
	try {
		const activeDocument = vscode.window.activeTextEditor?.document;
		if (!activeDocument) {
			return null;
		}

		const workspaceFolder = vscode.workspace.getWorkspaceFolder(activeDocument.uri);
		if (!workspaceFolder) {
			return null;
		}

		const workspaceFolderPath = workspaceFolder.uri.fsPath;
		const activeDocumentPath = activeDocument.fileName;
		const relativePath = path.relative(workspaceFolderPath, activeDocumentPath);
		
		return relativePath;
	} catch (error) {
		console.error('Error getting relative file path:', error);
		return null;
	}
}

/**
 * Retrieves the directory path of a file from the provided URI arguments or the active text editor
 * @param args - Array of URI objects from VS Code context menu or command palette
 * @returns The directory path of the file, or null if no file is available
 * @throws Error if unable to determine directory path
 */
export function getFileDirectory(args: vscode.Uri[]): string | null {
	try {
		const filePath = getFilePath(args);
		if (!filePath) {
			return null;
		}
		
		return path.dirname(filePath);
	} catch (error) {
		console.error('Error getting file directory:', error);
		return null;
	}
}

/**
 * Retrieves the relative directory path of the active document with respect to the workspace folder
 * @returns The relative path from the workspace root to the file's directory, or null if no workspace or file is active
 * @throws Error if unable to determine relative directory path
 */
export function getFileRelativeDirectory(): string | null {
	try {
		const activeDocument = vscode.window.activeTextEditor?.document;
		if (!activeDocument) {
			return null;
		}

		const workspaceFolder = vscode.workspace.getWorkspaceFolder(activeDocument.uri);
		if (!workspaceFolder) {
			return null;
		}

		const workspaceFolderPath = workspaceFolder.uri.fsPath;
		const activeDocumentPath = activeDocument.fileName;
		const fileDir = path.dirname(activeDocumentPath);
		const relativePath = path.relative(workspaceFolderPath, fileDir);
		
		return relativePath;
	} catch (error) {
		console.error('Error getting relative file directory:', error);
		return null;
	}
}

/**
 * Extracts the file name without extension from a file path
 * @param filePath - The full path to the file
 * @returns The file name without extension
 */
export function getFileName(filePath: string): string {
	const extName = path.extname(filePath);
	return path.basename(filePath, extName);
}

/**
 * Extracts the file name with extension from a file path
 * @param filePath - The full path to the file
 * @returns The file name with extension
 */
export function getFileNameWithExtension(filePath: string): string {
	return path.basename(filePath);
}

/**
 * Copies the provided message to the clipboard and displays a status bar notification
 * @param msg - The text to copy to the clipboard
 * @param itemType - The type of item being copied (for the message)
 * @returns Promise that resolves when the operation is complete
 */
export async function copyToClipboardWithFeedback(msg: string, itemType: string = 'file information'): Promise<void> {
	try {
		await vscode.env.clipboard.writeText(msg);
		vscode.window.setStatusBarMessage(`✓ ${itemType} "${msg}" copied to clipboard`, 3000);
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error';
		vscode.window.showErrorMessage(`Failed to copy to clipboard: ${errorMessage}`);
		console.error('Error copying to clipboard:', error);
	}
}

/**
 * Shows an error message when a file operation fails
 * @param operation - The operation that failed
 * @param showNotification - Whether to show a notification to the user
 */
export function handleFileOperationError(operation: string, showNotification: boolean = true): void {
	const message = `Unable to ${operation}: No active file found`;
	
	if (showNotification) {
		vscode.window.showWarningMessage(message);
	}
	
	console.warn(message);
}
