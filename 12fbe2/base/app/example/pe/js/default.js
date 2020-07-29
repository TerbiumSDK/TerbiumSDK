class TerbiumBlock {
    constructor() {
    }

    render(params) {
        return new Promise((resolve, reject) => {
            Terbium.Globals.UpdatePageVariable('today', Terbium.Dates(new Date()).format('dddd, MMMM Do'));
            this.loadContent(null, 'content-a');
            resolve();
        });
    }

    dispose() {

    }

    loaded() {

    }

    resize() {
    }

    loadContent(e, name) {
        Terbium.Pages.LoadPage({
            page: {
                path: 'app/example/example-phone-content/',
                name: name,
                params: {},
                events: {
                    resize: false,
                    loaded: true,
                    dispose: false
                }
            },
            area: mainBodyContent,
            append: false,
            loading: true
        }).then((res) => {
            //Content Loaded
        }).catch((err) => {
            //Problem loading content.
        });
    }

    OpenActions(e) {
        footerActionDialog.Open();
    }
};
