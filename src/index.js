import { HeaderComponent } from "./components/header.component";
import { NavigationComponent } from "./components/navigation.component";
import { ExpencesComponent } from "./components/expences";
import { IncomingsComponent } from "./components/incomings";
import { dialogSumComponent } from "./components/dialog-sum";
import { ExpenceFormComponent } from "./components/expence-form";

import './scss/application.scss';
 
const header = new HeaderComponent('header');
const navigation = new NavigationComponent('navigation');
const expences = new ExpencesComponent('expences');
const incomings = new IncomingsComponent('invoices');
const sumDialog = new dialogSumComponent('sum-dialog');
const expenceForm = new ExpenceFormComponent('expence-create');

navigation.registerTabs([
    { name: 'expences', component: expences},
    { name: 'incomings', component: incomings}
]);

expences.registerDialog([
    { name: 'sum-dialog', component: sumDialog}
]);

sumDialog.registerDialog([
    { name: 'sum-dialog', component: sumDialog}
])