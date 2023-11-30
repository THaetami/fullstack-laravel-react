import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import baseUrl from '../utils/api-default';
import { useEffect } from 'react'
import SideBar from './SideBar';
import NavBar from './NavBar';
import '../styles/default-layout.scss'
import Modal from './Modal';

export default function DefaultLayout() {
  const { token, setUser, notification } = useStateContext();

  useEffect(() => {
    if (!token) {
      return;
    }

    baseUrl.get('/user')
      .then(({ data }) => {
        setUser(data.data)
      })
  }, [token, setUser])


  if (!token) {
    return <Navigate to={'/login'} />
  }



  return (
    <div className='wrap-default-layout'>
      <div className='h-screen'>
        <NavBar />
        <SideBar />
        <Outlet />
      </div>
      {notification &&
        <div className={`${notification.setting} notification`}>
          {notification.message}
        </div>
      }
      <Modal />
    </div>
  )
}
