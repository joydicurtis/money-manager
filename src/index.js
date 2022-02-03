import { HeaderComponent } from "./components/header.component";
import { NavigationComponent } from "./components/navigation.component";
import { ExpencesComponent } from "./components/expences.component";
import { IncomingsComponent } from "./components/incomings.component";
import { IncDialogComponent } from "./components/inc-dialog.component";
import { DialogSumComponent } from "./components/dialog-sum.component";
import { ExpenceFormComponent } from "./components/expence-form.component";
import { LoaderComponent } from "./components/loader.component";
import { ExpencesListComponent } from "./components/expences-list.component";
//import { CategoriesComponent } from "./components/categories.component";
import '@fortawesome/fontawesome-free/js/all.js';
export const expencesList = document.getElementById('expences-list');
export const incomingsList = document.getElementById('incomings-list');
const sumDialog = new DialogSumComponent('sum-e-dialog');
const incDialog = new IncDialogComponent('sum-i-dialog');
const header = new HeaderComponent('header');
const navigation = new NavigationComponent('navigation');
const loader = new LoaderComponent('loader');
const incomings = new IncomingsComponent('incomings', {loader}, {incDialog}, incomingsList);
//const categories = new CategoriesComponent('categories');
const expences = new ExpencesComponent('expences', {loader}, {sumDialog}, expencesList);
//const expenceForm = new ExpenceFormComponent('expence-create', {loader}, {sumDialog}, {expencesList});

navigation.registerTabs([
    { name: 'incomings', component: incomings},
    { name: 'expences', component: expences},
    
]);

sumDialog.registerDialog([
    { name: 'sum-dialog', component: sumDialog } 
]);

incDialog.registerIncDialog([
    { name: 'inc-dialog', component: incDialog}
]);