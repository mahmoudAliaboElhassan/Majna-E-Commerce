import React, { Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Loader from "@components/loader";
import ErrorPage from "@pages/errorPage/index";
import Home from "@pages/home";
import RootLayout from "@pages/RootLayout";

const ResetPassword = React.lazy(() =>
  import("@pages/authentication/user/reset-password")
);

const Activation = React.lazy(() =>
  import("@pages/authentication/activation/index")
);

const AboutUsPage = React.lazy(() => import("@pages/about"));

const SignUpPage = React.lazy(() =>
  import("@pages/authentication/user/signUp")
);

const LoginPage = React.lazy(() =>
  import("@pages/authentication/user/login")
);

const ContactUsPage = React.lazy(() => import("@pages/contacts"));

const ChangePassword = React.lazy(() =>
  import("@pages/authentication/user/change-password")
);

const ForgetPassword = React.lazy(() =>
  import("@pages/authentication/user/forget-password")
);

const RootDistributorPanelLayout = React.lazy(() =>
  import("@pages/distributorPanel/rootDistributorPanel")
);
const ApprovedBrands = React.lazy(() =>
  import("@pages/distributorPanel/aprovedBrands")
);
const AllBrandsApplications = React.lazy(() =>
  import("@pages/distributorPanel/allBrandsApplications")
);
const AllStores = React.lazy(() => import("@pages/distributorPanel/stores"));

const UploadedProducts = React.lazy(() => import("@pages/distributorPanel/upploadedProducts"));

const AddStore = React.lazy(() =>
  import("@pages/distributorPanel/addStore")
);
const AddBrand = React.lazy(() =>
  import("@pages/distributorPanel/addBrand")
);

const AddProduct = React.lazy(() =>
  import("@pages/distributorPanel/addProduct")
);

const EditStore = React.lazy(() =>
  import("@pages/distributorPanel/editStore")
);
const EditProduct = React.lazy(() =>
  import("@pages/distributorPanel/editProduct")
);

// const CardProductDetails = React.lazy(() =>
//   import("@pages/distributorPanel/productDetails")
// );

const RootReviewerLayout = React.lazy(() =>
  import("@pages/reviewer/rootReviewerLayout")
);

const IndexReviewer = React.lazy(() => import("@pages/reviewer/index"));

const BrnadApplication = React.lazy(() =>
  import("@pages/reviewer/brnadApplication")
);
const ShoppingCart = React.lazy(() => import("@pages/shoppingCart"));
const SpecificCartItem = React.lazy(() =>
  import("@pages/shoppingCart/specifcCart")
);
const Favorite = React.lazy(() => import("@pages/favorite"));
const ProductView = React.lazy(() =>
  import("@pages/productView")
);
const RootCustomerPanelLayOut = React.lazy(() => import("@pages/customerPanel/rootCustomerPanel"))
const Addresses = React.lazy(() => import("@pages/customerPanel/addresses"))
const AddAddress = React.lazy(() => import("@pages/customerPanel/addAddress"))
const EditAddress = React.lazy(() => import("@pages/customerPanel/editAddress"))
const Orders = React.lazy(() => import("@pages/customerPanel/orders"))
const Discover = React.lazy(() => import("@pages/discover"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Home />{" "}
          </Suspense>
        ),
      },
      {
        path: "product-view/:productId",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductView />{" "}
          </Suspense>
        ),
      },
      {
        path: "favorite",
        element: (
          <Suspense fallback={<Loader />}>
            <Favorite />{" "}
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<Loader />}>
            <LoginPage />{" "}
          </Suspense>
        ),
      },
      {
        path: "signup",
        element: (
          <Suspense fallback={<Loader />}>
            {" "}
            <SignUpPage />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<Loader />}>
            <AboutUsPage />{" "}
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Loader />}>
            {" "}
            <ContactUsPage />
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ChangePassword />
          </Suspense>
        ),
      },
      {
        path: "distributor-control-panel",
        element: (
          <Suspense fallback={<Loader />}>
            {/* <ProtectedRoute> */}
            <RootDistributorPanelLayout />
            {/* </ProtectedRoute> */}
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <AllBrandsApplications />
              </Suspense>
            ),
          },
          {
            path: "approved-brands",
            element: (
              <Suspense fallback={<Loader />}>
                <ApprovedBrands />
              </Suspense>
            ),
          },
          {
            path: "all-brands-application",
            element: (
              <Suspense fallback={<Loader />}>
                <AllBrandsApplications />
              </Suspense>
            ),
          },
          {
            path: "uploaded-products",
            element: (
              <Suspense fallback={<Loader />}>
                <UploadedProducts />
              </Suspense>
            ),
          },
          {
            path: "add-brand",
            element: (
              <Suspense fallback={<Loader />}>
                <AddBrand />
              </Suspense>
            ),
          },
          {
            path: "add-store",
            element: (
              <Suspense fallback={<Loader />}>
                <AddStore />
              </Suspense>
            ),
          },
          {
            path: "add-product",
            element: (
              <Suspense fallback={<Loader />}>
                <AddProduct />
              </Suspense>
            ),
          },
          {
            path: "all-stores",
            element: (
              <Suspense fallback={<Loader />}>
                <AllStores />
              </Suspense>
            ),
          },
          {
            path: "edit-store/:storeId",
            element: (
              <Suspense fallback={<Loader />}>
                <EditStore />
              </Suspense>
            ),
          },
          {
            path: "edit-product/:productId",
            element: (
              <Suspense fallback={<Loader />}>
                <EditProduct />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "customer-control-panel",
        element: (
          <Suspense fallback={<Loader />}>
            <RootCustomerPanelLayOut />
          </Suspense>
        ), children:
          [
            {
              index: true,
              element: (
                <Suspense fallback={<Loader />}>
                  <Addresses />
                </Suspense>
              )
            },
            {
              path: "addresses",
              element: (
                <Suspense fallback={<Loader />}>
                  <Addresses />
                </Suspense>
              )
            },
            {
              path: "add-address",
              element: (
                <Suspense fallback={<Loader />}>
                  <AddAddress />
                </Suspense>
              )
            },
            {
              path: "edit-address/:addressId",
              element: (
                <Suspense fallback={<Loader />}>
                  <EditAddress />
                </Suspense>
              )
            },
            {
              path: "orders",
              element: (
                <Suspense fallback={<Loader />}>
                  <Orders />
                </Suspense>
              )
            },
          ]
      },
      // {
      //   path: "product/:id",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <CardProductDetails />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "productlist",
      //   element: (
      //     <Suspense fallback={<Loader />}>
      //       <RootProductList />
      //     </Suspense>
      //   ),
      //   children: [
      //     {
      //       path: ":producttype",
      //       element: <ProductType />,
      //     },
      //   ],
      // },
      {
        path: "activate-account/:uid/:token",
        element: (
          <Suspense fallback={<Loader />}>
            <Activation />
          </Suspense>
        ),
      },
      {
        path: "forget-password",
        element: (
          <Suspense fallback={<Loader />}>
            <ForgetPassword />
          </Suspense>
        ),
      },
      {
        path: "reset-password/:uid/:token",
        element: (
          <Suspense fallback={<Loader />}>
            <ResetPassword />
          </Suspense>
        ),
      },
      {
        path: "discover",
        element: (
          <Suspense fallback={<Loader />}>
            <Discover />
          </Suspense>
        )
      }, {
        path: "/reviewer",
        element: (
          <Suspense fallback={<Loader />}>
            <RootReviewerLayout />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loader />}>
                <IndexReviewer />
              </Suspense>
            ),
          },
          {
            path: "brand/:ApplicationId",
            element: (
              <Suspense fallback={<Loader />}>
                <BrnadApplication />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "shooping-cart",
        element: (
          <Suspense fallback={<Loader />}>
            <ShoppingCart />
          </Suspense>
        ),
      },
      {
        path: "cart-item/:cartId",
        element: (
          <Suspense fallback={<Loader />}>
            <SpecificCartItem />
          </Suspense>
        ),
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
