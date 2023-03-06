import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../shared/product/product.service';
import { SwallService } from '../swallService/swall.service';

@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.scss']
})
export class DeletePopUpComponent {
 constructor(    private dialogRef: MatDialogRef<DeletePopUpComponent>,
  @Inject(MAT_DIALOG_DATA) public dataa: any,
 private productService:ProductService,   
  private swallService: SwallService,
  private router: Router,

 ){}
 confirmDelete() {
  console.log(this.dataa);
  this.productService
    .deleteProduct(this.dataa)
    .subscribe({
      next: (error) => {
        this.swallService.problem(error);
        this.dialogRef.close("deleted");
      },
      error: (res) => {
        this.swallService.success(
         " Produit a été supprimé avec succès !",
          "Produit supprimé",
          "success"
        );
        this.dialogRef.close("deleted");
        this.goToProductList()
      },
    });
}
cancel() {
  this.dialogRef.close("cancelled");
}

goToProductList(){
  this.router.navigate(['/products'])
  .then(() => {
    window.location.reload();
  });
}
}
