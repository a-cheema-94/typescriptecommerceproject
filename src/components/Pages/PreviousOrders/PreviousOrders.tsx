import { useCart } from "../../../context/AppContext"
import { formatCurrency } from "../../../utilities/formatCurrency";
import BackBtn from "../Buttons/BackBtn";



const PreviousOrders = () => {
  const { orders, initialProducts, clearOrders } = useCart();

  const noPreviousOrders = orders.length === 0;

  return (
    <div className={`dark:bg-slate-900 h-screen flex flex-col gap-4`}>

      <div className="flex justify-between items-center mx-4 my-2">
        
        <BackBtn />

        <h1 className="font-semibold text-3xl dark:text-white">Orders</h1>

        <button 
          className="w-28 bg-orange-500 hover:bg-orange-700 rounded py-2 font-semibold text-white select-none"
          onClick={clearOrders}
        >
          Clear order history
        </button>
      </div>


      <div className="flex flex-wrap gap-4 justify-center items-center p-5">
        {noPreviousOrders ?
          <p className="ml-3 mt-3 text-xl dark:text-white">No previous orders to show</p> : 
          
          orders.map((order, index) => {
          const item = initialProducts.find(item => item.id === order.id);
          if(item == null) return null;
          const { title, price, image, category } = item;

          return (
            <div className="h-fit w-80 p-4 grid grid-cols-2 bg-orange-400 rounded ring-1 ring-black" key={index}>
              <div className="">
                <h1 className="text-lg font-semibold">{title}</h1>
                <p className="text-xl font-extrabold">{formatCurrency(price * order.quantity) }</p>
                <p className="text-lg font-semibold">{category}</p>
              </div>
              <div className="flex flex-col">
                <img src={image} alt="" className="w-full aspect-square mix-blend-multiply object-scale-down"/>
                {order.quantity > 1 && <p className="self-end font-bold text-sm">x{order.quantity}</p>}
              </div>

              <div className="date-and-time col-span-2 mt-3 bg-slate-900 rounded-full text-center ring-1 ring-black text-white">
                Ordered On <span className="font-semibold">{order.dateAndTime[0]}</span> at <span className="font-semibold">{order.dateAndTime[1]}</span> <br />
                by <span className="font-semibold">{order.email}</span>
              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default PreviousOrders