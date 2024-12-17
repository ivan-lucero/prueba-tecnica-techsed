import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductItem from "./ProductItem";
import { productsData } from "../../utils/data/products-data";
import { BrowserRouter } from "react-router";

describe("product item", () => {
  const mockedProduct = productsData[0];

  afterEach(jest.clearAllMocks);

  it("renders product item component", () => {
    const view = render(
      <BrowserRouter>
        <ProductItem product={mockedProduct} />
      </BrowserRouter>
    );
    expect(view).toBeTruthy();
  });
});
