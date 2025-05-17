import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "../App";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  Unsubscribe,
  User,
} from "firebase/auth";
import { mockedProductsJSONRes, mockUser } from "./sampleData";


vi.mock("firebase/auth", async () => {
  let actual: any = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signInWithEmailAndPassword: vi.fn(),
    onAuthStateChanged: vi.fn(),
  };
});

beforeEach(() => {
  global.fetch = vi.fn(
    async (): Promise<Response> =>
      Promise.resolve({
        json: async () => mockedProductsJSONRes,
      } as Response)
  );

  vi.mocked(onAuthStateChanged).mockImplementation(
    (_: any, callback: any): Unsubscribe => {
      callback(null);
      return vi.fn();
    }
  );

  window.scroll = vi.fn<[options?: ScrollToOptions]>();
});

afterEach(() => {
  vi.resetAllMocks();
});


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
  // mock logged in user
  vi.mocked(onAuthStateChanged).mockImplementationOnce(
    (_: any, callback: any): Unsubscribe => {
      callback(mockUser as User);
      return vi.fn();
    }
  );
  vi.mocked(signInWithEmailAndPassword).mockResolvedValue({
    operationType: "signIn",
    providerId: "123",
    user: mockUser as User,
  });
  render(<App />);

  // Verify user: name@emailAddress is logged in.

  const loginButtonContainer = await screen.findByTestId("login navbar button");
  expect(loginButtonContainer).toBeVisible();
  // screen.debug(undefined, 20000);
  const loginInfoButton =
    within(loginButtonContainer).getByLabelText("Logged In User");
  expect(loginInfoButton).toBeVisible();
  fireEvent.click(loginInfoButton);
  const closeLoginInfoButton = await within(loginButtonContainer).findByRole(
    "button",
    {
      name: /x/i,
    }
  );
  expect(closeLoginInfoButton).toBeVisible();

  const emailInfoHeading = screen.getByRole("heading", {
    name: /signed in as: name@emailAddress\.com/i,
  });
  expect(emailInfoHeading).toBeVisible();

  // verify two sample products are visible
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

  // verify on checkout page.

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

  // Confirm purchase on modal
  const confirmHeading = await screen.findByText(/confirm/i);
  const closeButton = screen.getByRole("button", { name: /close/i });
  const buyButton = screen.getByRole("button", { name: "Buy" });

  expect(confirmHeading).toBeVisible();
  expect(closeButton).toBeVisible();
  expect(buyButton).toBeVisible();

  // purchase products
  fireEvent.click(buyButton);

  // confirm order was submitted on order page.
  const orderHeading = await screen.findByRole("heading", { name: /orders/i });
  expect(orderHeading).toBeVisible();

  const clearOrderHistoryBtn = screen.getByRole("button", {
    name: /clear order history/i,
  });
  expect(clearOrderHistoryBtn).toBeVisible();

  // screen.debug(undefined, 20000);
  const productHeading = await screen.findByRole("heading", {
    name: /Blue & Black Check Shirt/i,
  });
  const productPrice = screen.getByText(/£29\.99/i);
  expect(productHeading).toBeVisible();
  expect(productPrice).toBeVisible();
});
