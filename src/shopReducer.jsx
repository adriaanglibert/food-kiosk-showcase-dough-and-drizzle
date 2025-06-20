export const initialState = {
  total: 0,
  products: [],
  currentProductId: null,
};

const shopReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_BASE":
      return {
        ...state,
        products: [...state.products, payload.product],
        currentProductId: payload.currentProductId
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: payload.products
      };

    case "REMOVE_PRODUCT":
      return {
        ...state,
        products: payload.products,
        currentProductId: payload.currentProductId
      };

    case "UPDATE_PRODUCTS":
      return {
        ...state,
        products: payload.products
      };

    case "UPDATE_TOTAL_PRICE":
      return {
        ...state,
        total: payload.total
      };

    case "START_NEW_PRODUCT":
      return {
        ...state,
        currentProductId: null
      };

    default:
      throw new Error(`No case for type ${type}`);
  }
};

export default shopReducer;