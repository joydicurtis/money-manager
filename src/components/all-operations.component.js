import { Component } from "../core/component";
import { dataHandler } from "../services/data-handler.service";

export class AllOperationsComponent extends Component {
    constructor(id) {
        super(id);
    }

    async init() {
        await dataHandler.fetchAllOperations(this.$el);
    }
    async onShow() {
        await dataHandler.fetchAllOperations(this.$el);
    }
    onHide() {
        this.$el.innerHTML = '';
    }
}