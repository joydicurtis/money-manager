import { Component } from "../core/component";

export class NavigationComponent extends Component {
    constructor(id) {
        super(id);
        this.tabs = []
    }

    init() {
        this.$el.addEventListener('click', tabClickHandler.bind(this));
    }

    registerTabs(tabs) {
        this.tabs = tabs;
    }
}

function tabClickHandler(event) {
    event.preventDefault();
    if (event.target.classList.contains('tabs-item')) {
        Array.from(this.$el.querySelectorAll('.tabs-item')).forEach(tab => {
            tab.classList.remove('tabs-item_active')
        })
        event.target.classList.add('tabs-item_active');
        const activeTab = this.tabs.find(t => t.name === event.target.dataset.name);
        this.tabs.forEach(tab => tab.component.hide());
        activeTab.component.show();
    }
}