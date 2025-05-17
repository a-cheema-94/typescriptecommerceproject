import { useShop } from "../../../context/AppContext";
import { useState } from "react";
import ImageLoader from "../../ImageLoader";
import { ProductItem } from "../../../Types/Types";

const IMAGE_COUNT = 4;

const ImageGallery = () => {
  const { products } = useShop();
  const [imageOrder, setImageOrder] = useState(0);

  const imageArray = products
    .map((product: ProductItem) => {
      const productImage = product.images[0];
      const productImageAltText = product.title;
      return { productImage, productImageAltText }
    })
    .slice(0, IMAGE_COUNT);

  const nextImage = () => {
    setImageOrder((index) => {
      if (index === imageArray.length - 1) return 0;
      return imageOrder + 1;
    });
  };

  const prevImage = () => {
    setImageOrder((index) => {
      if (index === 0) return imageArray.length - 1;
      return imageOrder - 1;
    });
  };

  const arrowBtnClass =
    "block absolute bg-transparent inset-y-0 border-none hover:bg-black/[.2] hover:text-white";

  return (
    <section className="w-3/4 my-5 imageGalleryContainer" >
      <div className="w-full h-full relative bg-orange-400 dark:opacity-80 rounded-2xl px-14 py-5" data-testid="image gallery">
        {/* Images */}
        <a href="#card-products">
          <div className="w-full h-full flex items-center overflow-hidden">
            {imageArray.map(({ productImage, productImageAltText }, index) => (
              <ImageLoader 
                key={index}
                src={productImage}
                alt={productImageAltText}
                className="w-full h-full block flex-shrink-0 flex-grow-0 object-scale-down imageEffect select-none"
                style={{ translate: `${-100 * imageOrder}%` }}
                dimensions={{ height: '200px', width: '200px' }}
              />
            ))}
          </div>
        </a>
        {/* Buttons */}
        {/* prev button */}
        <button
          className={`${arrowBtnClass} left-0 rounded-l-2xl`}
          onClick={prevImage}
          role="button"
          aria-label="Previous Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </button>
        {/* next button */}
        <button
          className={`${arrowBtnClass} right-0 rounded-r-2xl`}
          onClick={nextImage}
          role="button"
          aria-label="Next Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default ImageGallery;
