import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import "mdb-ui-kit/css/mdb.min.css";

import "./i18next.js";
import store from "./state/store.js";
import Loader from "./components/loader/index.jsx";
import ErrorPage from "./pages/errorPage.jsx";
import IndexElement from "./pages/indexElement.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

const ResetPassword = React.lazy(() =>
  import("./pages/authentication/user/reset-password.jsx")
);

const Activation = React.lazy(() =>
  import("./pages/authentication/activation/index.jsx")
);

const AboutUsPage = React.lazy(() => import("./pages/about.jsx"));

const SignUpPage = React.lazy(() =>
  import("./pages/authentication/user/signUp.jsx")
);

const LoginPage = React.lazy(() =>
  import("./pages/authentication/user/login.jsx")
);

const ContactUsPage = React.lazy(() => import("./pages/contacts.jsx"));

const ChangePassword = React.lazy(() =>
  import("./pages/authentication/user/change-password.jsx")
);

const ForgetPassword = React.lazy(() =>
  import("./pages/authentication/user/forget-password.jsx")
);

const RootProductLayout = React.lazy(() =>
  import("./pages/distributorPanel/rootDistributorPanel.jsx")
);
const ApprovedBrands = React.lazy(() =>
  import("./pages/distributorPanel/aprovedBrands.jsx")
);
const AllBrandsApplications = React.lazy(() =>
  import("./pages/distributorPanel/allBrandsApplications.jsx")
);
const AllStores = React.lazy(() => import("./pages/distributorPanel/stores"));
const AddStore = React.lazy(() =>
  import("./pages/distributorPanel/addStore.jsx")
);
const AddBrand = React.lazy(() =>
  import("./pages/distributorPanel/addBrand.jsx")
);

const AddProduct = React.lazy(() =>
  import("./pages/distributorPanel/addProduct.jsx")
);

const EditStore = React.lazy(() =>
  import("./pages/distributorPanel/editStore.jsx")
);

const CardProductDetails = React.lazy(() =>
  import("./pages/distributorPanel/productDetails.jsx")
);

const RootReviewerLayout = React.lazy(() =>
  import("./pages/reviewer/rootReviewerLayout.jsx")
);

const IndexReviewer = React.lazy(() => import("./pages/reviewer/index.jsx"));

const Profile = React.lazy(() => import("./pages/reviewer/profile.jsx"));
const BrnadApplication = React.lazy(() =>
  import("./pages/reviewer/brnadApplication.jsx")
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
            <IndexElement />{" "}
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
            path: "edit-store/:id",
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
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
