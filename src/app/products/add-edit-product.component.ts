import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, ProductService } from '@app/_services';

@Component({ templateUrl: 'add-edit-product.component.html' })
export class AddEditProductComponent implements OnInit {
    form!: FormGroup;
    id?: string;
    title!: string;
    loading = false;
    submitting = false;
    submitted = false;
    url?:any = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private alertService: AlertService
    ) {
    }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        // form with validation rules
        this.form = this.formBuilder.group({
            productname: ['', Validators.required],
            productcategory: ['', Validators.required],
            producdescription: ['', Validators.required],
            additionaldescription: ['', Validators.required],
            comments: ['', Validators.required],
            productType: ['', Validators.required],
            productImage: [''],
            price:[0,Validators.min(1)]
        });

        this.title = 'Add Product';
        if (this.id) {
            // edit mode
            this.title = 'Edit User';
            this.loading = true;
            this.productService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                    this.loading = false;
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        // if (this.form.invalid) {
        //     return;
        // }

        this.submitting = true;
        this.saveProduct()
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Product saved', { keepAfterRouteChange: true });
                    this.router.navigateByUrl('/products');
                },
                // error: error => {
                //     this.alertService.error(error);
                //     this.submitting = false;
                // }
            })
    }

    private saveProduct() {
      let r = 1;
        // create or update user based on id param
        return this.id
            ? this.productService.updateProduct(this.id!, this.form.value)
            : this.productService.addProduct(this.form.value);
    }


    onSelectFile(event:any) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event:any) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        }
      }
    }
    }
