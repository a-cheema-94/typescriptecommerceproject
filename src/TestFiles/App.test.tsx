import { act, fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import {
  Auth,
  CompleteFn,
  ErrorFn,
  NextOrObserver,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  Unsubscribe,
  User,
} from "firebase/auth";

// network requests => useProducts on load and every auth action taken invokes useAuth.

const mockedProductsJSONRes = {
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

// const mockUser: Partial<User> | null = { email: "name@emailAddress.com" };

const mockUser: Partial<User> = {
  "email": "name@emailAddress.com",
  "uid": "asdfkjl23230udkob",
  "emailVerified": false,
  "isAnonymous": false,
  "providerData": [
      {
          "providerId": "password",
          "uid": "name@emailAddress.com",
          "displayName": null,
          "email": "name@emailAddress.com",
          "phoneNumber": null,
          "photoURL": null
      }
  ],
}

vi.mock("firebase/auth", async () => {
  let actual: any = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn(),
    onAuthStateChanged: vi.fn(),
  };
});

// todo => test user story: add product to cart => checkout => login => buy => view order
// todo => see if can mock function implementation after calling render in tests rather than before the render.
// todo => make button elements that have svgs inside more testable
// todo => refactor and clean up test file and finish README file.

// Before each test (i.e. before each render of the App), we mimic the behavior of fetch by returning a Promise that resolves to a JSON response with our sample response (contains example products and other fields present in the network request on load). Use the global fetch method since we are in JSDOM (has no access to a real network or the fetch function) and use vi.fn to signify a mocked function => which is an async function that returns a promise which resolves to a json response => which is an async function that returns our mockedProductsJSONRes. Also, we mock the window.scroll function since in one of our components, its gets called on load. Each of these mock functions get reset after each test so no interference.

beforeEach(() => {
  global.fetch = vi.fn(
    async (): Promise<Response> =>
      Promise.resolve({
        json: async () => mockedProductsJSONRes,
      } as Response)
  );

  // (auth: FirebaseAuth, nextOrObserver: NextOrObserver<User>, error?: ErrorFn | undefined, completed?: CompleteFn | undefined) => Unsubscribe

  vi.mocked(onAuthStateChanged).mockImplementation((auth: any, callback: any): Unsubscribe => {
    callback(null);
    return vi.fn()
  })

  window.scroll = vi.fn<[options?: ScrollToOptions]>();
});

afterEach(() => {
  vi.resetAllMocks();
});

// screen.debug(undefined, 20000); // to view whole DOM.

test("render main page", async () => {
  render(<App />);
  const loginBtn = await screen.findByRole("button", { name: /login/i });
  expect(loginBtn).toBeVisible();
});

test("render full product info page after searching", async () => {
  render(<App />);
  const searchBar = await screen.findByRole("searchbox");
  expect(searchBar).toBeVisible();

  fireEvent.change(searchBar, { target: { value: "men" } });

  const searchResult = await screen.findByRole("button", {
    name: /gigabyte aorus men tshirt/i,
  });
  expect(searchResult).toBeVisible();

  fireEvent.click(searchResult);

  expect(window.scroll).toBeCalledWith({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  // Verify on Product Info page
  const description = screen.getByText(/description:/i);
  expect(description).toBeVisible();

  // click back to products to reset to home page.
  const backToProductsBtn = await screen.findByRole("button", {
    name: /back to products/i,
  });
  fireEvent.click(backToProductsBtn);

  // Verify on Home Page
  const imageGalleryContainer = screen.getByTestId("image gallery");
  const nextBtn = within(imageGalleryContainer).getByRole("button", {
    name: /next image/i,
  });
  const previousBtn = within(imageGalleryContainer).getByRole("button", {
    name: /previous image/i,
  });
  expect(nextBtn).toBeVisible();
  expect(previousBtn).toBeVisible();
});

test("render full product info page after clicking product card", async () => {
  render(<App />);
  const loginBtn = await screen.findByRole("button", { name: /login/i });
  expect(loginBtn).toBeVisible();

  // click image on product card
  const productCardLink = await screen.findByRole("link", {
    name: /product card image view product details/i,
  });
  const productCardImage = within(productCardLink).getByRole("img", {
    name: /product card image/i,
  });
  expect(productCardImage).toBeVisible();
  fireEvent.click(productCardImage);

  expect(window.scroll).toBeCalledWith({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  // Verify on Product Info page
  const description = screen.getByText(/description:/i);
  expect(description).toBeVisible();

  // click back to products to reset to home page.
  const backToProductsBtn = await screen.findByRole("button", {
    name: /back to products/i,
  });
  fireEvent.click(backToProductsBtn);

  // Verify on Home Page
  const imageGalleryContainer = screen.getByTestId("image gallery");
  const nextBtn = within(imageGalleryContainer).getByRole("button", {
    name: /next image/i,
  });
  const previousBtn = within(imageGalleryContainer).getByRole("button", {
    name: /previous image/i,
  });
  expect(nextBtn).toBeVisible();
  expect(previousBtn).toBeVisible();
});

test("user purchasing item", async () => {
  vi.mocked(onAuthStateChanged).mockImplementationOnce((auth: any, callback: any): Unsubscribe => {
    callback(mockUser as User);
    return vi.fn()
  })
  vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
    operationType: "signIn",
    providerId: "123",
    user: mockUser as User,
  });
  render(<App />);

  // todo => confirm user is logged in with mock user email: name@emailAddress.com
  
  // const loginBtn = await screen.findByRole("button", { name: /login/i });
  // expect(loginBtn).toBeVisible();

  // verify two sample products are visible
  // both products are visible
  const productContainers = await screen.findAllByTestId("Product Card");
  productContainers.forEach((productCard: HTMLElement) => {
    expect(productCard).toBeVisible();
  });

  const productOne = within(productContainers[0]).getByRole("heading", {
    name: /blue & black check shirt/i,
  });
  expect(productOne).toBeVisible();

  const productTwo = within(productContainers[1]).getByRole("heading", {
    name: /gigabyte aorus Men tshirt/i,
  });
  expect(productTwo).toBeVisible();

  // now both products confirmed rendered. Choose to purchase product One.
  const productOneContainer = productContainers[0];

  // click on add to cart button
  const addToCartBtn = within(productOneContainer).getByRole("button", {
    name: /add to cart/i,
  });
  expect(addToCartBtn).toBeVisible();
  fireEvent.click(addToCartBtn);
  // verify added to cart
  const addedToCartMessage = await screen.findByText(/added to cart/i);
  expect(addedToCartMessage).toBeVisible();

  // view in sidebar cart
  const openCartBtn = screen.getByRole("button", { name: /open cart/i });
  const cartItemsIcon = within(openCartBtn).getByText(/1/i);
  expect(openCartBtn).toBeVisible();
  expect(cartItemsIcon).toBeVisible();
  fireEvent.click(openCartBtn);
  const cartSideBarContainer = screen.getByTestId(/cart side bar/i);
  expect(cartSideBarContainer).toBeVisible();

  // verify item in cart side bar
  const productImage = await within(cartSideBarContainer).findByRole("img", {
    name: /blue & black check shirt/i,
  });
  expect(productImage).toBeVisible();
  const subTotal = within(cartSideBarContainer).getByRole("heading", {
    name: /subtotal: £29\.99/i,
  });
  expect(subTotal).toBeVisible();

  const goToCheckOutBtn = within(cartSideBarContainer).getByRole("button", {
    name: /go to checkout/i,
  });
  expect(goToCheckOutBtn).toBeVisible();

  // click go to checkout button
  fireEvent.click(goToCheckOutBtn);
  // verify on checkout page and side cart is not visible.
  const checkoutPage = screen.getByTestId(/checkout page/i);
  expect(checkoutPage).toBeVisible();
  const ordersButton = await within(checkoutPage).findByRole("button", {
    name: /orders/i,
  });
  expect(ordersButton).toBeVisible();
  const backButton = await within(checkoutPage).findByRole("button", {
    name: /back/i,
  });
  expect(backButton).toBeVisible();

  const productImageOnCheckoutPage = await within(checkoutPage).findByRole(
    "img",
    {
      name: /blue & black check shirt/i,
    }
  );
  expect(productImageOnCheckoutPage).toBeVisible();
  
  const buyNowButton = await within(checkoutPage).findByRole("button", {
    name: /buy now/i,
  });
  expect(buyNowButton).toBeVisible();
  // click on buy now
  fireEvent.click(buyNowButton);

  const confirmHeading = await screen.findByText(/confirm/i);
  const closeButton = screen.getByRole('button', {  name: /close/i});
  const buyButton = screen.getByRole('button', {  name: "Buy"});

  expect(confirmHeading).toBeVisible()
  expect(closeButton).toBeVisible()
  expect(buyButton).toBeVisible()


  fireEvent.click(buyButton);

  const orderHeading = await screen.findByRole('heading', {  name: /orders/i})
  expect(orderHeading).toBeVisible();

  const clearOrderHistoryBtn = screen.getByRole('button', {  name: /clear order history/i});
  expect(clearOrderHistoryBtn).toBeVisible();

  // screen.debug(undefined, 20000);
  const productHeading = await screen.findByRole('heading', {  name: /Blue & Black Check Shirt/i});
  const productPrice = screen.getByText(/£29\.99/i)
  expect(productHeading).toBeVisible();
  expect(productPrice).toBeVisible();
  


});
