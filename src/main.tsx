import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./utils/i18n.ts";
import Profiles from "./views/Profiles.tsx";
import { AlertProvider } from "./Context/AlertContext.tsx";
import { FetchProvider } from "./Context/FetchContext.tsx";
import { CountryProvider } from "./Context/CountryContext.tsx";
import { SearchProvider } from "./Context/SearchContext.tsx";
import Profile from "./views/Profile.tsx";
import SavedList from "./views/SavedList.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
        <AlertProvider>
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
          </AlertProvider>
    </BrowserRouter>

  </React.StrictMode>,
);
