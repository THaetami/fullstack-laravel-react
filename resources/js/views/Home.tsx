import React from 'react';
import Carousel from '../component/Carousel';
import Footer from '../component/Footer';
import { useStateContext } from '../contexts/ContextProvider'
import { getData } from '../utils/service-list';
import { Helmet } from 'react-helmet-async';

import '../../sass/view/dashboard.scss';

const Home = () => {
  const { user } = useStateContext();
  const service = getData();

  return (
    <>
    <Helmet>
      <title>Itungin</title>
      <meta name='description' content='Home page itungin' />
    </Helmet>
      <div className="wrap-dashboard h-screen overflow-auto items-center px-1">
        <div className="kontener mx-auto mb-10 md:mb-0">
          <div className='text-lg xs:text-2xl lg:text-3xl font-bold text-center mt-5 lg:mt-10'>
            <p>Hallo, {user?.name}</p>
            <p>Aktivitas apa yang ingin Anda lakukan?</p>
          </div>
          <div className="grid gap-3 mt-5 md:mt-14 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 mx-auto box-content p-2">
            {service.map((s) => (
              <div key={s.id} className='py-2 px-2 xs:px-0 border-2 border-slate-300 hover:border-white text-center rounded-md cursor-pointer hover:bg-white flex items-center space-x-1 lg:space-x-2 justify-center'>
                <img src={s.img} alt="icons" width={30} height={30} />
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className=" mt-0 lg:mt-6 px-2 lg:px-0">
            <Carousel />
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Home;
