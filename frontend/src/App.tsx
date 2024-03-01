import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientHome from "./pages/ClientHome/ClientHome";
import AuthPage from "./pages/Login_Register/LoginPage";
import RegisterPage from "./pages/Login_Register/RegisterPage";
import AllDishesPage from "./pages/Dishes/AllDishes";
import TestPage from "./pages/Test";
import Dishes from "./pages/Admin/Dishes/Dishes";
import { Requests } from "./pages/Admin/Requests/page";
import CartsPage from "./pages/Carts/CartsPage";
import TokenVerificationPage from "./pages/Login_Register/TokenVerificationPage";
import PasswordResetPage from "./pages/Login_Register/PasswordResetPage";
import { useState } from "react";
import { SearchContext } from "./Components/Common/Contexts";
import ProgressPage from "./pages/InProgress";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <ClientHome /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/auth/register", element: <RegisterPage /> },
  { path: "/auth/verify", element: <TokenVerificationPage /> },
  { path: "/auth/reset", element: <PasswordResetPage /> },
  { path: "/dishes", element: <AllDishesPage /> },
  { path: "/requests", element: <ProgressPage /> },
  { path: "/wishlist", element: <ProgressPage /> },
  { path: "/carts", element: <CartsPage /> },
  { path: "/test", element: <TestPage /> },
  { path: "/admin/dishes", element: <Dishes /> },
  { path: "/admin/requests", element: <Requests /> },
]);

function App() {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SearchContext.Provider>
  );
}

export default App;
