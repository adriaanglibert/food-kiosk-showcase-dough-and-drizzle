import { createContext, useReducer, useContext } from "react";
import shopReducer, { initialState } from "./shopReducer";

const ShopContext = createContext(initialState);

export const ShopProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shopReducer, initialState);

  const areProductsIdentical = (product1, product2) => {
    return (
      product1.base === product2.base &&
      product1.toppings.length === product2.toppings.length &&
      product1.extras.length === product2.extras.length &&
      product1.toppings.every(topping => product2.toppings.includes(topping)) &&
      product1.extras.every(extra => product2.extras.includes(extra))
    );
  };

  const addBase = (base) => {
    const newProduct = {
      id: Date.now(),
      base: base.title,
      basePrice: base.price,
      toppings: [],
      extras: [],
      totalPrice: base.price,
      quantity: 1,
      image: base.image
    };

    dispatch({
      type: "ADD_BASE",
      payload: {
        product: newProduct,
        currentProductId: newProduct.id
      },
    });

    updateTotalPrice([...state.products, newProduct]);
  };

  const addTopping = (topping) => {
    const currentProduct = state.products.find(p => p.id === state.currentProductId);

    if (!currentProduct) return;

    const toppingExists = currentProduct.toppings.includes(topping.title);

    let updatedProduct;
    if (toppingExists) {
      updatedProduct = {
        ...currentProduct,
        toppings: currentProduct.toppings.filter(t => t !== topping.title),
        totalPrice: currentProduct.totalPrice - topping.price
      };
    } else {
      updatedProduct = {
        ...currentProduct,
        toppings: [...currentProduct.toppings, topping.title],
        totalPrice: currentProduct.totalPrice + topping.price
      };
    }

    const updatedProducts = state.products.map(p =>
      p.id === state.currentProductId ? updatedProduct : p
    );

    dispatch({
      type: "UPDATE_PRODUCT",
      payload: {
        products: updatedProducts
      },
    });

    updateTotalPrice(updatedProducts);
  };

  const addExtra = (extra) => {
    const currentProduct = state.products.find(p => p.id === state.currentProductId);

    if (!currentProduct) return;

    const extraExists = currentProduct.extras.includes(extra.title);

    let updatedProduct;
    if (extraExists) {
      updatedProduct = {
        ...currentProduct,
        extras: currentProduct.extras.filter(e => e !== extra.title),
        totalPrice: currentProduct.totalPrice - extra.price
      };
    } else {
      updatedProduct = {
        ...currentProduct,
        extras: [...currentProduct.extras, extra.title],
        totalPrice: currentProduct.totalPrice + extra.price
      };
    }

    const updatedProducts = state.products.map(p =>
      p.id === state.currentProductId ? updatedProduct : p
    );

    dispatch({
      type: "UPDATE_PRODUCT",
      payload: {
        products: updatedProducts
      },
    });

    updateTotalPrice(updatedProducts);
  };

  const finalizeProduct = () => {
    const currentProduct = state.products.find(p => p.id === state.currentProductId);
    if (!currentProduct) return;

    const existingProduct = state.products.find(p =>
      p.id !== currentProduct.id && areProductsIdentical(p, currentProduct)
    );

    let updatedProducts;
    if (existingProduct) {
      updatedProducts = state.products
        .filter(p => p.id !== currentProduct.id)
        .map(p => {
          if (p.id === existingProduct.id) {
            return {
              ...p,
              quantity: p.quantity + 1
            };
          }
          return p;
        });
    } else {
      updatedProducts = state.products;
    }

    dispatch({
      type: "UPDATE_PRODUCTS",
      payload: {
        products: updatedProducts
      },
    });

    updateTotalPrice(updatedProducts);
    startNewProduct();
  };

  const removeProduct = (productId) => {
    const updatedProducts = state.products.filter(p => p.id !== productId);

    dispatch({
      type: "REMOVE_PRODUCT",
      payload: {
        products: updatedProducts,
        currentProductId: state.currentProductId === productId ? null : state.currentProductId
      },
    });

    updateTotalPrice(updatedProducts);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedProducts = state.products.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          quantity: newQuantity
        };
      }
      return p;
    });

    dispatch({
      type: "UPDATE_PRODUCTS",
      payload: {
        products: updatedProducts
      },
    });

    updateTotalPrice(updatedProducts);
  };

  const updateTotalPrice = (products) => {
    let total = 0;
    products.forEach((product) => {
      total += product.totalPrice * product.quantity;
    });

    dispatch({
      type: "UPDATE_TOTAL_PRICE",
      payload: {
        total
      },
    });
  };

  const startNewProduct = () => {
    dispatch({
      type: "START_NEW_PRODUCT",
      payload: {},
    });
  };

  const value = {
    products: state.products,
    currentProductId: state.currentProductId,
    total: state.total,
    addBase,
    addTopping,
    addExtra,
    removeProduct,
    updateQuantity,
    startNewProduct,
    finalizeProduct
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

const useShop = () => {
  const context = useContext(ShopContext);

  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

export default useShop;