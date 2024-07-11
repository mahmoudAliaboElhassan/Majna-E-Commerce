import React, { Suspense } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Loader from "@components/loader";
import ErrorPage from "@pages/errorPage/index.jsx";
import Home from "@pages/home.jsx";
import RootLayout from "@pages/RootLayout.jsx";
import ProtectedRoute from "@components/protectedRoute.jsx";

const RootProductList = React.lazy(() =>
  import("@pages/productList/rootProductList.jsx")
);
const ProductType = React.lazy(() =>
  import("@pages/productList/productType.jsx")
);
const ResetPassword = React.lazy(() =>
  import("@pages/authentication/user/reset-password.jsx")
);

const Activation = React.lazy(() =>
  import("@pages/authentication/activation/index.jsx")
);

const AboutUsPage = React.lazy(() => import("@pages/about"));

const SignUpPage = React.lazy(() =>
  import("@pages/authentication/user/signUp.jsx")
);

const LoginPage = React.lazy(() =>
  import("@pages/authentication/user/login.jsx")
);

const ContactUsPage = React.lazy(() => import("@pages/contacts"));

const ChangePassword = React.lazy(() =>
  import("@pages/authentication/user/change-password.jsx")
);

const ForgetPassword = React.lazy(() =>
  import("@pages/authentication/user/forget-password.jsx")
);

const RootProductLayout = React.lazy(() =>
  import("@pages/distributorPanel/rootDistributorPanel.jsx")
);
const ApprovedBrands = React.lazy(() =>
  import("@pages/distributorPanel/aprovedBrands.jsx")
);
const AllBrandsApplications = React.lazy(() =>
  import("@pages/distributorPanel/allBrandsApplications.jsx")
);
const AllStores = React.lazy(() => import("@pages/distributorPanel/stores"));
const AddStore = React.lazy(() =>
  import("@pages/distributorPanel/addStore.jsx")
);
const AddBrand = React.lazy(() =>
  import("@pages/distributorPanel/addBrand.jsx")
);

const AddProduct = React.lazy(() =>
  import("@pages/distributorPanel/addProduct.jsx")
);

const EditStore = React.lazy(() =>
  import("@pages/distributorPanel/editStore.jsx")
);

const CardProductDetails = React.lazy(() =>
  import("@pages/distributorPanel/productDetails.jsx")
);

const RootReviewerLayout = React.lazy(() =>
  import("@pages/reviewer/rootReviewerLayout.jsx")
);

const IndexReviewer = React.lazy(() => import("@pages/reviewer/index.jsx"));

const Profile = React.lazy(() => import("@pages/reviewer/profile.jsx"));
const BrnadApplication = React.lazy(() =>
  import("@pages/reviewer/brnadApplication.jsx")
);
const ShoppingCart = React.lazy(() => import("@pages/shoppingCart"));
const SpecificCartItem = React.lazy(() =>
  import("@pages/shoppingCart/specifcCart")
);
const Favorite = React.lazy(() => import("@pages/favorite"));
const ProductInformation = React.lazy(() =>
  import("@pages/productInformation")
);
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
        path: "product-data/:productId",
        element: (
          <Suspense fallback={<Loader />}>
            <ProductInformation />{" "}
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
            <RootProductLayout />
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
        ],
      },
      {
        path: "product/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <CardProductDetails />
          </Suspense>
        ),
      },
      {
        path: "productlist",
        element: (
          <Suspense fallback={<Loader />}>
            <RootProductList />
          </Suspense>
        ),
        children: [
          {
            path: ":producttype",
            element: <ProductType />,
          },
        ],
      },
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
      { path: "ordered", element: <div>Ordered</div> },
      {
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
            path: "profile",
            element: (
              <Suspense fallback={<Loader />}>
                <Profile />
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
