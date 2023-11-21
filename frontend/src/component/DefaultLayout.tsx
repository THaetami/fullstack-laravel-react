import { Link, Outlet } from 'react-router-dom'
import '../styles/default-layout.scss'

export default function DefaultLayout() {

  const onLogout = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div id='defaultLayout'>
      <aside>
          <Link to="/dashboard">Dashboard</Link>
      </aside>
      <div className='content'>
          <header>
          <div>
              Header
          </div>
          <div>
              Thaetami
              <a href='#' onClick={onLogout} className='btn-logout'>Logout</a>
          </div>
          </header>
          <main>
          <Outlet />
          </main>
      </div>
    </div>
  )
}
