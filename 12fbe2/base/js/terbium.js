/*
 TERBIUM SDK BOOT LOADER
 This is a simple boot loader you can use for web or mobile cordova applications.
 Note: This boot loader should only be used for cordova, terbium framework and the index(start) script.
 Your other scripts, classes etc. should be loading in the start method of Terbium.SDK.PageScripts
*/
let injectArea = document.body || document.getElementsByTagName('body')[0];
let jsPath = 'js'; 

loadScript = (d, s, src, id, breakcache) => {
    return new Promise((resolve, reject) => {
        let js = null;
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.onload = function () {
            resolve();
        };

        let cacheString = '';
        if (breakcache) {
            cacheString = '?v=' + Math.floor(Math.random() * 100000).toString()
        }

        js.src = src + cacheString;

        injectArea.appendChild(js);
    });
};

/*
 * ***IMPORTANT****
 * This example uses latest from the Terbium CDN you should download a copy of this file locally
 * because latest is updated frequently and to avoid any breaking changes that may or may not
 * create issues in your app you should only upgrade after testing.
 * 
 * For this reason you should download and replace the link https://www.terbiumsdk.com with your
 * local path to the terbium.framework.js file.
 * 
*/
if (!document.URL.startsWith('http')) {
    /*If we are in cordova there will be a cordova.js file it is automaticly injected by cordova build processs*/
    loadScript(document, 'script', 'cordova.js', 'terbium_cordova').then(() => {
        try {
            /*Bind cordova device ready event before loading terbium*/
            document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
                loadScript(document, 'script', 'https://cdn.terbiumsdk.com/terbium.framework.latest.js', 'terbium_js').then(() => {
                    loadScript(document, 'script', jsPath + '/index.js', 'terbium_index', true).then(() => {

                    });
                });
            }
        }
        catch (e) { }
    });
}
else {
    /*IF we are in http we are on the web so only load up the framework*/
    loadScript(document, 'script', 'https://cdn.terbiumsdk.com/terbium.framework.latest.js', 'terbium_js').then(() => {
        loadScript(document, 'script', jsPath + '/index.js', 'terbium_index', true).then(() => {
        });
    });
};
