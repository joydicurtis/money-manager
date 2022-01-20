export class Component {
    constructor(id) {
        this.$el = document.getElementById(id);
        this.init();
    }

    init() {}

    hide() {
        this.$el.classList.add('u-hidden');
    }

    show() {
        this.$el.classList.remove('u-hidden');
    }
}

