class TerbiumBlock {
    constructor() {
        this.HeaderCaption = null;
    }

    render(params) { 
        this.HeaderCaption = this.page.getElement('.section-header-caption');
        if (params && params.PageTitle) {
            this.HeaderCaption.html(params.PageTitle);
        }
    }
 
    dispose() { }

    loaded() { } 


    NavigateTo(e, url) {  
        location.href = url;
    } 
};
