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
  lastUpdate: string;
}

const ELEMENT_DATA: StudyElement[] = [
  { idStudy: '1', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '1' },
  { idStudy: '2', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '2' },
  { idStudy: '3', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '4', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '5', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '6', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '7', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '5' },
  { idStudy: '8', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '9', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '10', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },

  { idStudy: '11', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '12', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '13', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '14', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '6' },
  { idStudy: '15', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '16', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '17', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '7' },
  { idStudy: '18', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
  { idStudy: '19', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '8' },
  { idStudy: '20', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', isBurned: true, patientId: '56465654645' },
];

const ELEMENT_DATA2: StudyElement2[] = [
  { idStudy: '1', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '1', lastUpdate: '0211109T202949' },
  { idStudy: '2', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645', lastUpdate: '10/10/2021' },
  { idStudy: '3', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645', lastUpdate: '10/10/2021' },
  { idStudy: '4', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '2', lastUpdate: '10/10/2021' },
  { idStudy: '5', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645', lastUpdate: '10/10/2021' },
  { idStudy: '6', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '3' , lastUpdate: '10/10/2021'},
  { idStudy: '7', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '4' , lastUpdate: '10/10/2021'},
  { idStudy: '8', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '5' , lastUpdate: '10/10/2021'},
  { idStudy: '9', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' , lastUpdate: '10/10/2021'},
  { idStudy: '10', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '56465654645' , lastUpdate: '10/10/2021'},
  { idStudy: '11', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '6' , lastUpdate: '10/10/2021'},
  { idStudy: '12', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '7' , lastUpdate: '10/10/2021'},
  { idStudy: '13', studyDescription: 'Patologias varias', patientName: 'Alfredo Cañizales', patientId: '8' , lastUpdate: '10/10/2021'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['patientId', 'studyDescription', 'patientName', 'options'];
  displayedColumns2: string[] = ['patientId', 'studyDescription', 'patientName', 'lastUpdate', 'options'];
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

  ngAfterViewInit(): void {
/*     this.dataSource = new MatTableDataSource<StudyElement>(ELEMENT_DATA);
     this.resultsLength = this.dataSource.data.length;
     this.dataSource.paginator = this.paginator ? this.paginator : null;
     this.dataSource.filterPredicate = this.createFilter();

     this.dataSource2 = new MatTableDataSource<StudyElement2>(ELEMENT_DATA2);
     this.resultsLength2 = this.dataSource2.data.length;
     this.dataSource2.paginator = this.paginator2 ? this.paginator2 : null;
     this.dataSource2.filterPredicate = this.createFilter2();

     console.log(new Date('0211109T202949'));*/

    // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
     this.getList();
     this.getCompleteList();
  }

  getList(): void {
    this.appService.getFailStudies().subscribe(x => {
      this.dataSource = new MatTableDataSource<StudyElement>(x);
      this.resultsLength = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator ? this.paginator : null;
      this.dataSource.filterPredicate = this.createFilter();
      setTimeout(() => {
        this.getList();
      }, 100000);
    });
  }

  getCompleteList(): void {
    this.appService.getAllStudies().subscribe(x => {
      if (x && x.length > 0) {
        const newData: any[] = [];
        x.forEach((study: any) => {
          newData.push(
            {
              idStudy: study.ID,
              studyDescription:  study.MainDicomTags.StudyDescription,
              patientName:  study.PatientMainDicomTags.PatientName,
              patientId: study.PatientMainDicomTags.PatientID,
              lastUpdate: new Date(study.LastUpdate).toLocaleDateString(),
            }
          );
        } );
        this.dataSource2 = new MatTableDataSource<StudyElement2>(newData);
        this.resultsLength2 = this.dataSource2.data.length;
        this.dataSource2.paginator = this.paginator2 ? this.paginator2 : null;
        this.dataSource2.filterPredicate = this.createFilter2();
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
  searchChanged(event: any): void {
    this.dataSource.filter = event.target.value;
  }
  searchChangeddataSource2(event: any): void {
    this.dataSource2.filter = event.target.value;
  }

  private createFilter(): (study: StudyElement, filter: string) => boolean {
    const filterFunction = (study: StudyElement, filter: any): boolean => {
      const searchTerms = filter.toString().toLowerCase();

      return study.studyDescription.toLowerCase().indexOf(searchTerms) !== -1
        || study.patientId.toLowerCase().indexOf(searchTerms) !== -1
        || study.patientName.toLowerCase().indexOf(searchTerms) !== -1;
    };
    return filterFunction;
  }
  private createFilter2(): (study: StudyElement2, filter: string) => boolean {
    const filterFunction = (study: StudyElement2, filter: any): boolean => {
      const searchTerms = filter.toString().toLowerCase();

      return study.studyDescription.toLowerCase().indexOf(searchTerms) !== -1
        || study.patientId.toLowerCase().indexOf(searchTerms) !== -1
        || study.patientName.toLowerCase().indexOf(searchTerms) !== -1;
    };
    return filterFunction;
  }
}
