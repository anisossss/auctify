import totalProdsBenefitsReducer from "./../reducers/totalProdsBenefits";
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counterSlice";
import errorReducer from "../reducers/errorSlice";
import usersReducer from "../reducers/usersListSlice";
import totalUsersReducer from "../reducers/totalUsersSlice";
import totalDannosReducer from "../reducers/totalDannosSlice";
import companiesReducer from "../reducers/companiesListSlice";
import productsReducer from "../reducers/productsSlice";
import totalParticipationsReducer from "../reducers/totalParticipationSlice";
import currentUserReducer from "../reducers/currentUserSLice";
import companyProductsReducer from "../reducers/companyProductsSlice";
import thunkMiddleware from "redux-thunk";
import totalCompaniesReducer from "../reducers/totalCompaniesSlice";
import totalProdsReducer from "../reducers/totalProdsSlice";
import inProgressReducer from "../reducers/inProgressSlice";
import endedProductsReducer from "../reducers/endedProductsSlice";
import settingsReducer from "../reducers/settings";
import dannosPacksReducer from "../reducers/dannosPacksSlice";
import totalProdsByCompanyIdReducer from "../reducers/totalProdsByCompanyIdSlice";
import productsParticipationByCompanyIdReducer from "../reducers/productsParticipationByCompanyIdSlice";
import participationDetailsReducer from "../reducers/participationDetailsSlice";
import inProgressCompanyProductsReducer from "../reducers/inProgressCompanyProductsSlice";
import totalProductsDannosPerMonthReducer from "../reducers/totalProductsPricePerMonthSlice";
import totalDannosParticipationPerMonthReducer from "../reducers/totalDannosParticipationPerMonthSlice";
import totalAmountByCompanyReducer from "../reducers/totalAmountByCompanySlice";
import topParticipantReducer from "../reducers/topParticipantSlice";
import lastAddedProductsReducer from "../reducers/lastAddedProducts";
import getAllProdsReducer from "../reducers/getAllProdsSlice";
import getClassementReducer from "../reducers/getClassementSlice";
import globalSliceReducer from "../reducers/globalSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    error: errorReducer,
    user: usersReducer,
    company: companiesReducer,
    product: productsReducer,
    totalCompanies: totalCompaniesReducer,
    totalUsers: totalUsersReducer,
    totalDannos: totalDannosReducer,
    totalParticipations: totalParticipationsReducer,
    totalProds: totalProdsReducer,
    currentUser: currentUserReducer,
    companyProducts: companyProductsReducer,
    totalProdsBenefits: totalProdsBenefitsReducer,
    inProgressProducts: inProgressReducer,
    endedProducts: endedProductsReducer,
    settings: settingsReducer,
    dannosPacks: dannosPacksReducer,
    totalProdsByCompanyId: totalProdsByCompanyIdReducer,
    productsParticipationByCompanyId: productsParticipationByCompanyIdReducer,
    participationDetails: participationDetailsReducer,
    inProgressCompanyProducts: inProgressCompanyProductsReducer,
    totalProductsDannosPerMonth: totalProductsDannosPerMonthReducer,
    totalDannosParticipationPerMonth: totalDannosParticipationPerMonthReducer,
    totalAmountByCompany: totalAmountByCompanyReducer,
    topParticipant: topParticipantReducer,
    lastAddedProducts: lastAddedProductsReducer,
    getAllProds: getAllProdsReducer,
    getClassement:getClassementReducer,
    global:globalSliceReducer
  },
  middleware: [thunkMiddleware],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
