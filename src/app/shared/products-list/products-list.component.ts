import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../Models/product/product';
import { ProductService } from '../Models/product/product.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SwallService } from 'src/app/swallService/swall.service';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { DeletePopUpComponent } from 'src/app/delete-pop-up/delete-pop-up.component';
import { CategoryService } from '../Models/category/category.service';
import { Category } from '../Models/category/category';




@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'prix', 'quantiteStock','category','action'];
  dataSource!: MatTableDataSource<Product>;
  categories?:Category[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  products : Product[] = [];
  loading!: boolean;


  constructor(private productService:ProductService,
    private router: Router,
    private dialog: MatDialog,
    private swallService: SwallService,
    private categoryService: CategoryService
    ){ }


  ngOnInit(): void {
    this.getProducts();
    console.log(this.products)
  }

   getProducts(){
    this.categoryService.getCategoriesList().subscribe(data=>{
      this.categories=data;
      console.log(this.categories)      
    })
    this.loading=true;
    this.productService.getProductsList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.products = res!;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    })
  }

  editProduct(row:any){
    this.dialog.open(DialogComponent,{
      width:'30%',
      height:'85%',
      data:row
    })
  }
  openDeletePopUp(row:any){ {
    this.dialog.open(DeletePopUpComponent, {
     width:'34%',
     height:'21%',
     data: row.idProduct
     
    });
  }

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
     width:'30%',
     height:'84%',
    });
  }

  filter(value:any){
    this.productService.getProductsByCategory(value.id).subscribe(data=>{
      this.dataSource.data=data;
    })
  }

  }
