import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import App from "../App";


// network requests => useProducts on load and every auth action taken invokes useAuth.

const mockedJSONRes = {
  "products": [
    {
      "id": 83,
      "title": "Blue & Black Check Shirt",
      "description": "The Blue & Black Check Shirt is a stylish and comfortable men's shirt featuring a classic check pattern. Made from high-quality fabric, it's suitable for both casual and semi-formal occasions.",
      "category": "mens-shirts",
      "price": 29.99,
      "rating": 4.19,
      "images": [
          "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/1.png",
          "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/2.png",
          "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/3.png",
          "https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/4.png"
      ]
  },
  {
      "id": 84,
      "title": "Gigabyte Aorus Men Tshirt",
      "description": "The Gigabyte Aorus Men Tshirt is a cool and casual shirt for gaming enthusiasts. With the Aorus logo and sleek design, it's perfect for expressing your gaming style.",
      "category": "mens-shirts",
      "price": 24.99,
      "rating": 4.95,
      "images": [
          "https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/1.png",
          "https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/2.png",
          "https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/3.png",
          "https://cdn.dummyjson.com/products/images/mens-shirts/Gigabyte%20Aorus%20Men%20Tshirt/4.png"
      ]
  },
  ],
  "total": 0,
  "skip": 20,
  "limit": 29
}

// todo => try and find a type or type assertion here for global.fetch to sync with vi.fn.
// todo => decide what features to test.

beforeEach(() => {
  global.fetch = vi.fn<any>(() => Promise.resolve({
    json: () => Promise.resolve(mockedJSONRes)
  }))
});

afterEach(() => {
  vi.resetAllMocks();
})


test("render main page", async () => {
  render(<App />);
  const loginBtn = await screen.findByRole("button", { name: /login/i });
  screen.debug(undefined, 20000);
  expect(loginBtn).toBeVisible();
});


test("render full product info page when searching", async () => {
  render(<App />);
  const searchBar = await screen.findByRole("searchbox");
  expect(searchBar).toBeVisible();

  fireEvent.change(searchBar, { target: { value: "men" } });
  const searchResult = await  screen.findByRole('button', {  name: /gigabyte aorus men tshirt/i});
  fireEvent.click(searchResult);
  
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  })
});
