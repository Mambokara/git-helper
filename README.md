
# Git Helper Script

## Overview

The **Git Helper Script** is a command-line utility that simplifies the process of managing Git commits. It allows users to interactively select files, choose commit types, write commit messages, and confirm pushes to the remote repository. The script also provides easy ways to cancel staged changes or commits if needed.

## Features

- **Interactive File Selection**: Easily navigate and select modified or untracked files for staging.
- **Commit Type Options**: Choose from predefined commit types (`Add`, `Fix`, `Remove`, `Fix Merge`) to quickly classify your changes.
- **Custom Commit Messages**: Add descriptive commit messages to better explain the changes.
- **Push Confirmation**: After committing, you can confirm whether or not to push the changes to the remote repository.
- **Cancel Actions**: Press `q` at any time to unstage files and exit, canceling the current operation.
- **Help Menu**: Get detailed instructions on how to use the script by running `./git-helper --help`.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 12 or later)
- [Git](https://git-scm.com/) must be installed and available in the system PATH.

### Clone the Repository
To get started, clone this repository to your local machine:
```bash
git clone <repository-url>
cd <repository-directory>
```

### Install Dependencies
```bash
npm install
```

## Usage

### Running the Script
To run the Git Helper Script, use the following command:
```bash
./git-helper
```

### Available Commands
- `-h`, `--help`: Show the help menu and exit.
- `-v`, `--version`: Display the current version of the script.

### Interactive Controls
- **[↑] / [↓]**: Navigate through the list of files.
- **[Space]**: Select or deselect a file.
- **[a]**: Select all files.
- **[i]**: Invert the current selection.
- **[Enter]**: Confirm file selection and proceed to the next step.
- **[q]**: Cancel the current operation, unstage all selected files, and exit.
- **[Ctrl+C]**: Exit the script immediately.

## Example Workflow
1. **Launch the Script**: 
   ```bash
   ./git-helper
   ```
2. **Select Files**: Use the arrow keys and space bar to select the files you want to add.
3. **Choose Commit Type**: Pick a commit type (e.g., `Add`, `Fix`, `Remove`).
4. **Enter Commit Message**: Write a commit message describing your changes.
5. **Confirm Push**: Decide whether to push the commit to the remote repository or not.
6. **Exit or Cancel**: Press `q` at any time to cancel the process and unstage files.

## Example
```bash
./git-helper
```
1. The script displays the current Git status and lets you select files.
2. After selecting files, choose a commit type from:
   - `[+] Add`
   - `[|] Fix`
   - `[-] Remove`
   - `[|] Fix Merge`
3. Enter a commit message to finalize your commit.
4. Confirm whether to push the commit to the remote repository.

## Error Handling
If an error occurs during the script's operation (e.g., invalid Git commands), the script will attempt to clean up by unstaging files and then exit. Make sure that Git is properly installed and configured on your system to avoid issues.

## Troubleshooting
- **Script not running**: Ensure you have executable permissions. Run:
  ```bash
  chmod +x git-helper
  ```
- **Files not unstaged after canceling**: If files remain staged after pressing `q`, make sure there are no other Git conflicts or locks. Manually run:
  ```bash
  git reset
  ```

## Author
[Ewan SCHAFFHAUSER]