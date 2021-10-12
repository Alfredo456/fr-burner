import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DialogContentExampleDialogComponent } from './dialogExample.component';
import {AppService} from './app.service';

export interface StudyElement {
  idStudy: string;
  studyDescription: string;
  patientName: string;
  isBurned: boolean;
}

const ELEMENT_DATA: StudyElement[] = [
  { idStudy: '1', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '2', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '3', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '4', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '5', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '6', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '7', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '8', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '9', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '10', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },

  { idStudy: '11', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '12', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '13', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '14', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '15', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '16', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '17', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '18', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '19', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
  { idStudy: '20', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['idStudy', 'studyDescription', 'patientName', 'options'];
  dataSource = new MatTableDataSource<StudyElement>();
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  resultsLength: number;

  constructor(public dialog: MatDialog, private appService: AppService) {
    this.resultsLength = 0;
    // this.paginator = new MatPaginator();
  }

  ngOnInit(): void {
    this.dataSource.data = ELEMENT_DATA;
    this.resultsLength = this.dataSource.data.length;
    this.dataSource.paginator = this.paginator ? this.paginator : null;
    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.getList();
  }

  getList(): void {
    this.appService.getAllStudies().subscribe(x => {
      console.log(x);
      setTimeout(() => {
        this.getList();
      }, 100000);
    });
  }

  openDialog(data: StudyElement): void {
    this.dialog.open(DialogContentExampleDialogComponent, {
      data,
    });
  }

  modalEmail(row: any): void {
    this.openDialog(row);
  }
  burnDisk(row: any): void {
    const payload = {
      idStudy: row.idStudy
    };
    Swal.fire({
      title: '¿Estas seguro que deseas grabar el disco?',
      text: '¡Al enviar a grabar no podras cancelar el proceso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, grabar!',
      cancelButtonText: 'No, salir',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Petición Enviada', 'Estudio en proceso de grabacion', 'success');
        this.appService.burnDisk(payload).subscribe(x => {
          Swal.fire(x.code, x.message);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El estudio no sera grabado en disco :)', 'error');
      }
    });
  }
}
