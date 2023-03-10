import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DeleteClientPopUpComponent } from 'src/app/delete-client-pop-up/delete-client-pop-up.component';
import { DialogClientComponent } from 'src/app/dialog-client/dialog-client.component';
import { SwallService } from 'src/app/swallService/swall.service';
import { Client } from '../Models/clients/client';
import { ClientService } from '../Models/clients/client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'mobile','action'];
  dataSource!: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  clients : Client[] = [];
  loading!: boolean;


  constructor(private clientService:ClientService,
    private router: Router,
    private dialog: MatDialog,
    private swallService: SwallService,

){}
  ngOnInit(): void {
    this.getClients();  }

  getClients(){
    this.loading=true;
    this.clientService.getClientsList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.clients = res!;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
    })
  }

  editClient(row:any){
    this.dialog.open(DialogClientComponent,{
      width:'30%',
      height:'63%',
      data:row
    })
  }
  openDeleteClientPopUp(row:any){ {
    this.dialog.open(DeleteClientPopUpComponent, {
     width:'32%',
     height:'16%',
     data: row.idClient
     
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
  openClientDialog() {
    this.dialog.open(DialogClientComponent, {
     width:'30%',
     height:'63%',
    });
  }
  importClients(){
    this.clientService.importClients()
    .subscribe({
      next: (res) => {
      
      
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