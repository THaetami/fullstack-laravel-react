import { useEffect, useRef } from 'react';
import '../styles/report.scss'
import Footer from '../component/Footer';
import { getData } from '../utils/report-list';
import React from 'react';

export default function Report() {
  const firstRadioRef = useRef<HTMLInputElement>(null);
  const data = getData();

  const categories = [...new Set(data.map(item => item.category))];

  useEffect(() => {
    if (firstRadioRef.current) {
      firstRadioRef.current.checked = true;
    }
  }, []);

  return (
    <div className="wrap-report h-screen overflow-auto items-center">
      <div className="kontener-report mx-auto mb-10">
        <div role="tablist" className="tabs tabs-lg tabs-lifted overflow-auto bg-blue-300 rounded-lg pt-2 pb-10 px-2">
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab bg-blue-300 border-none"
                aria-label={category}
                ref={index === 0 ? firstRadioRef : null }
              />
              <div role="tabpanel" className="tab-content py-2 px-1">
                <div className="text-lg m-0 px-1">
                  { category } report:
                </div>
                <div className='grid grid-cols-1 xs:grid-cols-2 gap-10 mt-3'>
                  {data
                    .filter(item => item.category === category)
                    .map((item) => (
                      <div key={item.id} className='rounded-md px-1 pt-1 pb-2'>
                          {item.id % 2 === 1 && (
                            <div className='grid grid-cols-2 gap-3 xs:inline'>
                              <div>
                                <div className='text-xl mb-2 font-semibold'>{item.title}</div>
                                <div className='tex-md font-normal'>{item.desc}</div>
                                <button className='mt-2 rounded-md border-white border-2 px-3 py-1 font-normal cursor-not-allowed'>Lihat Laporan</button>
                              </div>
                            </div>
                          )}
                          {item.id % 2 === 0 && (
                            <div className='grid grid-cols-2 gap-3 xs:inline'>
                              <div>
                                <div className='text-xl mb-2 font-semibold'>{item.title}</div>
                                <div className='tex-md font-normal'>{item.desc}</div>
                                <button className='mt-2 rounded-md border-white border-2 px-3 py-1 font-normal cursor-not-allowed'>Lihat Laporan</button>
                              </div>
                            </div>
                          )}
                      </div>
                    ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
