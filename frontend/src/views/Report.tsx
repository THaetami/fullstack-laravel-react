import Footer from '../component/Footer';
import Tabs from '../component/Tabs';
import { useState } from 'react';
import { getData } from '../utils/report-list';
import { Helmet } from 'react-helmet-async';

import '../styles/views/layout-page.scss';

export default function Report() {
  const [currentTab, setCurrentTab] = useState('Sales');
  const tabs = getData();


  return (
    <>
      <Helmet>
        <title>Itungin . Report</title>
        <meta name='description' content='Report page itungin' />
      </Helmet>
      <div className="wrap-page h-screen overflow-auto items-center">
        <div className="kontener-page mt-3 mx-auto mb-10">
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
