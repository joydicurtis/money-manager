import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";
import { expencesCategories } from "../components/categories.js";
import { Form } from "../core/form";
import { Validators } from "../core/validators";
import { dataHandler } from "../services/data-handler.service";
import { expencesList } from "..";

export class ExpencesComponent extends Component {
    constructor(id, {loader}, {sumDialog}, expencesList) {
        super(id);
        this.loader = loader;
        this.expencesList = expencesList;
        this.dialog = sumDialog;
        if (this.expencesList && this.dialog) {
            this.init(this.expencesList, this.dialog)
        }
    }

    async init(expencesList, dialog) {
        this.$el.addEventListener('click', handleButton.bind(this));
        if (expencesList) {
            await dataHandler.loadExpences();
        }
        if (dialog) {
            dialog.$el.addEventListener('submit', submitHandler.bind(this), false);
        }
    }

    onShow() {
    }
    onHide() {
    }
}

function renderCategories(category, selectedCat) {
    if ((typeof selectedCat !== 'undefined') && (category.name === selectedCat)) {
        return `
        <li>
            <input type="radio" id="${category.name}" name="category" value="${category.name}" checked>
            <label for="${category.name}">${category.name}</label>
        </li>
    `
    } 
    else {
        return `
            <li>
                <input type="radio" id="${category.name}" name="category" value="${category.name}">
                <label for="${category.name}">${category.name}</label>
            </li>
        `
    }
}

async function submitHandler(event) {
    event.preventDefault();
    if (event.target.id === 'expence-create') {
        const form = this.$el.querySelector('#expence-create');
        this.form = new Form(form, {
            expenceSum: [Validators.required, Validators.minLength(1)]
        });
        this.loader.show();
        if (this.form.isValid()) {
            const formData = {
                expenceSum: form.expenceSum.value,
                category: form.category.value,
                expenceNote: form.expenceNote.value,
                date: new Date().toLocaleDateString(),
                ...this.form.value()
            }
            if (event.submitter.id === 'btn-add-ex') {
                await dataHandler.addExpence(formData);
                this.dialog.hide();
            }
            if (event.submitter.id === 'btn-save-ex') {
                await dataHandler.updateExpence(event.submitter.dataset.id, formData);
                this.dialog.hide();
            }
            this.loader.hide();
            this.form.clear();
        }
        if (event.submitter.id === 'btn-remove') {
            await dataHandler.removeExpence(event.submitter.dataset.id);
            this.dialog.hide();
        }
    }
}

function handleButton(event) {
    if(event.target && event.target.classList.contains('js-edit-expence')){
        this.dialog.show();
        let id = event.target.dataset.id;
        openDialog(this.dialog, id);
    };
    if (event.target.id === 'add-expence') {
        this.dialog.show();
        openDialog(this.dialog);
    }
}

async function openDialog(dialog, id) {
    dialog.$el.innerHTML = '';
    let item;
    let categoriesHtml = '';
    if (typeof id === 'undefined') {
        item = [{expenceSum: '', expenceNote: ''}];
        categoriesHtml = expencesCategories.map(cat => renderCategories(cat));
        id = '';
        item.forEach(x => {
            let html = renderDialog(x, id, 'Add', 'btn-add-ex');
            dialog.$el.innerHTML = '';
            dialog.$el.insertAdjacentHTML('afterbegin', html);
        })
    }
    else {
        let data = await apiService.fetchExpences();
        let expences = TransformService.fbObjectToArray(data);
        item = expences.filter(item => item.id === id);
        item.forEach(x => {
            let html = renderDialog(x, id, 'Save', 'btn-save-ex' );
            dialog.$el.innerHTML = '';
            dialog.$el.insertAdjacentHTML('afterbegin', html);
        })
    }
}

function renderDialog(item, id, btnName, btnId ) {
    let categoriesHtml = expencesCategories.map(cat => renderCategories(cat, item.category));
    return `
        <div class="dialog-sum-content">
            <form id="expence-create">
                <button type="button" class="btn btn-secondary" id="dialog-close">X</button>
                <div class="form-control">
                    <label>Sum</label>
                    <input type="number" name="expenceSum" placeholder="Input" value="${item.expenceSum}">
                </div>
                <i class="fas fa-user"></i>
                <ul class="categories">
                    ${categoriesHtml}
                </ul>
                <div class="form-control">
                    <label>Note</label>
                    <textarea type="text" placeholder="Note" name="expenceNote">${item.expenceNote}</textarea>
                </div>
                <div class="dialog-sum-buttons">
                    <button type="submit" id="btn-remove" data-id="${id}" class="btn btn-primary">Remove</button>
                    <button type="submit" id="${btnId}" data-id="${id}" class="btn btn-primary">Add1</button>
                </div>
            </form>
        </div>
    `;
}