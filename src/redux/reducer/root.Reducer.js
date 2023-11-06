import { combineReducers } from "redux";
import authenReducer from "../authen/authen.reducer";
import storeReducer from "../store/store.reducer";
import employeeReducer from "../employee/employee.reducer";
import customerReducer from "../customer/customer.reducer";
import storageAreaReducer from "../storageArea/storageArea.reducer";
import categoryReducer from "../category/category.reducer";
import shelveReducer from "../shelve/shelve.reducer";
import cellReducer from "../cell/cell.reducer";
import rackReducer from "../rack/rack.reducer";

const rootReducer = combineReducers({
    authen: authenReducer,
    store: storeReducer,
    employee: employeeReducer,
    customer: customerReducer,
    storageArea: storageAreaReducer,
    category: categoryReducer,
    shelve: shelveReducer,
    cell: cellReducer,
    rack: rackReducer
})

export default rootReducer;