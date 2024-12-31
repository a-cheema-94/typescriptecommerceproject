import { Link } from "react-router-dom"
import LightDarkModeBtn from "./LightDarkModeBtn"
import LoginBtn from "./LoginBtn"
import SearchBar from "./SearchBar"
import { useCart } from "../../context/AppContext"
import CartSideBar from "./CartSideBar"


const Navbar = () => {
  const { openCart, cartProducts } = useCart();


  return (
    <div
    className="flex flex-wrap justify-around items-center border-b-2 border-slate-300 w-full z-50 gap-2 pb-3 bg-primary-color dark:bg-slate-900"
    >
      <CartSideBar />
      <Link to='/'>
        <img className="w-32 cursor-pointer" src="../imgs/FullLogo_Transparent.png" alt="" />
      </Link>

      <SearchBar />
      <LightDarkModeBtn />
      <LoginBtn />

      <button 
        className="w-7 h-7 hover:bg-slate-300 rounded-full dark:hover:text-black mr-3 dark:text-white relative"
        onClick={openCart}
        
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>

        <div className="rounded-full bg-orange-500 text-white font-semibold flex justify-center items-center absolute right-0 bottom-0 w-5 h-5 transform translate-x-3/4 translate-y-1/2 ping">{cartProducts.length > 0 ? cartProducts.length : 0}</div>


      </button>

    </div>
  )
}

export default Navbar

