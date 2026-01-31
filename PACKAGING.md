# Packaging and Distribution Guide

This guide explains how to package and distribute the Copy File Info VS Code extension.

## Prerequisites

No additional installation needed! The packaging scripts use `npx` to automatically download and run `@vscode/vsce` when needed.

## Creating an Extension Installer (.vsix)

### Quick Method

Use the npm script to package the extension:

```bash
npm run package
```

This will:

1. Run the `vscode:prepublish` script (compile TypeScript)
2. Create a `.vsix` file (e.g., `copy-file-info-0.0.3.vsix`)

### Manual Method

Alternatively, run the packaging command directly:

```bash
npx @vscode/vsce package
```

## Installing the Extension Locally

### Option 1: Command Line

Install the generated `.vsix` file using the VS Code CLI:

```bash
code --install-extension copy-file-info-0.0.3.vsix
```

### Option 2: VS Code UI

1. Open VS Code
2. Navigate to Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`)
3. Click the `...` (More Actions) menu at the top of the Extensions view
4. Select **"Install from VSIX..."**
5. Browse and select your `.vsix` file
6. Reload VS Code when prompted

### Option 3: Drag and Drop

Simply drag the `.vsix` file into the VS Code Extensions view.

## Sharing the Extension

The generated `.vsix` file can be:

- Shared directly with other users via email, cloud storage, etc.
- Distributed through your organization's internal channels
- Uploaded to a private extension marketplace
- Published to the official VS Code Marketplace (see below)

## Publishing to VS Code Marketplace

### 1. Create a Publisher Account

1. Go to [Visual Studio Marketplace Publisher Management](https://marketplace.visualstudio.com/manage)
2. Sign in with your Microsoft account
3. Create a new publisher ID (must match the `publisher` field in `package.json`)

### 2. Generate a Personal Access Token (PAT)

1. Go to [Azure DevOps](https://dev.azure.com/)
2. Click on your profile icon → **User settings** → **Personal access tokens**
3. Click **+ New Token**
4. Configure the token:
   - **Name**: VS Code Extension Publishing
   - **Organization**: All accessible organizations
   - **Expiration**: Custom defined (e.g., 90 days)
   - **Scopes**: Select **Custom defined**
     - Check **Marketplace** → **Manage**
5. Click **Create** and copy the token (you won't see it again!)

### 3. Login with vsce

```bash
npx @vscode/vsce login JianpingCai
```

Enter your Personal Access Token when prompted.

### 4. Publish the Extension

```bash
npm run publish
```

Or specify a version bump:

```bash
# Patch version (0.0.3 → 0.0.4)
npx @vscode/vsce publish patch

# Minor version (0.0.3 → 0.1.0)
npx @vscode/vsce publish minor

# Major version (0.0.3 → 1.0.0)
npx @vscode/vsce publish major

# Specific version
npx @vscode/vsce publish 1.0.0
```

### 5. Verify Publication

After publishing:

- Check your extension at: `https://marketplace.visualstudio.com/items?itemName=JianpingCai.copy-file-info`
- It may take a few minutes to appear in VS Code's extension search

## Pre-Publish Checklist

Before publishing, ensure:

- [ ] `version` in `package.json` is updated
- [ ] `CHANGELOG.md` is updated with new changes
- [ ] `README.md` has accurate documentation
- [ ] All tests pass: `npm test`
- [ ] Code is linted: `npm run lint`
- [ ] Extension compiles without errors: `npm run compile`
- [ ] Extension works correctly when installed locally
- [ ] `publisher` field in `package.json` matches your marketplace publisher ID (currently: `JianpingCai`)
- [ ] License file is present and accurate
- [ ] Repository URL is correct in `package.json`
- [ ] Extension icon is included (if available)
- [ ] Keywords are set for better discoverability

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version (X.0.0): Incompatible API changes
- **MINOR** version (0.X.0): New functionality, backward compatible
- **PATCH** version (0.0.X): Backward compatible bug fixes

### Current Version Strategy

For Copy File Info extension:

- **0.0.x**: Initial development releases
- **0.1.0**: First stable release with all core features
- **1.0.0**: Production-ready with comprehensive testing and documentation

## Adding Package Script to package.json

Add these scripts to your `package.json` if not already present:

