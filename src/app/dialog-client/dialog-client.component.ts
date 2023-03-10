import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from '../shared/Models/clients/client';
import { ClientService } from '../shared/Models/clients/client.service';
import { SwallService } from '../swallService/swall.service';

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrls: ['./dialog-client.component.scss']
})
export class DialogClientComponent implements OnInit {
  clientForm!: FormGroup;
  client! : Client;
  actionBtn : string = "Ajouter"
  titre : string = "Ajouter un Client"
  constructor(
    private formBuilder : FormBuilder,
    private dialogRef: MatDialogRef<DialogClientComponent>,
    private clientService:ClientService,
    private router: Router,
    private swallService: SwallService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    ){}
  ngOnInit(): void {
    this.CreateClientForm();
   if(this.editData){
    this.actionBtn = "Modifier";
    this.titre = "Modifier un Client";

this.clientForm.controls['firstName'].setValue(this.editData.firstName);
this.clientForm.controls['lastName'].setValue(this.editData.lastName);
this.clientForm.controls['mobile'].setValue(this.editData.mobile);

};
  }
  
  CreateClientForm(){

    this.clientForm = this.formBuilder.group({ 
      firstName : ["",Validators.required],
      lastName : ["",Validators.required],
      mobile : ["",Validators.required],
  })
  }
  addClient(){
    
   if (!this.editData){
    if(this.clientForm.valid){

      this.clientService.CreateClient(this.clientForm.value)
      .subscribe({
        next: (res) => {
          this.clientForm.reset();
          this.swallService.success(
            "Client ajouté !",
            "Le Client a été ajouté avec succès",
            "success"
          );
          this.dialogRef.close("save");
         this.goToClientList();
        },
        error: (err) => {
          this.swallService.problem(err);
        },
      });

    }
   
    
   }else{
    this.updateClient();

   }
}
updateClient(){
  console.log(this.editData)
this.clientService.PutClient({idClient:this.editData.idClient,...this.clientForm.value}).subscribe({
  next: (res) => {
    this.swallService.success(
      "Client modifié !",
      "Le Client a été modifié avec succès",
      "success"
    );
    this.clientForm.reset();
    this.dialogRef.close("update");
    this.goToClientList();
  },
  error: (err) => {
    this.swallService.problem(err);
  },
});

}
goToClientList(){
  this.router.navigate(['/clients'])
  .then(() => {
    window.location.reload();
  });
}
}
