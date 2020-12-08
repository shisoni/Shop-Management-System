import { Component, OnInit } from '@angular/core';
import { MessageService,ConfirmationService } from "primeng/api";
import { ProductService } from './product.service';
import {Product} from './product';
import { Customer} from './customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table} from 'primeng';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [MessageService,ProductService,ConfirmationService]
})


export class LayoutComponent implements OnInit {

  products : Product[];
  customers : Customer[];
  productDialog: boolean;
  customerDialog:boolean;
  product: Product;
  submitted:boolean;
  form: FormGroup;
  formCustomer : FormGroup;
  dt1:Table;
  dt2:Table;
  dataRefresh:any;
  setPageFlag:boolean;
  names: Product[] = [];
  selectedProducts: Product[];
  

  constructor(private messageService: MessageService,private fb: FormBuilder,private productService:ProductService,private confirmationService:ConfirmationService) { 

    this.form = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
  });

  this.formCustomer = this.fb.group({
    name: ['', Validators.required],
    amount: ['', Validators.required],
    address: ['', Validators.required],
    item_purchased: ['', Validators.required],
    transaction_date: ['', Validators.required]
});
  }

  ngOnInit(): void {
  
    this.callServices(true);
    this.refreshData();
    
   
    
       
    
  }

  refreshData(){
    this.dataRefresh = setTimeout(() => {
     
      this.callServices(false);
    }, 250); 
  }

  callServices(setPageFlag){
    this.productService.getProducts().subscribe(products => this.products = products);
    this.productService.getCustomers().subscribe(customers => this.customers = customers);
    this.productService.getAllProductNames().subscribe(names => this.names = names);
    
  }
  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
}

openNewCustomer() {
  this.customerDialog = true;
}

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}

hideCustomerDialog() {
  this.formCustomer.reset();
  this.customerDialog = false;
  
  
}

deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.products = this.products.filter(val => !this.selectedProducts.includes(val));
          this.selectedProducts = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
}


deleteProduct(product: Product) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.products = this.products.filter(val => val.name!== product.name);
          this.product = {};
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
      }
  });
}


saveProduct(){
  this.productService.saveProduct(this.form.value);
  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
  this.form.reset();
  this.refreshData();
  this.productDialog = false;
  this.products = [...this.products];
  
}

saveCustomer(){
  this.productService.saveCustomer(this.formCustomer.value);
  this.formCustomer.reset();
  this.refreshData();
  this.customerDialog = false;
  
}



}
