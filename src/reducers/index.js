import authReducer from "./auth.reducer";
import userReducer from "./user.reducer";
import categoryReducer from "./category.reducer";
import brandReducer from "./brand.reducer";
import productReducer from "./product.reducer";
import pageReducer from "./page.reducer";
import orderReducer from "./order.reducer";
import accountReducer from "./account.reducer";
import supplierReducer from "./supplier.reducer";
import receiptReducer from "./receipt.reducer";
import { combineReducers } from "redux";

const rootReducer =  combineReducers({
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    page: pageReducer,
    order: orderReducer,
    account: accountReducer,
    supplier: supplierReducer,
    receipt: receiptReducer,
})

export default rootReducer;