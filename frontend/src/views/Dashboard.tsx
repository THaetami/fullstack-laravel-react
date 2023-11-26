import Carousel from '../component/Carousel';
import Footer from '../component/Footer';
import { useStateContext } from '../contexts/ContextProvider'
import '../styles/dashboard.scss'
import { getData } from '../utils/service-list';

export default function Dashboard() {
  const { user } = useStateContext();
  const service = getData();

  return (
    <div className="wrap-dashboard h-screen overflow-auto">
      <div className="text-lg xs:text-2xl lg:text-3xl font-bold text-center mt-5 lg:mt-10 kontener mx-auto">
        <p>Hallo, {user?.name}</p>
        <p>Aktivitas apa yang ingin Anda lakukan?</p>
      </div>

      <div className="kontener mx-auto mt-5 md:mt-14">
        <div className="grid text-sm gap-3 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 mx-auto box-content p-2">
          {service.map((s) => (
            <div key={s.id} className='py-2 px-2 xs:px-0 border-2 text-center rounded-md cursor-pointer hover:bg-white flex items-center space-x-1 lg:space-x-2 justify-center'>
              <img src={s.img} alt="icons" width={30} height={30} />
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="kontener mx-auto mt-0 lg:mt-6 px-2 lg:px-0 mb-14">
        <Carousel />
      </div>
      <Footer />
    </div>
  )
}
