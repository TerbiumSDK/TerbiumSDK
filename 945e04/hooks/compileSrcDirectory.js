const ncp = require('ncp').ncp;
const fs = require('fs');
const path = require('path');
const { join } = require('path');
const { readdirSync, statSync } = require('fs');
const fsExtra = require('fs-extra')
const UglifyJS = require("terser");

let srcPath = path.resolve('./src/') + '\\';
let wwwPath = path.resolve('./www/') + '\\';
ncp.limit = 16;


try {
    fsExtra.emptyDirSync(wwwPath)
}
catch (e) { }

const getAllFiles = (dir, extn, files, result, regex) => {
    files = files || readdirSync(dir);
    result = result || [];
    regex = regex || new RegExp(`\\${extn}$`)

    for (let i = 0; i < files.length; i++) {
        let file = join(dir, files[i]);
        if (statSync(file).isDirectory()) {
            try {
                result = getAllFiles(file, extn, readdirSync(file), result, regex);
            } catch (error) {
                continue;
            }
        } else {
            if (regex.test(file)) {
                result.push(file);
            }
        }
    }
    return result;
}

let ignoreFiles = [
    "fred",
];

let reservedWords = [
    'Terbium',
    'TerbiumBlock'
];

ncp(srcPath, wwwPath, (err) => {
    if (err) {
        console.log(err)
        return;
    }

    console.log('Copied src folder to www folder.');
    try {
        let jsFiles = getAllFiles(wwwPath, '.js');
        let jsOptions = options = {
            toplevel: false,
            mangle: { reserved: reservedWords },
            compress: {
                defaults: true,
                drop_console: true,
                keep_fargs: false
            },
            output: {
                beautify: false,
                preamble: "/* terbium minified */",
                comments: false,
                webkit: true,
                safari10: true
            },
            safari10: true,
            keep_classnames: true
        };

        for (let i = 0; i < jsFiles.length; i++) {
            let filename = jsFiles[i];

            if (filename.indexOf(ignoreFiles[0]) == -1) {
                let jsCode = fs.readFileSync(filename, 'utf8');  

                let minCode = UglifyJS.minify(jsCode, jsOptions);
                if (minCode.error) {
                    console.log('min-code-err->', minCode.error); 
                }
                else { 
                    console.log('write min->', filename);
                    fs.writeFileSync(filename, minCode.code, 'utf8');
                } 
            }
        }
    }
    catch (e) {
        console.log('e->', e.message);
    }
});

