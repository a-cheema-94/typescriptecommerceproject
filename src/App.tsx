import CategoriesBar from "./components/Navbar/CategoriesBar"
import HomePage from "./components/Pages/HomePage/HomePage"
import Navbar from "./components/Navbar/Navbar"
import ProductFullPage from "./components/Pages/ProductFullPage/ProductFullPage"
import { AppContextProvider } from "./context/AppContext"
import { Routes, Route } from 'react-router-dom'
import WishList_SearchResults from "./components/Pages/WishList/WishList_SearchResults"
import Checkout from "./components/Pages/Checkout/Checkout"
import PreviousOrders from "./components/Pages/PreviousOrders/PreviousOrders"
import Login from "./components/Pages/Authentication/Login"
import SignUp from "./components/Pages/Authentication/SignUp"
import AccountSummary from "./components/Pages/Authentication/AccountSummary"
import ForgotPassword from "./components/Pages/Authentication/ForgotPassword"
import PrivateRoute from "./utilities/PrivateRoute"

// todo => 'any' type

function App() {
  return (
    <>
      <AppContextProvider>
        <div className="overflow-x-hidden">

        <Navbar />
      <CategoriesBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/productPage" element={<ProductFullPage />}/>
          <Route path='/wishlistSearchResults' element={<WishList_SearchResults />}/>
          <Route path='/checkout' element={<Checkout />}/>
          {/* private route ensures user is logged in before accessing certain pages. */}
          <Route path='/previousOrders' element={
            <PrivateRoute>
              <PreviousOrders />
            </PrivateRoute>
          }/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signUp' element={<SignUp />}/>
          <Route path='/forgotPassword' element={<ForgotPassword />}/>
          <Route path='/accountSummary' element={
            <PrivateRoute>
              <AccountSummary />
            </PrivateRoute>
          }/>


        </Routes>
        </div>
      </AppContextProvider>
    </>

    
  )
}

export default App
