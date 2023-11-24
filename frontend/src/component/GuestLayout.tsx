import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'


export default function GuestLayout() {
  const { token, notification } = useStateContext();

  if (token) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <div>
        <Outlet />
        {notification &&
          <div className={`${notification.setting} notification`}>
            {notification.message}
          </div>
        }
      </div>
    </>
  )
}
