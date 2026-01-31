# Contributing to Copy File Info

Thank you for your interest in contributing to the Copy File Info extension! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature or bugfix
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (version 16.x or higher)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JianpingCAI/vs-copy-file-directory.git
   cd vs-copy-file-directory
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Open the project in VS Code:

   ```bash
   code .
   ```

### Running the Extension

1. Press `F5` to open a new VS Code window with the extension loaded
2. The extension will compile automatically when you make changes (if watch task is running)
3. Reload the extension window (`Ctrl+R` or `Cmd+R`) to test changes

### Debugging

- Press `F5` to start debugging
- Set breakpoints in the TypeScript code
- Use the Debug Console to inspect variables
- Check the Extension Host output for logs

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feature/add-custom-formats` - for new features
- `fix/clipboard-error` - for bug fixes
- `docs/update-readme` - for documentation updates
- `refactor/utils-module` - for code refactoring

### Commit Messages

Write clear, descriptive commit messages:

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Start with a capital letter
- Keep the first line under 50 characters
- Add detailed description after a blank line if needed

Examples:

```
Add support for copying multiple file paths

Implement functionality to copy paths of multiple selected files
in the explorer. Paths are separated by newlines.
```

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

- Add tests for all new features
- Update existing tests when modifying functionality
- Ensure all tests pass before submitting a pull request
- Aim for high code coverage

Test files should be placed in `src/test/suite/` and follow the naming convention `*.test.ts`.

## Submitting Changes

### Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the CHANGELOG.md following [Keep a Changelog](https://keepachangelog.com/) format
3. Ensure all tests pass and the code follows the project's coding standards
4. Update documentation for any changed functionality
5. The PR will be merged once it's approved by a maintainer

### Pull Request Template

When creating a pull request, please include:

- **Description**: Clear description of what changes were made
- **Motivation**: Why are these changes necessary?
- **Related Issues**: Link any related issues (e.g., "Fixes #123")
- **Testing**: Describe how you tested the changes
- **Screenshots**: If applicable, add screenshots of UI changes
- **Checklist**:
  - [ ] Code follows the project's coding standards
  - [ ] Tests have been added/updated
  - [ ] Documentation has been updated
  - [ ] CHANGELOG.md has been updated
  - [ ] All tests pass

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Enable strict type checking
- Avoid using `any` type - use proper types or `unknown`
- Use `const` for variables that don't change, `let` for variables that do
- Never use `var`

### Code Style

- Use 4 spaces for indentation (tabs)
- Use single quotes for strings
- Add semicolons at the end of statements
- Use meaningful variable and function names
- Keep functions small and focused on a single task
- Add JSDoc comments for all public functions

### Example Function with JSDoc

```typescript
/**
 * Retrieves the file path from the provided URI or active editor
 * @param args - Array of URI objects from VS Code context menu
 * @returns The file system path of the file, or null if not found
 */
function getFilePath(args: vscode.Uri[]): string | null {
    // Implementation
}
```

### File Organization

- Keep related functions together
- Extract utility functions to separate modules
- Use consistent naming conventions
- Keep files focused on a single responsibility

### ESLint

The project uses ESLint for code quality. Run linting with:

```bash
npm run lint
```

Fix linting issues before submitting:

```bash
npm run lint -- --fix
```

## Feature Requests

Feature requests are welcome! Please:

1. Check if the feature has already been requested
2. Open an issue with a clear description of the feature
3. Explain the use case and benefits
4. Be open to discussion and feedback

## Bug Reports

When reporting bugs, please include:

1. VS Code version
2. Extension version
3. Operating system
4. Steps to reproduce
5. Expected behavior
6. Actual behavior
7. Screenshots or error messages if applicable

## Questions?

If you have questions about contributing:

- Open an issue with the "question" label
- Check existing issues for similar questions
- Review the README.md for general information

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.

---

Thank you for contributing to Copy File Info! 🎉
