import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/AppContext';
import WishListBtn from '../Pages/WishList/WishListBtn';

const CategoriesBar = () => {
  const { filterByCategory, categories, resetCategories, isPressed, loggedInUser } = useCart();
  const navigate = useNavigate();

  // first letter capital
  const firstLetterCapital = (str: string): string =>  str.charAt(0).toUpperCase() + str.slice(1);

  const handleOrderBtn = () => loggedInUser ? navigate('previousOrders') : navigate('login');

  return (
    <div className='flex flex-wrap justify-start items-center bg-slate-50 dark:bg-slate-600 py-2 select-none dark:text-white'>
      
      <Link to='/wishlistSearchResults' className='mt-1'>

        <button className= "cursor-pointer ml-3 relative wishlist-btn">
          <WishListBtn />
          <span className="tooltip invisible w-24 bg-neutral-500 text-white font-semibold text-center rounded absolute">Wish list</span>
        </button>
      </Link>


      <Link to='/'><h2 className= "cursor-pointer hover:bg-black/[.1] rounded p-2 ml-3"  onClick={() => resetCategories()}>All</h2></Link>



      {categories.map((category, index) =>
        <Link to='/'  key={index}> 
          <button
            className={`cursor-pointer hover:bg-black/[.2] rounded ml-3 p-2 bg-origin-border ${isPressed === category ? 'bg-orange-500 text-white font-semibold' : ''}`}
            onClick={() => filterByCategory(category)}
          >
            {firstLetterCapital(category)}
          </button>
        </Link>
      )}

      <div 
        className='self-center ml-3 checkout-icon relative'
        onClick={() => navigate('/checkout')}
      >
        <svg className="w-6 h-6 text-orange-500 hover:text-orange-700 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
        </svg>
        <span className="tooltip invisible w-24 bg-neutral-500 text-white font-semibold text-center rounded absolute">Checkout</span>
      </div>

      <div 
        className='self-center ml-5 checkout-icon relative'
        onClick={handleOrderBtn}
      >
        <svg className="w-6 h-6 text-orange-500 hover:text-orange-700 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h6m-6 4h6m-6 4h6M1 1v18l2-2 2 2 2-2 2 2 2-2 2 2V1l-2 2-2-2-2 2-2-2-2 2-2-2Z"/>
        </svg>
        <span className="tooltip invisible w-24 bg-neutral-500 text-white font-semibold text-center rounded absolute">Orders</span>
      </div>

    </div>
  )
}

export default CategoriesBar