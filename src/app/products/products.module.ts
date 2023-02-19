import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './products-routing.module';
import { LayoutComponent } from './layout.component';
import { ListProductComponent } from './list-product.component';
import { AddEditProductComponent } from './add-edit-product.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ListProductComponent,
        AddEditProductComponent
    ]
})
export class ProductsModule { }
