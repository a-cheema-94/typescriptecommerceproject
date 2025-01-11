import { useShop } from "../../../context/AppContext";
import ProductCard from "./ProductCard";
import ImageGallery from "./ImageGallery";
import LoadingSpinner from '../../LoadingSpinner';

const HomePage = () => {
  const { products, productsLoading } = useShop();

  return (
    <div className="flex flex-col justify-center items-center bg-primary-color dark:bg-slate-900 py-3">
      <ImageGallery />
      <div className="product-grid gap-2 m-3" id="card-products">
        {!productsLoading ? products.map((item) => (
          <ProductCard key={item.id} {...item} />
        )) : <LoadingSpinner dimensions={{ height: '200px', width: '200px' }}/>}
      </div>
    </div>
  );
};

export default HomePage;
