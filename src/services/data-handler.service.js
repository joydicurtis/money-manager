import { apiService } from "./api.service";
import { TransformService } from "./transform.service";
import { LoaderComponent } from "../components/loader.component";
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
        const incomings = TransformService.fbObjectToArray(fbData);
        const html = incomings.map(incoming => renderIncData(incoming));
        incomingsList.insertAdjacentHTML('afterbegin', html.join(' '));
    })
}

function renderData(data) {
    if (data) {
        return `
            <div class="expences-list-item"><i class="fas fa-user"></i> ${data.expenceSum}   ${data.category}    ${data?.expenceNote}    ${data.date}</div><button class="btn btn-secondary js-edit-expence" data-id="${data.id}">Edit</button>
        `
    }
}

function renderIncData(data) {
    if (data) {
        return `
            <div class="expences-list-item"><i class="fas fa-user"></i> ${data.incomingSum}   ${data.inccategory}    ${data?.incomingNote}    ${data.date}</div><button class="btn btn-secondary js-edit-incomings" data-id="${data.id}">Edit</button>
        `
    }
}

export const dataHandler = new DataHandlerService(); 