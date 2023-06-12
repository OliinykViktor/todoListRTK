import { configureStore } from "@reduxjs/toolkit";
import todos from '../components/TodoList/TodosSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: next
        });
    }
    return next(action);
}

const isProduction = import.meta.env.PROD;

const devToolsOption = isProduction ? false : true;

const store = configureStore({
    reducer: { todos },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: devToolsOption
});

export default store;
