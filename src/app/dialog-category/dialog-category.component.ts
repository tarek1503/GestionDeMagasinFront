import { Component ,Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogClientComponent } from '../dialog-client/dialog-client.component';
import { Category } from '../shared/Models/category/category';
import { CategoryService } from '../shared/Models/category/category.service';
import { SwallService } from '../swallService/swall.service';

@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit{
  categoryForm!: FormGroup;
  category! : Category;
  actionBtn : string = "Ajouter"
  titre : string = "Ajouter une Catégorie"
  constructor(
    private formBuilder : FormBuilder,
    private dialogRef: MatDialogRef<DialogClientComponent>,
    private categoryService:CategoryService,
    private router: Router,
    private swallService: SwallService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ){}
  ngOnInit(): void {
    this.CreateCategoryForm();
    if(this.editData){
     this.actionBtn = "Modifier";
     this.titre = "Modifier une Catégorie";
 
 this.categoryForm.controls['name'].setValue(this.editData.name);
 
 
 };  }

 CreateCategoryForm(){

  this.categoryForm = this.formBuilder.group({ 
    name : ["",Validators.required],
  
})
}
addCategory(){
  
 if (!this.editData){
  if(this.categoryForm.valid){

    this.categoryService.CreateCategory(this.categoryForm.value)
    .subscribe({
      next: (res) => {
        this.categoryForm.reset();
        this.swallService.success(
          "Categorie ajoutée !",
          "La Catégorie a été ajoutée avec succès",
          "success"
        );
        this.dialogRef.close("save");
       this.goToCategoryList();
      },
      error: (err) => {
        this.swallService.problem(err);
      },
    });

  }
 
  
 }else{
  this.updateCategory();

 }
}
updateCategory(){
console.log(this.editData)
this.categoryService.PutCategory({...this.categoryForm.value},this.editData.id).subscribe({
next: (res) => {
  this.swallService.success(
    "Categorie modifiée !",
    "La Catégorie a été modifiée avec succès",
    "success"
  );
  this.categoryForm.reset();
  this.dialogRef.close("update");
  this.goToCategoryList();
},
error: (err) => {
  this.swallService.problem(err);
},
});

}
goToCategoryList(){
this.router.navigate(['/categories'])
.then(() => {
  window.location.reload();
});
}

}
