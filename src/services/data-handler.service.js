import { apiService } from "./api.service";
import { TransformService } from "./transform.service";
import { expencesList } from "../index";
import { incomingsList } from "../index";

class DataHandlerService {
    //Expences
    async loadExpences() {
        fetchExpences();
    }
    async addExpence(sum) {
        await apiService.createExpence(sum).then(setTimeout(fetchExpences, 2000));
    }
    async updateExpence(id, sum) {
        await apiService.updateExpenceById(id, sum).then(setTimeout(fetchExpences, 2000));
    }
    async removeExpence(id) {
        await apiService.deleteExpenceById(id).then(setTimeout(fetchExpences, 2000));
    }
    //Incomings
    async loadIncomings() {
        fetchIncomings();
    }
    async addIncoming(sum) {
        await apiService.createIncoming(sum).then(setTimeout(fetchIncomings, 2000));
    }
    async updateIncoming(id, sum) {
        await apiService.updateIncomingById(id, sum).then(setTimeout(fetchIncomings, 2000));
    }
    async removeIncoming(id) {
        await apiService.deleteIncomingById(id).then(setTimeout(fetchIncomings, 2000));
    }
    async fetchAllOperations(el) {
        const incomings = await apiService.fetchIncomings().then(fbData => {
            if (fbData) {
                return TransformService.fbObjectToArray(fbData);
            } else return [];
        })
        const expences = await apiService.fetchExpences().then(fbData => {
            if (fbData) {
                return TransformService.fbObjectToArray(fbData);
            } else return [];
        });
        let sortedops = incomings.concat(expences).sort(function(a, b) {
            var c = new Date(a.date);
            var d = new Date(b.date);
            return c-d;
        });
        const html = sortedops.map(op => renderData(op));
        el.insertAdjacentHTML('afterbegin', html.join(' '));
    }
}

async function fetchExpences() {
    expencesList.innerHTML='';
    await apiService.fetchExpences().then(fbData => {
        if (fbData) {
            const expences = TransformService.fbObjectToArray(fbData);
            const html = expences.map(expence => renderData(expence));
            expencesList.insertAdjacentHTML('afterbegin', html.join(' '));
        }
    })
}

async function fetchIncomings() {
    incomingsList.innerHTML='';
    await apiService.fetchIncomings().then(fbData => {
        if (fbData) {
            const incomings = TransformService.fbObjectToArray(fbData);
            const html = incomings.map(incoming => renderData(incoming));
            incomingsList.insertAdjacentHTML('afterbegin', html.join(' '));
        }
    })
}

function renderData(data) {
    if (data) {
        return `
            <div class="expences-list-item ${data.operation}">
                <div class="expences-list-item-info">
                    <div class="expences-list-item-info-item">
                        <div class="expences-list-item__icon">
                            <span><i class="${data.categoryClass}"></i></span>
                        </div>
                        <div class="expences-list-item-text">
                            <div class="expences-list-item-text_cat">${data.category}</div>
                            <div class="expences-list-item__date"> ${data.date}</div>
                        </div>    
                    </div>
                    <div class="expences-list-item__sum">
                        <span>${data.expenceSum} <span>UAH</span></span>
                        <button class="btn btn-secondary js-edit-expence" data-id="${data.id}"><i class="fas fa-pen" style="pointer-events:none"></i></button>
                    </div>
                </div>
                <div class="expences-list-item__note">${data?.expenceNote}</div>
            </div>
        `
    }
}

export const dataHandler = new DataHandlerService(); 