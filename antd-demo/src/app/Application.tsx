import React from "react";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Router/router.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";

const queryClient = new QueryClient();

const Application = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
};

export default Application;
