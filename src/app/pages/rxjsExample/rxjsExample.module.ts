import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxjsExampleComponent } from './rxjsExample.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

export const rxjsExampleRoutes: Routes = [
  {
    path: '',
    component: RxjsExampleComponent

  }
];

@NgModule({
  declarations: [RxjsExampleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(rxjsExampleRoutes),
    ReactiveFormsModule
  ]
})
export class RxjsExampleModule { }
