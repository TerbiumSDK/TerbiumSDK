#!/usr/bin/env node 
const program = require('commander'); 
const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const child_process = require('child_process')
const Terbium = require('./classes/terbium');
const TerbiumPackage = require('./terbium.json');

/*Commands*/
const CreateProject = require('./commands/create');
CreateProject.Terbium = Terbium;
CreateProject.TerbiumPackage = TerbiumPackage;

let hasCommand = false;

program.version('2.130.002', '-v, --vers', 'Terbium SDK CLI Version');

/*Create a new Project*/
program
    .command('create')
    .description('Create an empty Terbium SDK Project.')
    .requiredOption('-p, --project <project>', 'Name of the project to create.')
    .option('-c, --cordova', 'Setup project to allow for cordova.', false)
    .option('-e, --express', 'Include node/express develoment server.', false)
    .action((options) => {
        hasCommand = true;
        let params = {
            project: options.project || '',
            cordova: options.cordova || false,
            express: options.express || false,
            currentPath: process.cwd() || '',
            callPath: __dirname
        };
         
        if (params.project != '') {
            process.stdout.write('\033c')
            CreateProject.Run(params).then(() => {
                Terbium.ColorConsole('Finished...', 'FgWhite');
            }).catch((err) => {
                Terbium.ColorConsole(err, 'FgRed');
            });
        }
    });

/*Build a Project*/
program
    .command('build <platform>')
    .description('Build a Terbium SDK Cordova Project') 
    .action((platform) => { 
        hasCommand = true;
    });

/*Run a Project*/
program
    .command('run <platform>')
    .description('Runs the Terbium SDK project on a platform.') 
    .action((platform) => { 
        hasCommand = true;
    });

/*Start Dev Server*/
program
    .command('start')
    .description('Starts the Terbium SDK Node Development Server')
    .option('-p, --port', 'Define the port the server will run on. (Default: 8080)', 8080)
    .option('-a, --address', 'Define the ip address the server will run on. (Default: localhost, 127.0.0.1)', '127.0.0.1')

    .action((options) => {
        hasCommand = true;
        let serverPath = path.resolve('./server/index.js');
        let serverPathCmd = path.resolve('./server');

        fs.access(serverPath, error => {
            if (!error) {
                let serverProcess = child_process.exec('node ' + serverPath, { cwd: serverPathCmd, env: process.env, stdio: 'inherit' }, (err) => {
                    if (err) {
                        Terbium.ColorConsole('Could not start TerbiumSDK Development Server', 'FgRed');
                    }
                });

                serverProcess.stdout.on('data', (data) => {
                    Terbium.ColorConsole(data.toString(), 'FgWhite');
                });
            } else {
                Terbium.ColorConsole('TerbiumSDK Development Server Not Installed', 'FgRed');
            }
        });
    });

program.on('--help', function () {
    console.log('')
    console.log('Examples:');
    console.log('  $ terbiumsdk create --project "Example" --cordova --express');
    console.log('  $ terbiumsdk build ios');
    console.log('  $ terbiumsdk run ios');
    console.log('  $ terbiumsdk start --port 9001 --ipaddress "127.0.0.1"');
});

program.parse(process.argv);
 
if (!hasCommand) {
    console.log('Needs Command');
} 
