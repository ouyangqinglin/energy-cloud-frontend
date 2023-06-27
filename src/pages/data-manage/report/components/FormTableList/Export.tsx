import { ExportOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';

const ExportButton = ({ data }: { data: any[] }) => {
  const downloadExcel = (fileName: string) => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet);

    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

    const s2ab = (s: string) => {
      if (typeof ArrayBuffer !== 'undefined') {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i += 1) {
          view[i] = s.charCodeAt(i) & 0xff;
        }

        return buf;
      }

      const buf = new Array(s.length);
      for (let i = 0; i < s.length; i += 1) {
        buf[i] = s.charCodeAt(i) & 0xff;
      }

      return buf;
    };

    FileSaver.saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      `${fileName}.xlsx`,
    );
  };

  return (
    <Button type="primary" key="add" onClick={() => downloadExcel('文件名')}>
      <ExportOutlined />
      导出
    </Button>
  );
};

export default ExportButton;
