# Terbium SDK Pages
Creates TerbiumSDK 14 Project.\
**Install Global** 
npm i -g terbiumsdk\
\
**Parameters**\
'-p [string]', 'Name of the TerbiumSDK project to create.'\
'-e', 'Include express development server.'\
'-c', 'Include cordova project.'\
\
\
**Basic Usage**\
terbiumsdk -p "TerbiumSDKExample" -e -c
\
\
\
**(Optional Running express development server.**\
**Change to server directory inside of your project and run**\
node index

**This will create a test server that you can use for development.
\
\
\
** (Optional Cordova) run TerbiumSDK inside of cordova**\
** In your project directory type "cordova platform add browser" then "cordova platform build browser"
** you can change "browser" with other build options like android, ios windows.
** for iOS you will need xcode.

**Refer to https://cordova.apache.org/docs/en/latest/ for more options on using Cordova.

