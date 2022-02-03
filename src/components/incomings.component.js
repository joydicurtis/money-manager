import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";
import { incomingsCategories } from "../components/categories.js";
import { Form } from "../core/form";
import { Validators } from "../core/validators";
import { dataHandler } from "../services/data-handler.service";

export class IncomingsComponent extends Component {
    constructor(id, {loader}, {incDialog}, incomingsList) {
        super(id);
        this.loader = loader;
        this.incomingsList = incomingsList;
        this.mydialog = incDialog;
        this.init(this.incomingsList, this.mydialog)
    }

    async init(incomingsList, dialog) {
        this.$el.addEventListener('click', handleButton.bind(this));
        if (incomingsList) {
            await dataHandler.loadIncomings();
        }
            this.$el.addEventListener('submit', submitInHandler.bind(this));
    }

    onShow() {
    }
    onHide() {
    }
}

function renderCategories(category, selectedCat) {
    if ((typeof selectedCat !== 'undefined') && (category.name === selectedCat)) {
        return `
        <li class="checked">
            <div class="categories-item">
                <input type="radio" id="${category.name}" name="inccategory" value="${category.name}" checked>
                <label for="${category.name}"><span><i class="${category?.class}"></i></span>${category.name}</label>
            </div>
        </li>
    `
    } 
    else {
        return `
            <li>
                <div class="categories-item">
                    <input type="radio" id="${category.name}" name="inccategory" value="${category.name}">
                    <label for="${category.name}"><span><i class="${category?.class}"></i></span>${category.name}</label>
                </div>
            </li>
        `
    }
}

async function submitInHandler(event) {
    event.preventDefault();
    const form = this.$el.querySelector('#incoming-create');
    this.form = new Form(form, {
        incomingSum: [Validators.required]
    });
    this.loader.show();
    const formData = {
        incomingSum: form.incomingSum.value,
        inccategory: form.inccategory.value,
        incomingNote: form.incomingNote.value,
        date: new Date().toLocaleDateString(),
        ...this.form.value()
    }
    if (this.form.isValid()) {
        const formData = {
            incomingSum: form.incomingSum.value,
            inccategory: form.inccategory.value,
            incomingNote: form.incomingNote.value,
            date: new Date().toLocaleDateString(),
            ...this.form.value()
        }
        if (event.submitter.id === 'btn-add') {
            await dataHandler.addIncoming(formData);
            this.mydialog.hide();
        }
        if (event.submitter.id === 'btn-save') {
            await dataHandler.updateIncoming(event.submitter.dataset.id, formData);
            this.mydialog.hide();
        }
        this.loader.hide();
        this.form.clear();
    }
    if (event.submitter.id === 'btn-remove') {
        await dataHandler.removeIncoming(event.submitter.dataset.id);
        this.mydialog.hide();
    }
}

function handleButton(event) {
    if(event.target && event.target.classList.contains('js-edit-incomings')){
        this.mydialog.show();
        let id = event.target.dataset.id;
        openDialog(this.mydialog, id);
    };
    if (event.target.id === 'add-incoming') {
        this.mydialog.show();
        openDialog(this.mydialog);
    }
}

async function openDialog(dialog, id) {
    dialog.$el.innerHTML = '';
    let item;
    let categoriesHtml = '';
    if (typeof id === 'undefined') {
        item = [{incomingSum: '', incomingNote: ''}];
        categoriesHtml = incomingsCategories.map(cat => renderCategories(cat));
        id = '';
        item.forEach(x => {
            let html = renderDialog(x, id, 'Add', 'btn-add');
            dialog.$el.innerHTML = '';
            dialog.$el.insertAdjacentHTML('afterbegin', html);
        })
    }
    else {
        let data = await apiService.fetchIncomings();
        let incomings = TransformService.fbObjectToArray(data);
        item = incomings.filter(item => item.id === id);
        item.forEach(x => {
            let html = renderDialog(x, id, 'Save', 'btn-save' );
            dialog.$el.innerHTML = '';
            dialog.$el.insertAdjacentHTML('afterbegin', html);
        })
    }
}

function renderDialog(item, id, btnName, btnId ) {
    let categoriesHtml = incomingsCategories.map(cat => renderCategories(cat, item.inccategory));
    return `
        <div class="dialog-sum-content">
            <form id="incoming-create">
                <button type="button" class="btn btn-secondary" id="dialog-close">X</button>
                <div class="form-control">
                    <label>Sum</label>
                    <input type="number" name="incomingSum" placeholder="Input" value="${item.incomingSum}">
                </div>
                <i class="fas fa-user"></i>
                <ul class="categories">
                    ${categoriesHtml}
                </ul>
                <div class="form-control">
                    <label>Note</label>
                    <textarea type="text" placeholder="Note" name="incomingNote">${item.incomingNote}</textarea>
                </div>
                <div class="dialog-sum-buttons">
                    <button type="submit" id="btn-remove" data-id="${id}" class="btn btn-primary">Remove</button>
                    <button type="submit" id="${btnId}" data-id="${id}" class="btn btn-primary">Add2</button>
                </div>
            </form>
        </div>
    `;
}