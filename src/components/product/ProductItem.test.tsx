import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductItem from "./ProductItem";
import { productsData } from "../../utils/data/products-data";
import { BrowserRouter } from "react-router";
import { CartItem } from "../../utils/models/cart-model";
import useCartStore from "../../store/cart-store";

describe("ProductItem", () => {
  const mockedProduct = productsData[0];
  afterEach(jest.clearAllMocks);

  it("se renderiza el componente productItem", () => {
    const view = render(
      <BrowserRouter>
        <ProductItem product={mockedProduct} />
      </BrowserRouter>
    );
    expect(view).toBeTruthy();
  });

  it("muestra el botón 'Eliminar del carrito' cuando cartItem.quantity > 0", () => {
    const mockedCartItem: CartItem = {
      product: mockedProduct,
      quantity: 1
    }
    useCartStore.setState({
      items: [mockedCartItem],
    });
    render(
      <BrowserRouter>
        <ProductItem product={mockedProduct} />
      </BrowserRouter>
    );
    const deleteButton = screen.getByRole("button", {
      name: /eliminar del carrito/i,
    });
    expect(deleteButton).toBeInTheDocument();
  })

  it("no muestra el botón 'Eliminar del carrito' cuando cartItem.quantity === 0", () => {
    useCartStore.setState({
      items: [
        {
          product: mockedProduct,
          quantity: 0,
        },
      ],
    });

    render(
      <BrowserRouter>
        <ProductItem product={mockedProduct} />
      </BrowserRouter>
    );

    const deleteButton = screen.queryByRole("button", {
      name: /eliminar del carrito/i,
    });
    expect(deleteButton).not.toBeInTheDocument();
  });

  //TODO: Revisar por que no toma los valores de los TextField de Material UI:
  // it("Reinicia los inputs y elimina el item del carrito al hacer click en 'Eliminar del carrito'", () => {
  //     // Setear el estado inicial del carrito
  //     useCartStore.setState({
  //       items: [
  //         {
  //           product: mockedProduct,
  //           quantity: 1,
  //         },
  //       ],
  //     });

  //   render(
  //     <BrowserRouter>
  //       <ProductItem product={mockedProduct} />
  //     </BrowserRouter>
  //   );
  //   const addButton = screen.getByTestId("add-button")
  //   fireEvent.click(addButton)
  //   fireEvent.click(addButton)
  //   const deleteButton = screen.queryByRole("button", {
  //     name: /eliminar del carrito/i,
  //   });
  //   fireEvent.click(deleteButton!)
  //   return waitFor(() => {
  //     // const cartItemValue = screen.queryByTestId("cartitem-value") as HTMLInputElement
  //     const quantityInput = screen.getByRole("spinbutton", { name: /quantity/i }) as HTMLInputElement;
  //     // expect(cartItemValue.value).toBe("0")
  //     expect(quantityInput.value).toBe("0")
  //   })
  // });
});
