export interface ExcelDataInterface {
    data: (string | Date | number)[][]
    type: string[]
    headers: {name: string, key: string}[]
    editable: boolean[]
    workSheetName: string
    workSheetId?: string
}