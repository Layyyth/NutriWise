import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingFullPage from "./pages/LoadingFullPage";
import { login, switchLoading } from "./features/accountSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { auth, onAuthStateChanged } from "./models/firebase";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Toaster } from "react-hot-toast";
import Meals from "./pages/Meals";
const SignUp = lazy(() => import("./pages/sign/signup/SignUp"));
const SignIn = lazy(() => import("./pages/sign/signin/SignInSide"));
const SignHeader = lazy(() => import("./pages/sign/SignHeader"));

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AppLayout = lazy(() => import("./ui/AppLayout"));
const InfoForm = lazy(() => import("./ui/InfoForm"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Settings = lazy(() => import("./pages/Settings"));
const ChangeThemeRoute = lazy(() => import("./ui/ChangeThemeRoute"));

import { ThemeProvider } from "./features/themeContext";
import GlobalStyle from "./styles/globalStyles";

const ProtectedRoute = ({ children }) => {
  const { isLoading, isAuthenticated } = useSelector((store) => store.account);

  if (isLoading) return <LoadingFullPage />;
  if (!isAuthenticated) {
    return <Navigate to="/user/signin" />;
  }
  return children;
};

function App() {
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const [dialogMsg, setDialogMsg] = useState("");

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {
      if (!user) return dispatch(switchLoading(false));

      if (!user?.emailVerified) {
        dispatch(switchLoading(false));
        // await setStatus(user.uid, "offline");
        console.log("email not verfied");
        setDialogMsg(`Please verify your email at: ${user.email}`);
        // alert(`Please verify your email at: ${user.email}`);
        return;
      }

      dispatch(login(user.uid)).then((acc) => {
        queryClient.setQueryData([user.uid], acc);
      });
    });

    return () => unSub();
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <GlobalStyle />
      <ThemeProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingFullPage />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/info" element={<InfoForm />} />
                <Route path="/meals" element={<Navigate to={"/dashboard"} />} />
                <Route path="/meals/:type" element={<Meals />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/changetheme" element={<ChangeThemeRoute />} />
              </Route>
              <Route
                path="user"
                element={
                  <>
                    <Dialog open={Boolean(dialogMsg)}>
                      <DialogTitle>{dialogMsg}</DialogTitle>
                      <DialogActions>
                        <Button onClick={() => setDialogMsg("")}>Ok</Button>
                      </DialogActions>
                    </Dialog>
                    <Outlet />
                  </>
                }
              >
                <Route
                  path="/user/signin"
                  element={
                    <>
                      <SignHeader />
                      <SignIn />
                    </>
                  }
                />
                <Route
                  path="/user/signup"
                  element={
                    <>
                      <SignHeader />
                      <SignUp />
                    </>
                  }
                />
                <Route index element={<Navigate to="/user/signin" />} />
              </Route>

              {/* <Route path="/resetpassword" element={null} /> */}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
