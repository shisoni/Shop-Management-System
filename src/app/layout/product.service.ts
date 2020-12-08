import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from './product';
import { Customer} from './customer';

@Injectable()
export class ProductService {

    //private API_URL = 'http://13.235.209.203:3000';
    private localAPI_URL = 'http://localhost:8080';
    
    constructor(private http: HttpClient) {     
    }
    
    getProducts() {
        
        return this.http.get<any>(this.localAPI_URL + '/api/getProducts/');
        //toPromise().then(res => <Product[]>res.data)
        //.then(data => { return data; });
        //.map((response : Response) => response.json());        
    }


    getCustomers(){
        return this.http.get<any>(this.localAPI_URL + '/api/getCustomers/');
    }
    saveProduct(product: Product) {     
        return this.http.post(this.localAPI_URL + '/api/saveProduct/',product).subscribe(data=>{});
    }

    saveCustomer(customer: Customer) {     
        return this.http.post(this.localAPI_URL + '/api/saveCustomer/',customer).subscribe(data=>{});
    }

    getAllProductNames(){
        return this.http.get<any>(this.localAPI_URL + '/api/getAllProductsNames/');
    }

    
}