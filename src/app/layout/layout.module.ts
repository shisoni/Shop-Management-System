import { CommonModule,CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule,TabViewModule,ToastModule,ToolbarModule,FileUploadModule,TableModule,DialogModule,ConfirmDialogModule} from 'primeng';



@NgModule({
    imports: [CommonModule,DropdownModule,LayoutRoutingModule,ReactiveFormsModule, TabViewModule,FormsModule,ConfirmDialogModule,DialogModule,TableModule,ToastModule,ToolbarModule,FileUploadModule],
    declarations: [LayoutComponent]
})
export class LayoutModule {}
