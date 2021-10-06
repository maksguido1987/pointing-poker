import * as FileSaver from 'file-saver';
import { FC } from 'react';
import * as XLSX from 'xlsx';
import Button from '../Button/Button';
import { blueColor, whiteColor } from '../GlobalStyle/StyledGlobal';

interface ExportCSVType {
  csvData: { Task: string; Results: string }[];
  fileName: string;
}

export const ExportCSV: FC<ExportCSVType> = ({ csvData, fileName }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `${fileName}-info${fileExtension}`);
  };

  return (
    <div className="excel-btn">
      <Button
        onClick={exportToCSV}
        color={whiteColor}
        colorBG={blueColor}
        text="Download Results"
      />
    </div>
  );
};
