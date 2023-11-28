import { NgModule } from "@angular/core";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";

const EXPORT_MODULES = [
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    MatTabsModule,
    MatButtonModule 
  ];
  
  @NgModule({
    imports: EXPORT_MODULES,
    exports: EXPORT_MODULES,
    declarations: [],
    providers: []
  })
  export class MaterialModule {}