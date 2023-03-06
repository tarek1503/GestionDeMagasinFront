import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../shared/product/product';
import { ProductService } from '../shared/product/product.service';

import { SwallService } from '../swallService/swall.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
   
  productForm!: FormGroup;
  product! : Product;
  actionBtn : string = "Ajouter"
  titre : string = "Ajouter un Produit"
  constructor(
    private formBuilder : FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    private productService:ProductService,
    private router: Router,
    private swallService: SwallService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ){}
  ngOnInit(): void {
    this.CreateProductForm();
   if(this.editData){
    this.actionBtn = "Modifier";
    this.titre = "Modifier un Produit";

this.productForm.controls['name'].setValue(this.editData.name);
this.productForm.controls['prix'].setValue(this.editData.prix);
this.productForm.controls['description'].setValue(this.editData.description);
this.productForm.controls['quantiteStock'].setValue(this.editData.quantiteStock);

};

  }

  CreateProductForm(){

    this.productForm = this.formBuilder.group({ 
      name : ["",Validators.required],
      prix : ["",Validators.required],
      description : ["",Validators.required],
      quantiteStock : ["",Validators.required]
  })
  }
  addProduct(){
    
   if (!this.editData){
    if(this.productForm.valid){

      this.productService.CreateProduct(this.productForm.value)
      .subscribe({
        next: (res) => {
          this.productForm.reset();
          this.swallService.success(
            "Produit ajouté !",
            "Le Produit a été ajouté avec succès",
            "success"
          );
          this.dialogRef.close("save");
         this.goToProductList();
        },
        error: (err) => {
          this.swallService.problem(err);
        },
      });

    }
   
    
   }else{
    this.updateProduct();

   }
}
updateProduct(){
  console.log(this.editData)
this.productService.PutProduct({idProduct:this.editData.idProduct,...this.productForm.value}).subscribe({
  next: (res) => {
    this.swallService.success(
      "Produit modifié !",
      "Le Produit a été modifié avec succès",
      "success"
    );
    this.productForm.reset();
    this.dialogRef.close("update");
    this.goToProductList();
  },
  error: (err) => {
    this.swallService.problem(err);
  },
});

}
goToProductList(){
  this.router.navigate(['/products'])
  .then(() => {
    window.location.reload();
  });
}
}
