import Admin from "./pages/Admin";
import Seller from "./pages/Seller";
import MakingOrder from "./pages/MakingOrder";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Auth from "./pages/Auth";
import Shop from "./pages/Shop";
import FAQ from "./pages/FAQ";
import ForgotPassword from "./pages/ForgotPassword";
import ProductPage from "./pages/ProductPage";
import PageNotFound from "./pages/PageNotFound";
import Helper from "./pages/Helper";
import Contacts from "./pages/Contacts";
import Settings from "./pages/Settings";

import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  CONFIRM_EMAIL_ROUTE,
  CONTACTS_ROUTE,
  FAQ_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  HELPER_ROUTE,
  LOGIN_ROUTE,
  MAKING_ORDER_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
  PRODUCT_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  SELLER_ROUTE,
  SETTINGS_ROUTE,
  SHOP_ROUTE,
  WISHLIST_ROUTE,
} from "./utils/consts";
import Basket from "./pages/Basket";
import ConfirmEmail from "./pages/ConfirmEmail";

export const adminRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: SELLER_ROUTE,
    Component: Seller,
  },
];

export const sellerRoutes = [
  {
    path: SELLER_ROUTE,
    component: Seller,
  },
];

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: MAKING_ORDER_ROUTE,
    Component: MakingOrder,
  },
  {
    path: PROFILE_ROUTE,
    Component: Profile,
  },
  {
    path: WISHLIST_ROUTE,
    Component: Wishlist,
  },
  {
    path: SETTINGS_ROUTE,
    Component: Settings,
  },
];

export const publicRoutes = [
  {
    path: CONFIRM_EMAIL_ROUTE,
    Component: ConfirmEmail,
  },

  {
    path: HELPER_ROUTE,
    Component: Helper,
  },

  {
    path: CONTACTS_ROUTE,
    Component: Contacts,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: FAQ_ROUTE,
    Component: FAQ,
  },
  {
    path: FORGOT_PASSWORD_ROUTE,
    Component: ForgotPassword,
  },
  {
    path: PRODUCT_ROUTE + "/:id",
    Component: ProductPage,
  },
  {
    path: PAGE_NOT_FOUND_ROUTE,
    Component: PageNotFound,
  },
];
