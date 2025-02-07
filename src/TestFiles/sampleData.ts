import { User } from "firebase/auth";

export const mockedProductsJSONRes = {
  products: [
    {
      id: 83,
      title: "Blue & Black Check Shirt",
      description:
        "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
      category: "mens-shirts",
      price: 29.99,
      rating: 4.19,
      images: [
        "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png",
        "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/2.png",
        "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/3.png",
        "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/4.png",
      ],
    },
    {
      id: 84,
      title: "Gigabyte Aorus Men Tshirt",
      description:
        "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
      category: "mens-shirts",
      price: 24.99,
      rating: 4.95,
      images: [
        "https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/1.png",
        "https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/2.png",
        "https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/3.png",
        "https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/4.png",
      ],
    },
  ],
  total: 0,
  skip: 20,
  limit: 29,
};

export const mockUser: Partial<User> = {
  email: "name@emailAddress.com",
  uid: "asdfkjl23230udkob",
  emailVerified: false,
  isAnonymous: false,
  providerData: [
    {
      providerId: "password",
      uid: "name@emailAddress.com",
      displayName: null,
      email: "name@emailAddress.com",
      phoneNumber: null,
      photoURL: null,
    },
  ],
};
