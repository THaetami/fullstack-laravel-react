import { IoPricetagsSharp } from 'react-icons/io5'
import { RiCurrencyFill } from 'react-icons/ri'
import { FaShoppingCart } from 'react-icons/fa'
import { GoTriangleUp } from 'react-icons/go'
import { TbGridDots } from "react-icons/tb";
import { MdAccessTime, MdOutlineLiveHelp } from 'react-icons/md'
import { IoMdNotificationsOutline } from "react-icons/io";
import { useStateContext } from '../contexts/ContextProvider'
import '../styles/navbar.scss'

export default function NavBar() {
  const { user } = useStateContext();
  return (
    <div className='text-sm font-semibold wrap-navbar flex justify-end lg:justify-between'>
      <div className="hidden lg:flex space-x-3 items-center ">
        <div className='flex item-center space-x-1 items-center px-2 py-1.5 btn-navbar cursor-pointer'>
          <IoPricetagsSharp className="size-icon" />
          <div>
            Sales
          </div>
        </div>
        <div className='flex item-center space-x-1 items-center px-2 py-1.5 btn-navbar cursor-pointer'>
          <FaShoppingCart className="size-icon" />
          <div>
            Purchases
          </div>
        </div>
        <div className='flex item-center space-x-1 items-center px-2 py-1.5 btn-navbar cursor-pointer'>
          <RiCurrencyFill className="size-icon" />
          <div>
            Expense
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className='flex items-center space-x-2 cursor-pointer hover:text-blue-400'>
          <div className='items-center text-end '>
            <p className='text-lg hidden md:inline-block'>Tarak Company</p>
            <p className='text-sm'>{ user?.name }</p>
          </div>
          <GoTriangleUp className='rotate-180'/>
        </div>
        <div className="hidden md:flex space-x-3 items-center">
          <TbGridDots className='h-7 w-7 cursor-pointer hover:text-blue-400'/>
          <MdOutlineLiveHelp className='h-7 w-7 cursor-pointer hover:text-blue-400'/>
          <MdAccessTime className='h-7 w-7 cursor-pointer hover:text-blue-400'/>
          <IoMdNotificationsOutline className='h-7 w-7 cursor-pointer hover:text-blue-400'/>
        </div>
      </div>
    </div>
  )
}