```json
{
  "scripts": {
    "package": "npx @vscode/vsce package",
    "publish": "npx @vscode/vsce publish"
  }
}
```

## Troubleshooting

### ERROR: Missing publisher name

Ensure `package.json` has a `publisher` field:

```json
{
  "publisher": "JianpingCai"
}
```

### ERROR: Missing README

Ensure you have a `README.md` file in your project root.

### ERROR: Missing LICENSE

Add a `LICENSE` file to your project root.

### ERROR: ENOENT vsce not found

This should not occur if using the npm scripts or npx commands, as they automatically download `@vscode/vsce`.

Always use `npx @vscode/vsce` instead of `vsce` directly:

```bash
npx @vscode/vsce package
```

### Extension not appearing in Marketplace

- Wait 5-10 minutes for indexing
- Check your publisher dashboard for any warnings
- Verify the extension wasn't flagged during review

### Categories Warning

If you see a warning about categories, consider updating from "Other" to more specific categories like:

```json
{
  "categories": ["Productivity", "Other"]
}
```

## Useful Commands

```bash
# Package without publishing
npm run package

# or
npx @vscode/vsce package

# Publish with version bump
npm run publish

# or specific version bumps
npx @vscode/vsce publish patch
npx @vscode/vsce publish minor
npx @vscode/vsce publish major

# Show extension info
npx @vscode/vsce show JianpingCai.copy-file-info

# List all your published extensions
npx @vscode/vsce ls JianpingCai

# Unpublish an extension (careful!)
npx @vscode/vsce unpublish JianpingCai.copy-file-info

# Package pre-release version
npx @vscode/vsce package --pre-release

# Publish pre-release version
npx @vscode/vsce publish --pre-release
```

## Testing Before Publishing

### Local Installation Test

1. Package the extension: `npm run package`
2. Install locally: `code --install-extension copy-file-info-0.0.3.vsix`
3. Test all commands:
   - Copy File Name
   - Copy File Name with Extension
   - Copy File Path
   - Copy File Relative Path
   - Copy File Directory
   - Copy Relative File Directory
4. Verify keyboard shortcuts work
5. Test from context menus (editor title and file explorer)
6. Check status bar messages appear correctly

### Verification Checklist

- [ ] Extension activates without errors
- [ ] All commands appear in command palette
- [ ] Context menus show all options
- [ ] Keyboard shortcuts work as expected
- [ ] Clipboard operations work correctly
- [ ] Status bar feedback displays properly
- [ ] Extension works with both files in workspace and outside
- [ ] Relative path commands handle missing workspace gracefully
- [ ] No console errors in Developer Tools

## CI/CD Integration

Consider automating packaging and publishing with GitHub Actions:

```yaml
# .github/workflows/publish.yml
name: Publish Extension

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm install
      - run: npm run compile
      - run: npm test
      - run: npx @vscode/vsce publish -p ${{ secrets.VSCE_PAT }}
```

## Additional Resources

- [VS Code Extension Publishing Guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [VS Code Extension Marketplace](https://marketplace.visualstudio.com/vscode)
- [vsce CLI Documentation](https://github.com/microsoft/vscode-vsce)
- [Extension Manifest Reference](https://code.visualstudio.com/api/references/extension-manifest)
- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Marketplace Presentation Tips](https://code.visualstudio.com/api/references/extension-manifest#marketplace-presentation-tips)

## Best Practices

### Before First Publication

1. Choose a good extension name (unique, descriptive)
2. Add a high-quality icon (128x128 PNG)
3. Write clear, comprehensive README with screenshots
4. Include animated GIFs showing key features
5. Set appropriate keywords for discoverability
6. Add badges for version, installs, and ratings
7. Test thoroughly on multiple platforms (Windows, Mac, Linux)

### Marketplace Optimization

- Use descriptive display name
- Write compelling description (< 140 characters)
- Add detailed feature list with benefits
- Include high-quality screenshots and GIFs
- Respond promptly to user reviews and issues
- Keep extension updated regularly

### Post-Publication

1. Monitor marketplace statistics
2. Respond to user feedback
3. Address issues promptly
4. Release updates regularly
5. Maintain CHANGELOG.md
6. Engage with community

---

**Ready to share your extension with the world! 🚀**
