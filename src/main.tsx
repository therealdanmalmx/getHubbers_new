import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import { CountryProvider } from "./Context/CountryContext.tsx";
import { FetchProvider } from "./Context/FetchContext.tsx";
import { SearchProvider } from "./Context/SearchContext.tsx";
import "./index.css";
import "./utils/i18n.ts";
import Profile from "./views/Profile.tsx";
import Profiles from "./views/Profiles.tsx";
import SavedList from "./views/SavedList.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          className: 'p-4 text-xl',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          }
        }}
      />
      <FetchProvider>
        <CountryProvider>
          <SearchProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/profile/:login" element={<Profile />} />
              <Route path="/profile-list/" element={<SavedList />} />
            </Routes>
            </SearchProvider>
          </CountryProvider>
        </FetchProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
