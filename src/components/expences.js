import { Component } from "../core/component";
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";
export class ExpencesComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', handleButton.bind(this));
    }

    async onShow() {
        this.loader.show();
        const fbData = await apiService.fetchExpences();
        const expences = TransformService.fbObjectToArray(fbData);
        const html = expences.map(expence => renderExpences(expence));
        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
    }

    onHide() {
        this.$el.innerHTML = '';
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

function renderExpences(expence) {
    return `
        <div class="expences-list-item">${expence.expenceSum}</div>
    `
}