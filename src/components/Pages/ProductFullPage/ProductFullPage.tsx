import { useLocation, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../utilities/formatCurrency';
import ImageLoader from '../../ImageLoader';

const ProductFullPage = () => {
  const { state } = useLocation();
  const { title, price, ratingsArray, image, rate, description } = state;
  const navigate = useNavigate();

  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })


  return (
    <div className="layout gap-y-3 gap-x-5 py-4 pr-3 dark:bg-slate-300 bg-primary-color">

      <div className='image select-none'>
        <ImageLoader src={image} alt="product" className='w-full object-scale-down aspect-square mix-blend-multiply' dimensions={{ height: '100px', width: '100px' }}/>
      </div>

      <div className="title flex flex-col gap-y-2">
        <h1 className='font-semibold text-2xl text-gray-900'>{title}</h1>
        <div className='font-bold text-gray-900 text-3xl'>{formatCurrency(price)}</div>
        <div className="flex items-center mt-2.5 rating">
          {ratingsArray.map((item: number, index: number) => (
              <svg key={index} className={!item ? "w-4 h-4 text-gray-200" : 'w-4 h-4 text-yellow-300'} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
            ))
          }
          <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">{rate}</span>
        </div>
      </div>

      <div className="description">

        <p className='mb-5'><strong>Description:</strong> {description}</p>

        <div className='container flex gap-2 flex-wrap'>
          {/* <button className="w-auto bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white hover:cursor-pointer select-none">Add to Cart</button> */}
          
          <button className="w-auto bg-orange-500 hover:bg-orange-700 rounded p-3 font-semibold text-white hover:cursor-pointer select-none" onClick={() => navigate('/')}>Back to Products</button>
          
        </div>
      </div>
      
    </div>



  
  )
}

export default ProductFullPage