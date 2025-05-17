import { Link } from "react-router-dom"
import LightDarkModeBtn from "./LightDarkModeBtn"
import LoginBtn from "./LoginBtn"
import SearchBar from "./SearchBar"
import CartSideBar from "./CartSideBar"
import { useState } from "react"
import CartButton from "./CartButton"


const Navbar = () => {

  const [cartWidth, setCartWidth] = useState("w-0");
  const openCart = () => {
    setCartWidth(
      "lg:w-1/4 md:w-1/3 w-1/2 border-l-2 border-t-2 rounded border-orange-500"
    );
  };

  const closeCart = () => {
    setCartWidth("w-0 border-none");
  };
  

  return (
    <div
    className="flex flex-wrap justify-around items-center border-b-2 border-slate-300 w-full z-50 gap-2 pb-3 bg-primary-color dark:bg-slate-900"
    >
      {/* Logo */}
      <Link to='/'>
        <img className="w-32 cursor-pointer" src="/FullLogo_Transparent.png" alt="" />
      </Link>

      <SearchBar />

      <LightDarkModeBtn />

      <LoginBtn />

      <CartButton openCart={openCart}/>

      <CartSideBar closeCart={closeCart} cartWidth={cartWidth}/>

    </div>
  )
}

export default Navbar

