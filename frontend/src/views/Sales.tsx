import { useState } from "react";
import Footer from "../component/Footer";
import '../styles/sales.scss'
import CardDashboard from "../component/CardDashboard";
import { Link } from "react-router-dom";
import Tabs from "../component/Tabs";
import { getData } from "../utils/sales-table-list";

export default function Sales() {
  const [currentTab, setCurrentTab] = useState('Faktur');
  const tabs = getData();

  const data = [
    { id: 1, desc: 'Penjualan belum dibayar', bg: 'bg-yellow-200', border: 'border-yellow-700', link: null },
    { id: 2, desc: 'Penjualan jatuh tempo', bg: 'bg-red-200', border: 'border-red-700', link: null },
    { id: 3, desc: 'Pelunasan diterima 30 hari terakhir', bg: 'bg-green-200', border: 'border-green-700', link: '/home' },
  ];

  return (
    <div className="wrap-sales h-screen overflow-auto items-center ">
      <div className="kontener-sales mx-auto mb-10">
      <div  className="border-b-2 lg:border-b-4 border-black py-3">
          <div className="inline xs:flex justify-between items-center">
            <div className="mb-3 xs:mb-0">
              <div className="text-3xl">Penjualan</div>
            </div>
            <div className="flex xs:inline justify-end lg:justify-normal space-x-2">
              <div className="inline items-center xs:flex justify-end md:justify-normal space-y-2 space-x-2 xs:space-y-0">
                <div className="flex justify-end xs:justify-normal space-x-1">
                  <button className="py-2 px-3 border-2 rounded-md border-slate-300 text-center hover:bg-white hover:border-white">Import</button>
                </div>
                <div className="flex justify-end xs:justify-normal space-x-1">
                  <button className="py-2 px-3 border-2 rounded-md border-slate-300 text-center hover:bg-white hover:border-white">Buat Penjualan Baru</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-2">
            {data.map((d, index) => (
               d.link ? (
                <Link key={index} to={d.link} >
                  <CardDashboard {...d} />
                </Link>
              ) : (
                <CardDashboard key={index} {...d} />
              )
            ))}
          </div>
        </div>
        <div className="mt-10">
          <Tabs
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            page="Sales"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
