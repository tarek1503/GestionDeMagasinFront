import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GestionDesProduitFront';

  
  constructor(private dialog: MatDialog,private router: Router) {

  }
  goToCategories(){
    this.router.navigate(['/categories']);

  }
goToProducts(){
  this.router.navigate(['/products']);

}
goToClients(){
  this.router.navigate(['/clients']);

}

}
