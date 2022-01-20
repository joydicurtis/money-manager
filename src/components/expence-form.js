import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";
import { apiService } from "../services/api.service";

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

async function submitHandler(event) {
    event.preventDefault();
    if (this.form.isValid()) {
        const formData = {
            expenceSum: this.$el.expenceSum.value,
            ...this.form.value()
        }
        await apiService.createExpence(formData);
        this.form.clear();
    }
}