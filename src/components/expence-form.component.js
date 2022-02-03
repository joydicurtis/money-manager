import { Component } from "../core/component";
import { Form } from "../core/form";
import { Validators } from "../core/validators";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";

export class ExpenceFormComponent extends Component {
    constructor(id, {loader}, {categories}, {sumDialog}) {
        super(id);
        this.expences = expences.$el;
        //this.expencesList = expencesList.$el;
        this.loader = loader;
        this.categories = categories.$el;
        this.sumDialog = sumDialog;
        if (this.categories) {
            this.categories.addEventListener('change', radioHandler.bind(this));
        }
    }

    init() {
        this.$el.addEventListener('submit', submitHandler.bind(this));
        this.form = new Form(this.$el, {
            expenceSum: [Validators.required, Validators.minLength(1)]
        })
    }
}

async function radioHandler(event) {
    return this.category = event.target.value;
}

async function submitHandler(event) {
    event.preventDefault();
    if (this.form.isValid() && this.category) {
        const formData = {
            expenceSum: this.$el.expenceSum.value,
            category: this.category,
            expenceNote: this.$el.expenceNote.value,
            date: new Date(),
            ...this.form.value()
        }
        await apiService.createExpence(formData);
        this.form.clear();
        this.loader.show();
        this.expencesList.innerHTML='';
        this.loader.show();
        const fbData = await apiService.fetchExpences();
        const expences = TransformService.fbObjectToArray(fbData);
        const html = expences.map(expence => renderExpences(expence));
        this.loader.hide();
        this.expencesList.insertAdjacentHTML('afterbegin', html.join(' '));
        this.sumDialog.hide();
        this.loader.hide();
    }
}

function renderExpences(expence) {
    return `
        <div class="expences-list-item" data-id="${expence.id}">${expence.expenceSum}   ${expence.category}    ${expence?.expenceNote}    ${expence.date}</div>
    `
}