import { Component, EventEmitter, Output } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { FileService } from '../../../services/file/file.service';
@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrl: './add-file.component.scss',
})
export class AddFileComponent {
  csvRecords: any;
  currentFile: any;
  loading: boolean = false;
  @Output() fetchRecords = new EventEmitter();

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private fileSrvc: FileService
  ) {}
  onFileSelected(event: any) {
    this.loading = true;
    this.currentFile = event.target.files[0];
    if (this.currentFile) {
      this.ngxCsvParser
        .parse(this.currentFile, {
          header: true,
          delimiter: ',',
          encoding: 'utf8',
        })
        .pipe()
        .subscribe({
          next: (result): void => {
            this.csvRecords = result;
            this.uploadData();
          },
          error: (error: NgxCSVParserError): void => {
            console.log('Error', error);
          },
        });
    } else {
      this.loading = false;
    }
  }

  rearrangeData(data: Array<any>): Array<any> {
    let finalData: any = {};
    for (let val of Object.keys(data[0])) {
      finalData[val] = [];
    }

    for (let i = 0; i < data.length; i++) {
      let row = data[i];

      for (let key in row) {
        finalData[key].push({ value: row[key], row: i + 1 });
      }
    }

    return finalData;
  }

  uploadData(): void {
    let data = this.rearrangeData(this.csvRecords);
    const upload = this.fileSrvc
      .create({ data, title: this.currentFile.name })
      .subscribe({
        next: (v: any) => {
          this.loading = false;
          this.currentFile = '';
          this.clearFileInput('fileUpload');
          this.fetchRecords.emit();
        },
        error: (e: any) => {
          console.log(e);
        },
      });
  }

  clearFileInput(id: string) {
    var oldInput = document.getElementById(id);

    var newInput = document.createElement('input');

    if (oldInput && oldInput.parentNode) {
      newInput.type = 'file';
      newInput.id = id;
      newInput.className = oldInput.className;
      newInput.style.cssText = oldInput.style.cssText;

      oldInput.parentNode.replaceChild(newInput, oldInput);
    }
  }
}
