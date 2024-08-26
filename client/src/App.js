import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from 'queryClient';
import AuthContextProvider from 'store/AuthContextLayout';

import Root, { loader as rootLoader } from 'pages/Root';
import Homepage, { loader as homeLoader } from 'pages/Home';
import LoginPage from 'pages/Login';
import SignupPage from 'pages/Signup';
import ProgramsPage, {
  loader as programsLoader,
} from 'pages/Programs/Programs';
import BootcampsRoot from 'pages/Bootcamp/BootcampsRoot';
import AllBootcamps, {
  loader as allBootcampsLoader,
} from 'pages/Bootcamp/AllBootcamps';
import MyBootcamps from 'pages/Bootcamp/MyBootcamps';
import BootcampPage, {
  loader as bootcampLoader,
  action as deleteBootcampAction,
} from 'pages/Bootcamp/BootcampPage';
import NewBootcamp, {
  action as publishBootcamp,
} from 'pages/Bootcamp/NewBootcamp';
import EditBootcampPage, {
  action as updateBootcampAction,
} from 'pages/Bootcamp/EditBootcamp';

import login from 'actions/login';
import logout from 'actions/logout';
import signup from 'actions/signup';
import BootcampContextLayout from 'store/BootcampContextLayout';

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
        <Route index element={<Homepage />} loader={homeLoader} />
        <Route path="login" element={<LoginPage />} action={login} />
        <Route path="signup" element={<SignupPage />} action={signup} />
        <Route
          path="programs"
          element={<ProgramsPage />}
          loader={programsLoader}
        />

        {/* <Route element={<BootcampContextLayout />}>
          <Route path="bootcamps" element={<BootcampsRoot />}>
            <Route
              index
              element={<AllBootcamps />}
              loader={allBootcampsLoader}
            />
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
        </Route> */}
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
