import React from "react";

const TheadComp = () => {
  return (
    <tr>
      <th><input type="checkbox" /></th>
      <td>Tanggal</td>
      <td>No.</td>
      <td>Pelanggan</td>
      <td>Tgl. jatuh tempo</td>
      <td>Status</td>
      <td>Sisa tagihan</td>
      <td>Total</td>
      <td>Tag</td>
      <th className="hidden md:block"></th>
    </tr>
  )
}

const TableReport = () => {
  const data = [{
    tanggal: '28/11/2023',
    no: 'Sales Invoice #10001',
    pelanggan: 'Handika',
    tgl_tempo: '28/12/2023',
    status: 'Open',
    tagihan: 'Rp. 155.400.000,00',
    total: 'Rp. 155.400.000,00',
    tag: ''
  }];

  return (
    <div className="overflow-x-auto text-md bg-white max-h-[300px]">
      <table className="table table:sm lg:table-md table-pin-rows table-pin-cols ">
        <thead className="text-sm">
          <TheadComp />
        </thead>
        <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <th><input type="checkbox" /></th>
            <td>{item.tanggal}</td>
            <td>{item.no}</td>
            <td>{item.pelanggan}</td>
            <td>{item.tgl_tempo}</td>
            <td>{item.status}</td>
            <td>{item.tagihan}</td>
            <td>{item.total}</td>
            <td>{item.tag}</td>
          </tr>
        ))}
        </tbody>
        <tfoot className="text-sm">
          <TheadComp />
        </tfoot>
      </table>
    </div>
  )
}


export default TableReport;
