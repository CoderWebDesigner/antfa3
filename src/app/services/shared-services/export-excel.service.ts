import { Injectable } from '@angular/core';

import { Row, Table, Workbook, Worksheet } from 'exceljs';
import * as fs from 'file-saver';
import { InputType } from '../../enums/input-type';
import { ExcelDataInterface } from '../../models/shared/ExcelData';
import * as _ from 'lodash';
import * as CryptoJS from 'crypto-js';

export interface ExcelImportRes {
  worksheetName: string,
  worksheetId: string,
  data: any[]
}

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  private token: string = "0123456789123456";

  constructor() { }

  getCellFromPos(n: number) {
    const ordA = 'A'.charCodeAt(0);
    const ordZ = 'Z'.charCodeAt(0);
    const len = ordZ - ordA + 1;
    let s = "";

    while (n >= 0) {
      s = String.fromCharCode(n % len + ordA) + s;
      n = Math.floor(n / len) - 1;
    }

    return s;
  }

  exportExcel(fileName: string, excelSheet: ExcelDataInterface[]) {

    let workbook = new Workbook();
    excelSheet.forEach(excelData => {

      //Title, Header & Data
      const header = excelData.headers
      let data = excelData.data;
      const workSheetName = excelData.workSheetName;
      const workSheetId = excelData.workSheetId;

      //Create a workbook with a worksheet
      let worksheet = workbook.addWorksheet(workSheetName);

      // const enc = this.encryptUsingAES256(this.token, header);
      // const dec = this.decryptUsingAES256(this.token, enc);
      // console.log("enc", enc);
      // console.log("dec", dec);
      worksheet.addRow(header.map(it => this.encryptUsingAES256(this.token, it.key)))
      worksheet.getRow(1).hidden = true;
      worksheet.getRow(1).commit()

      let columns = []
      header.forEach(item => {
        item['filterButton'] = true
        if (columns.filter(cl => cl.name.toLowerCase() === item.name.toLowerCase()).length > 0) {
          item.name = item.name + "_" 
        }
        columns.push(item);
      })
      console.log(columns)
      data = data.map(item => {
        item = item.map((value, index) => {
          if (value != "" && excelData.editable[index]) {
            switch (excelData.type[index]) {
              case InputType.Currency:
                value = +value;
                break;
              case InputType.Date:
                value = typeof value === 'string' ? value : new Date(value).toLocaleDateString('en-US')
                break;
              case InputType.Number:
                value = +value;
                break;
              case InputType.Text:
                value = value;
                break;
              case InputType.YesNo:
                value = value === 'true' ? 'Yes' : value === 'false' ? 'No': value;
                break;
            }
            return value;
          }
          return value;
        })
        return item;
      })
      
      console.log("issue below");
      const table = worksheet.addTable({
        name: workSheetName.replace(" ", "_") + '.ID_NUM.' + workSheetId,
        ref: 'A2',
        headerRow: true,
        style: {
          showRowStripes: true,
        },
        columns,
        rows: data,
      });


      table.commit();

      worksheet.getRow(1).eachCell(cell => {
        cell.dataValidation = {
          type: 'custom',
          operator: 'equal',
          allowBlank: true,
          showInputMessage: true,
          showErrorMessage: true,
          formulae: ['=EXACT(' + cell.address + ',"' + cell.value + '")'],
          error: 'You can\'t change the value',
        };

        cell.style = {
          font: {
            color: {
              argb: 'FFFFFFFF'
            }
          }
        }
      });

      worksheet.getRow(2).eachCell(cell => {
        cell.dataValidation = {
          type: 'custom',
          operator: 'equal',
          allowBlank: true,
          showInputMessage: true,
          showErrorMessage: true,
          formulae: ['=EXACT(' + cell.address + ',"' + cell.value + '")'],
          error: 'You can\'t change the value',
        };
      });

      for (let i = 0; i < data.length; i++) {
        let row = worksheet.getRow(3 + i);
        row.eachCell((cell, number) => {
          if (excelData.editable[number - 1]) {
            switch (excelData.type[number - 1]) {
              case InputType.Currency:
                cell.dataValidation = {
                  type: 'decimal',
                  operator: 'greaterThanOrEqual',
                  allowBlank: false,
                  showInputMessage: true,
                  showErrorMessage: true,
                  formulae: [0],
                  promptTitle: 'Currency',
                  prompt: 'The value must be a positive number',
                  error: 'The value must be a positive number',
                };
                break;
              case InputType.Date:
                const fifteenYearFromNow = new Date();
                fifteenYearFromNow.setFullYear(fifteenYearFromNow.getFullYear() + 15);

                const fifteenYearFromNowString = fifteenYearFromNow.toLocaleDateString('en-US')
                const nowString = new Date().toLocaleDateString('en-US')

                cell.dataValidation = {
                  type: 'date',
                  operator: 'between',
                  allowBlank: false,
                  showInputMessage: true,
                  showErrorMessage: true,
                  formulae: [nowString, fifteenYearFromNowString],
                  promptTitle: 'Date',
                  prompt: `The value must be a date (mm/dd/yyyy) between ${nowString} and ${fifteenYearFromNowString}`,
                  error: `The value must be a date (mm/dd/yyyy) between ${nowString} and ${fifteenYearFromNowString}`,
                };
                break;
              case InputType.Number:
                cell.dataValidation = {
                  type: 'decimal',
                  operator: 'greaterThanOrEqual',
                  allowBlank: false,
                  showInputMessage: true,
                  showErrorMessage: true,
                  formulae: [0],
                  promptTitle: 'Number',
                  prompt: 'The value must be a positive number',
                  error: 'The value must be a positive number',
                };
                break;
              case InputType.Text:
                break;
              case InputType.YesNo:
                cell.dataValidation = {
                  type: 'list',
                  operator: 'equal',
                  allowBlank: false,
                  showInputMessage: true,
                  showErrorMessage: true,
                  formulae: ['"Yes,No"'],
                  promptTitle: 'YES/NO',
                  prompt: 'Yes/No values only',
                  error: 'Yes/No values only',
                };
                break;
            }
          } else {
            cell.dataValidation = {
              type: 'custom',
              operator: 'equal',
              allowBlank: false,
              showInputMessage: true,
              showErrorMessage: true,
              formulae: ['=EXACT(' + cell.address + ',"' + cell.value + '")'],
              error: 'You can\'t change the value',
            };
          }
        });
        row.commit();
      }

      for (let i = 0; i < worksheet.columns.length; i += 1) {
        let dataMax = 0;
        const column = worksheet.columns[i];
        for (let j = 2; j < column.values.length; j += 1) {
          const columnLength = ("" + (column.values[j])).length;
          if (columnLength > dataMax) {
            dataMax = columnLength;
          }
        }
        column.width = dataMax < 10 ? 10 : 20;
      }

      //Generate & Save Excel File
    });

    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fileName + '_export_' + new Date().getTime() + '.xlsx');
    })

  }

  async readExcel(event) {
    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.files.length > 0) {
      const file = event.files[0];
      if (!_.includes(af, file.type)) {
        return {
          succeeded: false,
          error: 'Only EXCEL Docs Allowed!',
        };
      } else {
        const workbook = new Workbook();
        await workbook.xlsx.load(file)
        const workSheetsData: ExcelImportRes[] = [];
        workbook.worksheets.forEach(worksheet => {
          const table: any = worksheet.getTables()[0]
          const data: Table = table.table ?? {};
          const worksheetNameData = data.name.split(".ID_NUM.");
          const jsonData = this.changeRowsToDict(worksheet);
          workSheetsData.push({
            worksheetName: worksheetNameData[0].replace("_", " "),
            worksheetId: worksheetNameData[1],
            data: jsonData
          })
        });
        return {
          succeeded: true,
          data: workSheetsData
        }
      }
    }
  }

  changeRowsToDict(worksheet: Worksheet): any[] {
    let dataArray: any[] = [];
    let keys: any = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber == 1) {
        keys = row.values;
        keys = keys.map(key => JSON.parse(this.decryptUsingAES256(this.token, key)))
      }
      else if (rowNumber > 2) {
        let data = {};
        keys.forEach(element => {
          if (element) data[element] = "";
        });
        row.eachCell(function (cell, colNumber) {
          data[keys[colNumber]] = cell.value;
        });
        dataArray.push(data);
        console.log(dataArray);
      }
    });
    return dataArray;
  }

  encryptUsingAES256(token: string, message: any) {
    let _key = CryptoJS.enc.Utf8.parse(token);
    let _iv = CryptoJS.enc.Utf8.parse(token);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(message), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  decryptUsingAES256(token: string, encrypted: string) {
    let _key = CryptoJS.enc.Utf8.parse(token);
    let _iv = CryptoJS.enc.Utf8.parse(token);

    return CryptoJS.AES.decrypt(
      encrypted, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);
  }

}
