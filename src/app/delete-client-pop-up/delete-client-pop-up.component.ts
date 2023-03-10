import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientService } from '../shared/Models/clients/client.service';
import { SwallService } from '../swallService/swall.service';

@Component({
  selector: 'app-delete-client-pop-up',
  templateUrl: './delete-client-pop-up.component.html',
  styleUrls: ['./delete-client-pop-up.component.scss']
})
export class DeleteClientPopUpComponent {
  constructor(    private dialogRef: MatDialogRef<DeleteClientPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public dataa: any,
   private clientService:ClientService,   
    private swallService: SwallService,
    private router: Router,
  
   ){}
   confirmDelete() {
    console.log(this.dataa);
    this.clientService
      .deleteClient(this.dataa)
      .subscribe({
        next: (error) => {
          this.swallService.problem(error);
          this.dialogRef.close("deleted");
        },
        error: (res) => {
          this.swallService.success(
           " Client a été supprimé avec succès !",
            "Client supprimé",
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
    this.router.navigate(['/clients'])
    .then(() => {
      window.location.reload();
    });
  }
}
