# copy-directory-path README

Copies the directory path of the currently active file to the clipboard.

## Features

This extension provides six different commands for copying file-related information to the clipboard. The commands can be accessed from the context menus in the editor and the file explorer, as well as from the command palette. The available commands are:

1. **Copy File Name**: Copies the file name without the extension of the selected or active file.
2. **Copy File Name with Extension**: Copies the file name with the extension of the selected or active file.
3. **Copy File Path**: Copies the full file path of the selected or active file.
4. **Copy File Relative Path**: Copies the relative file path of the active file with respect to the workspace folder.
5. **Copy File Directory**: Copies the full directory path of the selected or active file.
6. **Copy Relative File Directory**: Copies the relative directory path of the active file with respect to the workspace folder.

The extension also provides feedback by displaying a status bar message when the selected information is successfully copied to the clipboard.

## Requirements

This extension has the following requirements:

1. Visual Studio Code: The extension is designed for use with Visual Studio Code. Make sure you have the latest version of Visual Studio Code installed.

2. Workspace folder: Some features, such as copying the relative file path and relative file directory, require the file to be part of a workspace folder. Make sure the file is inside a workspace folder before using these commands.

3. Proper file permissions: Ensure that the extension has the necessary permissions to read the file system and interact with the clipboard on your operating system.

4. Node.js (optional): If you're developing or modifying the extension, ensure that you have Node.js installed to install the required dependencies and run the development environment.


## Known Issues

-
## Release Notes

### 0.0.3

* Initial release


# License

[MIT](LICENSE) &copy; Jianping Cai

**Enjoy!**
