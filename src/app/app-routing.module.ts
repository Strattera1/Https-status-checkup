import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';


const routes: Routes = [
  {path: 'catalog', component : CatalogComponent},
  {path: '**', redirectTo: 'catalog'}
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule

  ]
})
export class AppRoutingModule { }
