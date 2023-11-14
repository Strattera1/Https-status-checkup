import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from '../app.module';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../shared/material.module';
import { CatalogService } from './catalog.service';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AppModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule
    
  ],
  providers: [
    CatalogService
  ]
})
export class CatalogModule { }
