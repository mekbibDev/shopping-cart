import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Product from "./Product";
import { expect, vi, it } from "vitest";

const product = {
  id: 0,
  title: "bluh",
  imageUrl: "bluh",
  price: 10,
  rating: { rate: 2, count: 30 },
  description: "water",
  selectedAmount: 1,
};
it("calls add amount handler when it is called", async () => {
  const handleAdding = vi.fn();
  const user = userEvent.setup();
  render(
    <Product
      id={product.id}
      title={product.title}
      price={product.price}
      rating={product.rating}
      description={product.description}
      handleAdding={handleAdding}
    ></Product>,
  );
  const button = screen.getByRole("button");
  await user.click(button);
  expect(handleAdding).toHaveBeenCalled();
});
it("doesn't call the add handler when it isn't clicked", () => {
  const handleAdding = vi.fn();
  render(
    <Product
      id={product.id}
      title={product.title}
      price={product.price}
      rating={product.rating}
      description={product.description}
      handleAdding={handleAdding}
    ></Product>,
  );

  expect(handleAdding).not.toHaveBeenCalled();
});

it("displays an input text and an add to cart button instead of the amount when cart is set to false", () => {
  const handleAdding = vi.fn();
  render(
    <Product
      id={product.id}
      title={product.title}
      price={product.price}
      rating={product.rating}
      description={product.description}
      handleAdding={handleAdding}
    ></Product>,
  );
  expect(() =>
    screen.getByRole("heading", { name: `Amount:${product.selectedAmount}` }),
  ).toThrow();
  expect(() => screen.getByRole("spinbutton")).not.toThrow();
  expect(() => screen.getByRole("button", { name: `Add to cart` })).not.throw();
});

it("displays the amount instead of input and add to cart button when cart is set to true", () => {
  const handleAdding = vi.fn();
  render(
    <Product
      id={product.id}
      title={product.title}
      price={product.price}
      rating={product.rating}
      description={product.description}
      selectedAmount={product.selectedAmount}
      handleAdding={handleAdding}
      cart={true}
    ></Product>,
  );
  expect(() => screen.getByRole("spinbutton")).toThrow();
  expect(() => screen.getByRole("button", { name: `Add to cart` })).throw();
  expect(() =>
    screen.getByRole("heading", { name: `Amount:${product.selectedAmount}` }),
  ).not.toThrow();
});
