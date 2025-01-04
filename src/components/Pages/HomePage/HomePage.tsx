import { useShop } from "../../../context/AppContext";
import ProductCard from "./ProductCard";
import ImageGallery from "./ImageGallery";

const HomePage = () => {
  const { products } = useShop();

  return (
    <div className="flex flex-col justify-center items-center bg-primary-color dark:bg-slate-900 py-3">
      <ImageGallery />
      <div className="product-grid gap-2 m-3" id="card-products">
        {products.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
