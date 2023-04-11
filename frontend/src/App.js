import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeScreen from '../src/screens/HomeScreen.js';
import LoginScreen from '../src/screens/LoginScreen.js';
import RegisterScreen from '../src/screens/RegisterScreen.js';
import RootLayout from '../src/components/Root.js';
import Loader from './components/Loader.js';
const CartScreen = lazy(() => import('./screens/CartScreen.js'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen.js'));
const ShippingScreen = lazy(() => import('./screens/ShippingScreen.js'));
const PaymentMethodScreen = lazy(() =>
  import('./screens/PaymentMethodScreen.js')
);
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen.js'));
const OrderScreen = lazy(() => import('./screens/OrderScreen.js'));
const OrderListScreen = lazy(() => import('./screens/OrderListScreen.js'));
const UserListScreen = lazy(() => import('./screens/UserListScreen.js'));
const UserEditScreen = lazy(() => import('./screens/UserEditScreen.js'));
const ProductListScreen = lazy(() => import('./screens/ProductListScreen.js'));
const ProductEditScreen = lazy(() => import('./screens/ProductEditScreen.js'));
const ProductScreen = lazy(() => import('./screens/ProductScreen.js'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomeScreen />,
      },
      {
        path: '/search/:keyword',
        element: <HomeScreen />,
      },
      {
        path: '/page/:pageNumber',
        element: <HomeScreen />,
      },
      {
        path: '/search/:keyword/page/:pageNumber',
        element: <HomeScreen />,
        end: true,
      },
      {
        path: 'product/:id',

        element: (
          <Suspense fallback={<Loader />}>
            <ProductScreen />
          </Suspense>
        ),
      },
      {
        path: 'admin/userlist',
        element: (
          <Suspense fallback={<Loader />}>
            <UserListScreen />
          </Suspense>
        ),
      },
      {
        path: 'admin/user/:id/edit',
        element: (
          <Suspense fallback={<Loader />}>
            <UserEditScreen />
          </Suspense>
        ),
      },
      {
        path: 'admin/productlist',
        element: (
          <Suspense fallback={<Loader />}>
            <ProductListScreen />
          </Suspense>
        ),
      },
      {
        path: 'admin/productlist/:pageNumber',
        end: true,
        element: (
          <Suspense fallback={<Loader />}>
            <ProductListScreen />
          </Suspense>
        ),
      },
      {
        path: 'admin/product/:id/edit',
        element: (
          <Suspense fallback={<Loader />}>
            <ProductEditScreen />{' '}
          </Suspense>
        ),
      },
      {
        path: 'cart/:id?',
        element: (
          <Suspense fallback={<Loader />}>
            <CartScreen />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: <LoginScreen />,
      },
      {
        path: 'register',
        element: <RegisterScreen />,
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<Loader />}>
            <ProfileScreen />
          </Suspense>
        ),
      },
      {
        path: 'shipping',
        element: (
          <Suspense fallback={<Loader />}>
            <ShippingScreen />
          </Suspense>
        ),
      },
      {
        path: 'payment',
        element: (
          <Suspense fallback={<Loader />}>
            <PaymentMethodScreen />
          </Suspense>
        ),
      },
      {
        path: 'placeorder',
        element: (
          <Suspense fallback={<Loader />}>
            <PlaceOrderScreen />
          </Suspense>
        ),
      },
      {
        path: 'order/:id',
        element: (
          <Suspense fallback={<Loader />}>
            <OrderScreen />
          </Suspense>
        ),
      },
      {
        path: '/admin/orderlist',
        element: (
          <Suspense fallback={<Loader />}>
            <OrderListScreen />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

//DONE
export default App;
