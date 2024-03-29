import { useState } from "react";
import Footer from "../component/Footer";
import '../styles/sales.scss'
import CardDashboard from "../component/CardDashboard";
import { Link } from "react-router-dom";
import Tabs from "../component/Tabs";
import HeaderPage from "../component/HeaderPage";
import { Helmet } from "react-helmet-async";

export default function Purchases() {
  const [currentTab, setCurrentTab] = useState('Biaya');
  const tabs = [
    {
      id: 1,
      title: null,
      desc: null,
      category: 'Biaya',
    },
    {
      id: 2,
      title: null,
      desc: null,
      category: 'Persetujuan',
    },
  ];

  const data = [
    { id: 1, desc: 'Total Biaya Bulan Ini', bg: 'bg-blue-200', border: 'border-blue-700', link: '/home' },
    { id: 2, desc: 'Biaya 30 Hari Terakhir', bg: 'bg-blue-200', border: 'border-blue-700', link: '/home' },
    { id: 3, desc: 'Biaya Belum Dibayar', bg: 'bg-blue-200', border: 'border-blue-700', link: '/home' },
  ];

  return (
    <>
      <Helmet>
        <title>Expense | Itungin</title>
        <meta name='description' content='Expense page itungin' />
      </Helmet>
      <div className="wrap-sales h-screen overflow-auto items-center ">
        <div className="kontener-sales mx-auto mb-10">
          <HeaderPage title="Pengeluaran">
            <div className="flex justify-end xs:justify-normal space-x-1">
              <button className="py-2 px-3 border-2 rounded-md border-slate-300 text-center hover:bg-white hover:border-white">Buat Biaya Baru</button>
            </div>
          </HeaderPage>
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
              page="Biaya"
            />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
