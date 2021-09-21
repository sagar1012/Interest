import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InterestComponent } from './interest/interest.component';

const routes: Routes = [
  { path: '', redirectTo: '/interest', pathMatch: "full" },
  {
    path: '',
    component: InterestComponent,
    children: [
      {
        path: 'interest',
        loadChildren: () => import('./interest/interest.module').then(m => m.InterestModule),
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
