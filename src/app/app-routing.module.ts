import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ViewComponent} from './view/view.component';
import {AddComponent} from './add/add.component';

const routes: Routes = [
  { path: '', redirectTo: '/view', pathMatch: 'full' },
  // { path: 'stream', component: StreamComponent },
  { path: 'view', component: ViewComponent },
  { path: 'add', component: AddComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
