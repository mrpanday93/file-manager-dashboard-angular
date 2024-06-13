import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileService } from '../../../services/file/file.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrl: './view-file.component.scss',
})
export class ViewfileComponent implements AfterViewInit {
  columnsToDisplay: string[] = [];
  fileData: any = [];
  loading: boolean = true;
  errorMessage: string = '';
  dataSource = new MatTableDataSource<any>(this.fileData);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fileSrvc: FileService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');

      if (!id) {
        this.router.navigateByUrl('/admin/file-manager');
      } else {
        this.fetchFile(parseInt(id));
      }
    });
  }
  ngAfterViewInit() {}

  fetchFile(id: number) {
    this.fileSrvc.fetchFileById(id).subscribe((data) => {});

    this.fileSrvc.fetchFileById(id).subscribe({
      next: (data: any) => {
        this.loading = false;
        this.columnsToDisplay = Object.keys(data[0]);
        this.dataSource = new MatTableDataSource<any>(data);
      },
      error: (e: any) => {
        this.loading = false;
        this.errorMessage = e.error.message;

        setTimeout(() => {
          this.router.navigateByUrl('/admin/file-manager');
        }, 1000);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
