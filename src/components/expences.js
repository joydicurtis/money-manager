import { Component } from "../core/component";

export class ExpencesComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('click', handleButton.bind(this));
    }

    registerDialog(dialog) {
        this.dialog = dialog;
    }
}

function handleButton(event) {
    if (event.target.id === 'add-expence') {
        this.dialog.forEach(item => {
            item.component.show();
        })
    }
}