(window || global).ExampleSite.Globals = new class {
    constructor() {
         
    }

    InDarkMode() {
        try {
            let item = JSON.parse(localStorage.getItem('dark-mode'));
            if (item && (item.darkmode && item.darkmode == true)) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }

    SetDarkMode(turnOn) {
        localStorage.setItem('dark-mode', JSON.stringify({ darkmode: turnOn }));
    } 
};
