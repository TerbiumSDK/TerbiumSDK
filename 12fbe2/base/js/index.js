/*
 When using the scripts option in start you can set the version of the script
 this will cache it and only redownload it when the version changes.

 So for this example we set a variable of ScriptVersion but then below it 
 we say ScriptVersion = new Date() just to randomize the version so while
 we are developing the script is reloaded fresh everytime so changes reflect.

 This isn't required just find it useful when developing.
 */
const ScriptDebug = true; 
let ScriptVersion = '14.0.1';
  
if (ScriptDebug) {
    ScriptVersion = new Date();
}

/*Not required but just an example of how to set global page variables.*/
Terbium.PageVariables = [
    { variable: 'app-name', value: 'Terbium SDK' },
    { variable: 'year', value: new Date().getFullYear() },
    { variable: 'imgpath', value: 'img/' }
];

/*Set a couple of options, not required this is just an example*/
Terbium.Globals.Options.LockPhonePortrait = true;
Terbium.Globals.Options.DeviceCheck = true;
Terbium.Globals.Options.DarkModeForce = false;
Terbium.Globals.Options.DarkModeAuto = false;
 

/*If we want to route experiences we can do something like this */
/*where key is the current experience and route is where we want it to go */
/*So we could say key: 'te', route: 'we' to route all tablet experiences to the desktop/web experience*/
/*You normally do this is lets say your tablet experience is 99% the same as your desktop experience*/

Terbium.Globals.RouteExperience = [
    { key: 'pe', route: 'pe' },
    { key: 'te', route: 'te' },
    { key: 'we', route: 'we' }
]; 

/*Start up Terbium and load the app/home page */
Terbium.Start({
    namespace: 'ExampleSite', //Set a global namespace that we can attach classes to.
    scripts: [
        {parentKey: 'Main', key: 'Site.Globals', url: 'classes/site.globals.js', version: ScriptVersion, expire: 30 } 
    ],
    plugins: [ ],
    debug: true,
    //You do not have to set the page here if you dont want to
    //if this is left page: {} then you will need to load the page
    //yourself after the start promise is resolved.
    page: {
        path: 'app/example/',
        name: 'default',
        params: {},
        events: {
            resize: true,
            loaded: true,
            dispose: true
        }
    },
    beforePageLoad: () => {  
        //Toggle dark mode if it has been forced
        //Not required just an example of how to do it, there are lots of other ways to
        //do it, this is just an example of how you could store the value in storage.

        if (Terbium.Cache.StorageEnabled) {
            let item = null;
            try {
                item = JSON.parse(localStorage.getItem('dark-mode'));
            }
            catch (e) { }

            if (!item) {
                if (document.documentElement.classList.contains('dark-mode')) {
                    ExampleSite.Globals.SetDarkMode(true);
                    Terbium.Globals.EnableDarkMode();
                }
                else {
                    ExampleSite.Globals.SetDarkMode(false);
                    Terbium.Globals.DisableDarkMode();
                }
            }
            else {
                if (ExampleSite.Globals.InDarkMode()) {
                    Terbium.Globals.EnableDarkMode();
                }
                else {
                    Terbium.Globals.DisableDarkMode();
                }
            }
        }
    }
}).then((res) => {    
    console.log('Terbium SDK Started');
}).catch((err) => {
    console.log('Terbium SDK Error->', err);
});
 