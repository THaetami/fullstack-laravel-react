import { useEffect, useRef } from 'react'
import { useStateContext } from '../contexts/ContextProvider';
import { IoHome } from "react-icons/io5";
import { BiSolidReport } from "react-icons/bi";
import { BsBank2 } from "react-icons/bs";
import { IoPricetagsSharp } from "react-icons/io5";
import { GoTriangleUp } from "react-icons/go";
import { FaShoppingCart } from "react-icons/fa";
import { RiCurrencyFill } from "react-icons/ri";
import { RiContactsBook2Fill } from "react-icons/ri";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { MdHomeWork } from "react-icons/md";
import { NavLink } from './NavLink';
import '../styles/sidebar.scss';



export default function SideBar() {
  const navToggleRef = useRef<HTMLInputElement>(null);
  const { user } = useStateContext();


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
          <NavLink to='/home' icon={IoHome} label='Home' />
          <NavLink to='/report' icon={BiSolidReport} label='Report' />
          <hr />
          <NavLink to='/cash' icon={BsBank2} label='Cash & Bank' />
          <NavLink to='/sales' icon={IoPricetagsSharp} label='Sales' />
          <NavLink to='#' icon={FaShoppingCart} label='Purchase' />
          <NavLink to='#' icon={RiCurrencyFill} label='Expense' />
          <hr />
          <NavLink to='#' icon={RiContactsBook2Fill} label='Contacts' />
          <NavLink to='#' icon={GiCardboardBoxClosed} label='Products' />
          <NavLink to='#' icon={MdHomeWork} label='Asset Management' />
          <div id="nav-content-highlight"></div>
        </div>
        <input id="nav-footer-toggle" type="checkbox" />
        <div id="nav-footer">
          <div id="nav-footer-heading">
            <div id="nav-footer-avatar">
              <img src="https://gravatar.com/avatar/4474ca42d303761c2901fa819c4f2547" alt="Avatar" />
            </div>
            <div id="nav-footer-titlebox">
              <a id="nav-footer-title" href="#" target="_blank">{user?.name}</a>
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
