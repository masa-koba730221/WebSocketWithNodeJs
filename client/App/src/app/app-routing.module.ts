import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopPageComponent } from './top-page/top-page.component';
import { NextPageComponent } from './next-page/next-page.component';

const routes: Routes = [
  {path: '', component: TopPageComponent},
  {path: 'next', component: NextPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
