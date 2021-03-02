import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ViewComponent} from './view/view.component';
import {AddComponent} from './add/add.component';
import {SignInComponent} from './sign-in/sign-in.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  { path: 'view', component: ViewComponent },
  { path: 'add', component: AddComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'admin', component: AdminComponent }, // protected, redirect to sign-in
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
