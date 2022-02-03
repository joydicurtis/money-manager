import { Component } from "../core/component";

export class IncDialogComponent extends Component {
    constructor(id) {
        super(id);
    }
    
    init() {
        this.$el.addEventListener('click', handleButton.bind(this));
    }

    registerIncDialog(dialog) {
        this.mydialog = dialog;
    }
} 

function handleButton(event) {
    if (event.target.id === 'dialog-close') {
        this.mydialog.forEach(item => {
            item.component.hide()
        })
    }
}
