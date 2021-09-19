import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FirstScreenComponent } from './first-screen/first-screen.component';
import { SecondScreenComponent } from './second-screen/second-screen.component';

const routes: Routes = [
  {path: 'first-screen',
    children: [
      {path: '', component: FirstScreenComponent},
      {path: 'second-screen', component: SecondScreenComponent}
    ]
  },
  {path: '', redirectTo: 'first-screen', pathMatch: 'prefix'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
