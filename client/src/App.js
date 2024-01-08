import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import AuthContextProvider from "store/AuthContextLayout";

import Root, { loader as rootLoader } from "pages/Root";
import Homepage from "components/Homepage";
import LoginPage from "pages/Login";
import BootcampsRoot from "pages/Bootcamp/BootcampsRoot";
import AllBootcamps, {
  loader as allBootcampsLoader,
} from "pages/Bootcamp/AllBootcamps";
import MyBootcamps from "pages/Bootcamp/MyBootcamps";
import BootcampPage, {
  loader as bootcampLoader,
  action as deleteBootcampAction,
} from "pages/Bootcamp/BootcampPage";
import NewBootcamp, {
  action as publishBootcamp,
} from "pages/Bootcamp/NewBootcamp";
import EditBootcampPage, {
  action as updateBootcampAction,
} from "pages/Bootcamp/EditBootcamp";

import login from "actions/login";
import logout from "actions/logout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthContextProvider />}>
      <Route
        exact
        loader={rootLoader}
        action={logout}
        path="/"
        element={<Root />}
      >
        <Route index element={<Homepage />} />
        <Route path="login" element={<LoginPage />} action={login} />

        <Route path="bootcamps" element={<BootcampsRoot />}>
          <Route index element={<AllBootcamps />} loader={allBootcampsLoader} />
          <Route path="my-bootcamps" element={<MyBootcamps />} />
        </Route>

        <Route
          path="bootcamps/:bootcampId"
          loader={bootcampLoader}
          action={deleteBootcampAction}
          element={<BootcampPage />}
        />
        <Route
          path="bootcamps/:bootcampId/edit"
          element={<EditBootcampPage />}
          action={updateBootcampAction}
        />
        <Route
          path="bootcamps/new"
          element={<NewBootcamp />}
          action={publishBootcamp}
        />
      </Route>
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

// const router = createBrowserRouter([
//   {
//     // provide AuthContext to all routes
//     element: <AuthContextLayout />,
//     children: [
//       {
//         path: "/",
//         element: <RootLayout />,
//         id: "root",
//         children: [
//           { index: true, element: <HomePage /> },
//           {
//             path: "bootcamps",
//             element: <BootcampsRootLayout />,
//             id: "bootcampsRoot",
//             loader: bootcampsLoader,
//             children: [
//               {
//                 index: true,
//                 element: <BootcampsPage />,
//               },
//               {
//                 path: ":bootcampId",
//                 element: <BootcampDetailLayout />,
//                 id: "bootcampDetail",
//                 loader: bootcampLoader,
//                 children: [
//                   {
//                     index: true,
//                     element: <BootcampDetailPage />,
//                     action: deleteBootcampAction,
//                   },
//                   {
//                     path: "edit",
//                     element: <EditBootcampPage />,
//                     action: editAction,
//                   },
//                   {
//                     path: "new-bootcamp-courses",
//                     element: <AddCoursesPage />,
//                     loader: coursesLoader,
//                     action: coursesAction,
//                   },
//                 ],
//               },
//               {
//                 path: "new",
//                 element: <NewBootcampPage />,
//                 action: newBootcampAction,
//               },
//             ],
//           },
//           {
//             path: "login",
//             element: <LoginPage />,
//             action: authAction,
//           },
//           {
//             path: "signup",
//             element: <SignupPage />,
//             action: signupAction,
//           },
//           {
//             path: "logout",
//             action: logoutAction,
//           },
//         ],
//       },
//     ],
//   },
// ]);

// const App = () => {
//   return <RouterProvider router={router} />;
// };

export default App;
