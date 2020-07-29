const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');
const child_process = require('child_process')
 
"use strict";
class createProject {
    constructor() {
        this.Terbium = null;
        this.TerbiumPackage = null;
        this.options = {};
        /*            project: options.project || '',
            cordova: options.cordova || false,
            express: options.express || false,
            currentPath: process.cwd() || '',
            callPath: __dirname*/
    }

    Run(options) {
        this.options = options;
        return new Promise((resolve, reject) => {
            try {
                const appSource = path.join(this.options.callPath, './' + this.TerbiumPackage.Site);
                const appTarget = path.resolve('./' + options.project + '/src');

                const cordovaSource = path.join(this.options.callPath, './' + this.TerbiumPackage.Cordova);
                const cordovaRoot = path.resolve('./' + options.project + '/');

                const serverSource = path.join(this.options.callPath, './' + this.TerbiumPackage.Express);
                const serverTarget = path.resolve('./' + options.project + '/server');

                this.Terbium.ColorConsole('Writing Terbium SDK project files...', 'FgWhite');
                try {
                    fs.copySync(appSource, appTarget, {
                        filter: (src, dest) => {
                            let includeFile = true;
                            this.TerbiumPackage.Ignores.forEach((item) => {
                                if (src.includes(item)) {
                                    includeFile = false;
                                }
                            });

                            return includeFile;
                        }
                    });
                    this.Terbium.ColorConsole('Created example site...', 'FgGreen');
                }
                catch (e) {
                    this.Terbium.ColorConsole('Create Error: [' + e.message + ']', 'FgRed');
                }
                this.Terbium.ColorConsole('Complete...', 'FgGreen');
                this.Terbium.ColorConsole(' ', 'FgWhite');

                if (this.options.express) {
                    this.Terbium.ColorConsole('Writing Terbium SDK server files...', 'FgWhite');
                    fs.copySync(serverSource, serverTarget, (src, dest) => {
                        let includeFile = true;
                        this.TerbiumPackage.Ignores.forEach((item) => {
                            if (src.includes(item)) {
                                includeFile = false;
                            }
                        });

                        return includeFile;
                    });
                    this.Terbium.ColorConsole('Complete...', 'FgGreen');
                    this.Terbium.ColorConsole(' ', 'FgWhite');

                    this.Terbium.ColorConsole('Processing server modules...');
                    child_process.execSync('npm i', { cwd: serverTarget, env: process.env, stdio: 'inherit' })
                    this.Terbium.ColorConsole('Complete...', 'FgGreen');
                    this.Terbium.ColorConsole(' ', 'FgWhite');
                }

                if (this.options.cordova) {
                    this.Terbium.ColorConsole('Installing Cordova...', 'FgWhite');
                    fs.copySync(cordovaSource, cordovaRoot, (src, dest) => {
                        let includeFile = true;
                        this.TerbiumPackage.Ignores.forEach((item) => {
                            if (src.includes(item)) {
                                includeFile = false;
                            }
                        });

                        return includeFile;
                    });
                    this.Terbium.ColorConsole('Complete...', 'FgGreen');
                    this.Terbium.ColorConsole(' ', 'FgWhite');
                    this.Terbium.ColorConsole('Preparing Cordova...', 'FgGreen');
                    child_process.execSync('npm i', { cwd: cordovaRoot, env: process.env, stdio: 'inherit' })
                    this.Terbium.ColorConsole('Complete...', 'FgGreen');
                    this.Terbium.ColorConsole('New project located at -> ' + cordovaRoot, 'FgWhite'); 
                    this.Terbium.ColorConsole(' ', 'FgWhite'); 
                }

                this.Terbium.ColorConsole(' ', 'FgWhite');
                resolve();
            }
            catch (e) {
                reject(e.message);
            }
        });
    }
};

module.exports = new createProject();
