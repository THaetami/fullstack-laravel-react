import '../styles/report.scss'
import Footer from '../component/Footer';
import Tabs from '../component/Tabs';
import { useState } from 'react';
import { getData } from '../utils/report-list';
import { Helmet } from 'react-helmet-async';

export default function Report() {
  const [currentTab, setCurrentTab] = useState('Sales');
  const tabs = getData();

  return (
    <>
      <Helmet>
        <title>Report | Itungin</title>
        <meta name='description' content='Report page itungin' />
      </Helmet>
      <div className="wrap-report h-screen overflow-auto items-center">
        <div className="kontener-report mt-3 mx-auto mb-10">
          <Tabs
            tabs={tabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            page='Report'
          />
        </div>
        <Footer />
      </div>
    </>
  )
}
