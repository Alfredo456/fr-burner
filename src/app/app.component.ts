import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
  patientId: string;
}

export interface StudyElement2 {
  idStudy: string;
  studyDescription: string;
  patientName: string;
  patientId: string;
}

const ELEMENT_DATA: StudyElement[] = [
  { idStudy: '1', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '2', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '3', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '4', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '5', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '6', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '7', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '8', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '9', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '10', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },

  { idStudy: '11', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '12', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '13', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '14', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '15', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '16', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '17', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '18', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '19', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '20', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
];

const ELEMENT_DATA2: StudyElement2[] = [
  { idStudy: '1', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '2', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '3', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '4', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '5', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '6', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '7', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '8', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '9', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '10', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '11', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '12', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
  { idStudy: '13', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['patientId','studyDescription', 'patientName', 'options'];
  displayedColumns2: string[] = ['patientId', 'studyDescription', 'patientName', 'options'];
  dataSource = new MatTableDataSource<StudyElement>();
  dataSource2 = new MatTableDataSource<StudyElement2>();
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
    // @ts-ignore
  @ViewChild('paginator1') paginator: MatPaginator;
      // @ts-ignore
  @ViewChild('paginator2') paginator2: MatPaginator;
  resultsLength: number;
  resultsLength2: number;

  constructor(public dialog: MatDialog, private appService: AppService) {
    this.resultsLength = 0;
    this.resultsLength2 = 0;
    // this.paginator = new MatPaginator();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.dataSource = new MatTableDataSource<StudyElement>(ELEMENT_DATA);
    // this.resultsLength = this.dataSource.data.length;
    // this.dataSource.paginator = this.paginator ? this.paginator : null;

    // this.dataSource2 = new MatTableDataSource<StudyElement2>(ELEMENT_DATA2);
    // this.resultsLength2 = this.dataSource2.data.length;
    // this.dataSource2.paginator = this.paginator2 ? this.paginator2 : null;

    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.getList();
    this.getCompleteList();
  }

  getList(): void {
    this.appService.getFailStudies().subscribe(x => {
      console.log(x);
      this.dataSource = new MatTableDataSource<StudyElement>(x);
      this.resultsLength = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator ? this.paginator : null;
      setTimeout(() => {
        this.getList();
      }, 100000);
    });
  }

  getCompleteList(): void {
    this.appService.getAllStudies().subscribe(x => {
      console.log(x);
      if (x && x.length > 0) {
        const newData: any[] = [];
        x.forEach((study: any) => {
          newData.push(
            {
              idStudy: study.ID,
              studyDescription:  study.MainDicomTags.StudyDescription,
              patientName:  study.PatientMainDicomTags.PatientName,
              patientId: study.PatientMainDicomTags.PatientID,
            }
          );
        } );
        this.dataSource2 = new MatTableDataSource<StudyElement2>(newData);
        this.resultsLength2 = this.dataSource2.data.length;
        this.dataSource2.paginator = this.paginator2 ? this.paginator2 : null;
      }
      setTimeout(() => {
        this.getCompleteList();
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
