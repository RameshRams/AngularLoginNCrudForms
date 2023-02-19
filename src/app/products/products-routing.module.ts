import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { ListProductComponent } from './list-product.component';
import { AddEditProductComponent } from './add-edit-product.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: ListProductComponent },
            { path: 'add', component: AddEditProductComponent },
            { path: 'edit/:id', component: AddEditProductComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }
