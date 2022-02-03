export class Component {
    constructor(id) {
        this.$el = document.getElementById(id);
        this.init();
    }
    

    onShow() {
    }

    onHide() {

    }

    hide() {
        this.$el.classList.add('u-hidden');
        this.onHide();
    }
    show() {
        this.$el.classList.remove('u-hidden');
        this.onShow();
    }

    dialogOnShow() {
        let body = document.getElementById('body');
        body.classList.add('u-overflow-hidden');
        this.$el.classList.remove('u-hidden');
        this.onShow();
    }

    dialogOnHide() {
        let body = document.getElementById('body');
        body.classList.remove('u-overflow-hidden');
        this.$el.classList.add('u-hidden');
        this.onShow();
    }
}