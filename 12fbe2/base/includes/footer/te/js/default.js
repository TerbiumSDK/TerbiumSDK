class TerbiumBlock {
    constructor() {
        this.NavigationOpen = false;
    }

    render(params) { }
 
    dispose() { }

    loaded() { } 

    
    openNavigation(e) {
        if (this.NavigationOpen) {
            this.NavigationOpen = false;
            this.page.getElement('.example-footer').removeAttr('active');
            e.target.getElement('tb-icon').html('&#xf067');
        }
        else {
            this.NavigationOpen = true;
            this.page.getElement('.example-footer').attr('active', '');
            e.target.getElement('tb-icon').html('&#xf00d');
        } 
    }
};
