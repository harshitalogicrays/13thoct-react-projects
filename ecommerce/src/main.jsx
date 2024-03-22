import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './features/Home.jsx'
import Register from './features/Register.jsx'
import Login from './features/Login.jsx'
import Products from './features/Products.jsx'
import PageNotFound from './features/PageNotFound.jsx'
import Dashboard from './features/Admin/Dashboard.jsx'
import { AdminDashboard, DefaultDashboard } from './features/HiddenLinks.jsx'
import AddProduct from './features/Admin/AddProduct.jsx'
import ViewProducts from './features/Admin/ViewProducts.jsx'
import AddSlider from './features/Admin/AddSlider.jsx'
import ViewSlider from './features/Admin/ViewSlider.jsx'
import AddCategory from './features/Admin/AddCategory.jsx'
import ViewCategories from './features/Admin/ViewCategories.jsx'
import Cart from './features/Cart.jsx'
import ProductDetails from './features/ProductDetails.jsx'
import CheckoutDetails from './features/CheckoutDetails.jsx'
import Checkout from './features/Checkout.jsx'
import MyOrders from './features/MyOrders.jsx'
import MyOrderDetails from './features/MyOrderDetails.jsx'
import Order from './features/Admin/Order.jsx'
import OrderDetails from './features/Admin/OrderDetails.jsx'

const router = createBrowserRouter([
  {
    path:'/',element:<App/>,
    children:[
      {path:'',element:<DefaultDashboard> <Home/></DefaultDashboard>},
      {path:'register',element:<Register/>},
      {path:'login',element:<Login  />},
      {path:'products', element:<DefaultDashboard><Products/></DefaultDashboard>},
      {path:'product-details/:id', element:<DefaultDashboard><ProductDetails/></DefaultDashboard>},
      {path:'cart',element:<DefaultDashboard><Cart/></DefaultDashboard>},
      {path:'checkout-details',element:<DefaultDashboard><CheckoutDetails/></DefaultDashboard>},
      {path:'checkout',element:<DefaultDashboard><Checkout/></DefaultDashboard>},
      {path:'myorders',element:<DefaultDashboard><MyOrders/></DefaultDashboard>},
      {path:'myorders/details/:id',element:<DefaultDashboard><MyOrderDetails/></DefaultDashboard>},
      {path:'admin',element:<AdminDashboard><Dashboard/></AdminDashboard>,
        children:[
          {path:'', element:<Dashboard/>},
          {path:'addproduct', element:<AddProduct/>},
          {path:'editproduct/:id', element:<AddProduct/>},
          {path:'viewproducts', element:<ViewProducts/>},
          {path:'addslider', element:<AddSlider/>},
          {path:'viewsliders', element:<ViewSlider/>},
          {path:'editslider/:id', element:<AddSlider/>},
          {path:'addcategory', element:<AddCategory/>},
          {path:'editcategory/:id', element:<AddCategory/>},
          {path:'viewcategories', element:<ViewCategories/>},
          {path:'orders',element:<Order/>},
          {path:'orders/details/:id', element:<OrderDetails/>}
        ]},
      {path:'*', element:<PageNotFound/>}
    ]
  }
])

// const router=createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<App/>}>
//       <Route path='' element={<Home/>}/>
//       <Route path='login' element={<Login/>}/>
//       <Route path='register' element={<Register/>}/>
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
);

