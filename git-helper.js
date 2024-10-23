#!/usr/bin/env node
const simpleGit = require('simple-git');
let inquirer;
let chalk;
const { showHelp } = require('./commands/helper.js'); // Assure-toi que le chemin est correct
const { showVersion } = require('./commands/version.js'); // Assure-toi que le chemin est correct

const git = simpleGit();

<<<<<<< HEAD
let addedFiles = false; // Pour suivre si des fichiers ont été ajoutés
let committed = false; // Pour suivre si un commit a été effectué

=======
>>>>>>> 7b03b67a61d6b2fd842f590dc3bf9740e008ffd4
async function loadDependencies() {
    chalk = (await import('chalk')).default;
    inquirer = (await import('inquirer')).default;
}

async function displayGitStatus() {
    const currentDirectory = process.cwd();
    const status = await git.status();
    const currentBranch = status.current;
    const statusMessage = `--- ${chalk.green('➜')} ${chalk.cyanBright(currentDirectory)} ${chalk.blue('git:(')}${chalk.red(currentBranch)}${chalk.blue(')')} ---`;
    console.log(`\n${chalk.bold(statusMessage)}\n`);
}

async function getGitFiles() {
    const status = await git.status();
    return [
<<<<<<< HEAD
        ...status.modified.map(file => ({ name: ` ${chalk.yellow('🟡')} ${file}`, value: file })),
        ...status.not_added.map(file => ({ name: ` ${chalk.red('🔴')} ${file}`, value: file }))
=======
        ...status.modified.map(file => ({ name: `${chalk.yellow('🟡')} ${file}`, value: file })),
        ...status.not_added.map(file => ({ name: `${chalk.red('🔴')} ${file}`, value: file }))
>>>>>>> 7b03b67a61d6b2fd842f590dc3bf9740e008ffd4
    ];
}

async function selectFilesToAdd(files) {
    const { selectedFiles } = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'selectedFiles',
            message: 'Sélectionnez les fichiers que vous souhaitez ajouter :',
            choices: files,
            loop: false,
            pageSize: 10,
        }
    ]);
<<<<<<< HEAD
    addedFiles = selectedFiles.length > 0;
=======
>>>>>>> 7b03b67a61d6b2fd842f590dc3bf9740e008ffd4
    return selectedFiles;
}

async function chooseCommitType() {
    const { commitType } = await inquirer.prompt([
        {
            type: 'list',
            name: 'commitType',
            message: 'Choisissez le type de commit :',
            choices: [
                { name: '[+] Add', value: '[+]' },
                { name: '[|] Fix', value: '[|]' },
<<<<<<< HEAD
                { name: '[|] Merge', value: '[|] fix merge' },
                { name: '[-] Remove', value: '[-]' },
=======
                { name: '[-] Remove', value: '[-]' },
                { name: '[|] Fix Merge', value: '[|] fix merge' }
>>>>>>> 7b03b67a61d6b2fd842f590dc3bf9740e008ffd4
            ],
            prefix: '',
        }
    ]);
    return commitType;
}

async function getCommitMessage(commitType) {
    if (commitType === '[|] fix merge') {
        return 'fix merge';
    }

    const { commitMessage } = await inquirer.prompt([
        {
            type: 'input',
            name: 'commitMessage',
            message: 'Entrez votre message de commit :',
            validate: (input) => input.trim() ? true : "Le message de commit ne peut pas être vide."
        }
    ]);
<<<<<<< HEAD
    committed = true;
=======
>>>>>>> 7b03b67a61d6b2fd842f590dc3bf9740e008ffd4
    return commitMessage;
}

async function confirmPush() {
    const { shouldPush } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'shouldPush',
            message: 'Le commit a été effectué avec succès. Voulez-vous le pousser ?',
            default: true,
        }
    ]);
    return shouldPush;
}

async function cleanIndex() {
    try {
        await git.reset(['HEAD']);
        console.log(`\n\n--- ${chalk.bold("Ajouts nettoyés")} ---\n`);
    } catch (error) {
        console.error("Erreur pendant la tentative de nettoyage :", error);
    }
}

async function undoLastCommit() {
    try {
        await git.reset(['--soft', 'HEAD~1']);
        console.log(`\n\n--- ${chalk.bold("Dernier commit annulé, modifications conservées dans l'index")} ---\n`);
    } catch (error) {
        console.error("Erreur pendant l'annulation du dernier commit :", error);
    }
}

async function main() {
    await loadDependencies();

    // Écouter la touche "q" pour quitter le programme
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', async (key) => {
        if (key.toString() === 'q') {
            if (addedFiles)
                await cleanIndex();
            else if (committed)
                await undoLastCommit();
            else
                console.log(`\n\n--- ${chalk.bold("Programme quitter avec succès")} ---\n`);
            process.exit(0);
        }
    });

    const args = process.argv.slice(2);

    if (args.includes('-h') || args.includes('--help')) {
        showHelp(); // Appelle la fonction showHelp
        return;
    }
    if (args.includes('-v') || args.includes('--version')) {
        showVersion(); // Appelle la fonction showVersion
        return;
    }

    try {
        await displayGitStatus();
        const files = await getGitFiles();

        if (files.length === 0) {
            console.log("Aucun fichier modifié ou non suivi trouvé.\n");
            return;
        }

        const selectedFiles = await selectFilesToAdd(files);

        if (selectedFiles.length === 0) {
            console.log("Aucun fichier sélectionné.\n");
            return;
        }

        await git.add(selectedFiles);
        const commitType = await chooseCommitType();
        const commitMessage = await getCommitMessage(commitType);

        const fullMessage = `${commitType} ${commitMessage}`;
        await git.commit(fullMessage);

        console.log(`\n--- ${chalk.bold("Commit effectué avec succès")} ---`);
        console.log(`Message de commit : "${fullMessage}"`);
        console.log(`Fichiers commis :\n${chalk.green(selectedFiles.join(' | '))}`);

        const shouldPush = await confirmPush();

        if (shouldPush) {
            await git.push();
            console.log(`\n--- ${chalk.bold("Push effectué avec succès")} ---`);
        } else
            undoLastCommit();
    } catch (err) {
        console.error("Erreur :", err);
    }
}

// Lancer le programme
main();
