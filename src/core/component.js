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
        //this.onHide();
    }
    show() {
        this.$el.classList.remove('u-hidden');
        //this.onShow();
    }
}

