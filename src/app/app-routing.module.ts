import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './modules/content/content.component';


const routes: Routes = [
  { path: "", redirectTo: "content", pathMatch: "full" },
  { path: "content", component: ContentComponent}
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
