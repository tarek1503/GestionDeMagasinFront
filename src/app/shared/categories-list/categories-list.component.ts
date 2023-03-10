import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteCategoryPopUpComponent } from 'src/app/delete-category-pop-up/delete-category-pop-up.component';
import { DialogCategoryComponent } from 'src/app/dialog-category/dialog-category.component';
import { SwallService } from 'src/app/swallService/swall.service';
import { Category } from '../Models/category/category';
import { CategoryService } from '../Models/category/category.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  displayedColumns: string[] = ['name','action'];
  dataSource!: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  categories : Category[] = [];
  loading!: boolean;
  constructor(private categoryService:CategoryService,
    private router: Router,
    private dialog: MatDialog,
    private swallService: SwallService,

){}
  ngOnInit(): void {
this.getCategories()
  }
  getCategories(){
    this.loading=true;
    this.categoryService.getCategoriesList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.categories = res!;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    })
  }

  editCategory(row:any){
    this.dialog.open(DialogCategoryComponent,{
      width:'30%',
      height:'63%',
      data:row
    })
  }
  openDeleteCategoryPopUp(row:any){ {
    this.dialog.open(DeleteCategoryPopUpComponent, {
     width:'32%',
     height:'16%',
     data: row.idCategory
     
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
  openCategoryDialog() {
    this.dialog.open(DialogCategoryComponent, {
     width:'30%',
     height:'35%',
    });
  }
  


goToCategoryList(){
  this.router.navigate(['/categories'])
  .then(() => {
    window.location.reload();
  });
}
}
