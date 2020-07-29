class TerbiumBlock {
    constructor() {
    }

    render(params) {
        return new Promise((resolve, reject) => { 
            resolve();
        });
    }
 
    dispose() { }

    loaded() { } 

    openTerbiumSDK(route) { 
        window.open('https://www.terbiumsdk.com' + route);
    }
};
