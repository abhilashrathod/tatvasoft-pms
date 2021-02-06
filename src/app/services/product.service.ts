import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {Observable} from 'rxjs';

export const PRODUCT_STORE = 'products';

export interface IProduct {
  id: string;
  createdBy: string;
  title: string;
  description: string;
  image: string;
  quantity: number | string;
  tags: Array<string>;
  status: boolean;
  datesToActive: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private dbService: NgxIndexedDBService) {
  }

  create(payload: IProduct): Observable<any> {
    return this.dbService.add(PRODUCT_STORE, payload);
  }

  getAll(): Observable<any> {
    return this.dbService.getAll(PRODUCT_STORE);
  }

  getById(id): Observable<any> {
    return this.dbService.getByKey(PRODUCT_STORE, id);
  }

  update(payload): Observable<any> {
    return this.dbService.update(PRODUCT_STORE, payload);
  }

  destroy(id): Observable<any> {
    return this.dbService.delete(PRODUCT_STORE, id);
  }
}
