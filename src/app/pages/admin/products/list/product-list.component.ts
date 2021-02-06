import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

import {IProduct, ProductService} from '../../../../services/product.service';
import {MatDialog} from '@angular/material/dialog';
import {AddOrUpdateComponent} from '../add-or-update/add-or-update.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IUser, UserService} from '../../../../services/user.service';
import {ROLES} from '../../../../helpers/constants';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.component.html',
  styles: [':host{ width: 100% }']
})

export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'image', 'quantity', 'tags', 'status', 'datesToActive', 'actions'];
  dataSource: MatTableDataSource<IProduct>;
  user: IUser;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService,
              private userService: UserService,
              private snack: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.user = this.userService.getLoggedInUser();
  }

  getProducts(): void {
    this.productService.getAll()
      .subscribe((res) => {

        if (this.user.role === ROLES.ADMIN) {
          this.dataSource = new MatTableDataSource(res);
        } else {
          const filteredProducts = res.filter(product => product.createdBy === this.user.id);
          this.dataSource = new MatTableDataSource(filteredProducts);
        }


        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  doCreateProduct(): void {
    const ref = this.dialog.open(AddOrUpdateComponent);

    ref.afterClosed().subscribe(result => {
      if (result) {
        this.createProduct(result);
      }
    });
  }

  createProduct(payload): void {
    this.productService.create(payload)
      .subscribe(res => {
        this.snack.open('Product Created', 'OKAY', {duration: 2000});
        this.getProducts();
      });
  }

  doDeleteProduct(id): void {
    this.productService.destroy(id)
      .subscribe(res => {
        this.snack.open('Product Deleted', 'OKAY', {duration: 2000});
        this.getProducts();
      });
  }
}
