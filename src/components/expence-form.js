import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";

export class ExpenceFormComponent extends Component {
    constructor(id) {
        super(id);
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this));

        this.form = new Form(this.$el, {
            expenceSum: [Validators.required, Validators.minLength(1)]
        })
    }
}

function submitHandler(event) {
    event.preventDefault();
    if (this.form.isValid()) {
        const formData = {
            expenceSum: this.$el.expenceSum.value,
            ...this.form.value()
        }
        this.form.clear();
    }
}