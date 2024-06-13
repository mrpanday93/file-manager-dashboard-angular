import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FileService } from '../../../services/file/file.service';
export interface file {
  id: number;
  title: string;
  stared: boolean;
  archived: boolean;
  createdAt: Date;
}
import moment from 'moment';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.scss',
})
export class FileManagerComponent {
  displayedColumns: string[] = ['id', 'title', 'stared', 'archived', 'createdAt', 'actions'];
  fileData: file[] = [];
  dataSource = new MatTableDataSource<file>(this.fileData);
  loading = false;
  errorMessage = '';
  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  constructor(private fileSrvc: FileService) {
    this.fetchFiles();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchFiles(): void {
    this.errorMessage = "";
    this.loading = true;
    this.fileSrvc.fetchFiles().subscribe({
      next: (v: any) => {
        if (v.length) {
          this.fileData = v.map((file: any) => ({
              createdAt: moment(file.createdAt.date).format('MMM d , YYYY hh:mm:ss'),
              id: file.id,
              title: file.title?? "",
              stared: file.stared ? true : false,
              archived: file.archived ? true : false,            
            })
          );
  
          this.dataSource = new MatTableDataSource<file>(this.fileData);
        } else {
          this.errorMessage = "No Records Found. Please add files to view.";
        }
        this.loading = false;
      },
      error: (e: any) => {
       console.log(e)
        this.loading = false;
        this.errorMessage = e.error.message;
      },
    })
  }

  updateFile (id: number, type: string, value: boolean) {
    this.loading = true;
    this.errorMessage = "";
    this.fileSrvc.updateFileById(id, type, value).subscribe({
      next: (v: any) => {
        this.fetchFiles();
      },
      error: (e: any) => {
       console.log(e)
        this.loading = false;
        this.errorMessage = e.error.message;
      },
    })
  }

}
