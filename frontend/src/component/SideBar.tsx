import { useEffect, useRef } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { IoHome } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import { BsBank2 } from "react-icons/bs";
import { IoPricetagsSharp } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { GoTriangleUp } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { RiCurrencyFill } from "react-icons/ri";
import { RiContactsBook2Fill } from "react-icons/ri";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { MdHomeWork } from "react-icons/md";
import '../styles/sidebar.scss';

export default function SideBar() {

  const navToggleRef = useRef<HTMLInputElement>(null);
  const { user } = useStateContext();
  const pathname = useLocation().pathname;

  const { setOpenModal } = useStateContext();

  useEffect(() => {
    const handleResize = () => {
      const navToggle = navToggleRef.current;
      if (navToggle) {
        navToggle.checked = window.innerWidth > 1024;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navToggleRef]);

  return (
    <>
      <div id="nav-bar">
        <input id="nav-toggle" type="checkbox" ref={navToggleRef}/>
        <div id="nav-header">
          <a id="nav-title" href="#">
            Itungin
          </a>
          <label htmlFor="nav-toggle">
            <span id="nav-toggle-burger"></span>
          </label>
          <hr />
        </div>
        <div id="nav-content">
          <div className={`${pathname === '/dashboard' ? 'active-link' : ''} nav-button`}>
            <Link to='/dashboard' className='fas flex justify-center' >
              <IoHome className="size-icon" />
            </Link>
            <span>Home</span>
          </div>
          <div className="nav-button"><i className="fas flex justify-center"><BiSolidReport className="size-icon"/></i><span>Report</span></div>
          <hr />
          <div className="nav-button"><i className="fas flex justify-center"><BsBank2 className="size-icon" /></i><span>Kas & Bank</span></div>
          <div className="nav-button"><i className="fas flex justify-center"><IoPricetagsSharp className="size-icon" /></i><span>Sales</span></div>
          <div className="nav-button"><i className="fas flex justify-center"><FaShoppingCart className="size-icon" /></i><span>Purchases</span></div>
          <div className="nav-button"><i className="fas flex justify-center"><RiCurrencyFill className="size-icon" /></i><span>Expense</span></div>
          <hr />
          <div className="nav-button"><i className="fas flex justify-center"><RiContactsBook2Fill className="size-icon" /></i><span>Contacts</span></div>
          <div className="nav-button"><i className="fas flex justify-center"><GiCardboardBoxClosed className="size-icon" /></i><span>Products</span></div>
          <div className="nav-button"><i className="fas flex justify-center"><MdHomeWork className="size-icon" /></i><span>Asset Management</span></div>
          <div className="nav-button" onClick={() => setOpenModal(true)} ><i className="fas flex justify-center"><RiLogoutBoxRFill className="size-icon" /></i><span>Logout</span></div>
          <div id="nav-content-highlight"></div>
        </div>
        <input id="nav-footer-toggle" type="checkbox" />
        <div id="nav-footer">
          <div id="nav-footer-heading">
            <div id="nav-footer-avatar">
              <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="Avatar" />
            </div>
            <div id="nav-footer-titlebox">
              <a id="nav-footer-title" href="https://codepen.io/uahnbu/pens/public" target="_blank">{user?.name}</a>
              <span id="nav-footer-subtitle">Admin</span>
            </div>
            <label htmlFor="nav-footer-toggle">
              <i className="fas"><GoTriangleUp /></i>
            </label>
          </div>
          <div id="nav-footer-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </div>
      </div>
    </>
  )
}
