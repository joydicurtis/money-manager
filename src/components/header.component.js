import { Component } from '../core/component';
import { apiService } from "../services/api.service";
import { TransformService } from "../services/transform.service";
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export class HeaderComponent extends Component{
    constructor(id) {
        super(id);
    }

    async init() {
        const ctx = document.getElementById('myChart');
        let exdata = await apiService.fetchExpences();
        let expences = TransformService.fbObjectToArray(exdata);
        let indata = await apiService.fetchIncomings();
        let incomings = TransformService.fbObjectToArray(indata);
        var exresult = expences.reduce(function(_this, val) {
            return _this + Number(val.expenceSum)
        }, 0);
        var inresult = incomings.reduce(function(_this, val) {
            return _this + Number(val.incomingSum)
        }, 0);
        const container = this.$el.querySelector('#header-container');
        let html = `
        <div>
            <span>Incomings</span>
            <div class="incomings">
                ${inresult}
            </div>
            <span>Expenses</span>
            <div class="expenses">
                ${exresult}
            </div>
        </div>
        `
        container.insertAdjacentHTML('afterbegin', html);
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Expenses', 'Incomings'],
                datasets: [{
                    data: [exresult, inresult],
                    backgroundColor: [
                        '#e57373',
                        '#4db6ac'
                    ],
                    borderColor: [
                        '000',
                        '000'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    y: {
                        display: false
                    }
                },
                cutout: 70
            }
        });
    }
}