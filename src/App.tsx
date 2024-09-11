import "./App.css";
import Alert from "./components/Alert";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchField from "./components/SearchField";
import { AlertProvider } from "./Context/AlertContext";
import { CountryProvider } from "./Context/CountryContext";
import { SearchProvider } from "./Context/SearchContext";

function App() {
  return (
    <CountryProvider>
      <AlertProvider>
        <SearchProvider>
          <div className="flex h-screen flex-col justify-start">
            <NavBar />
            <Alert />

            <SearchBar />
            <div className="flex h-96 items-center justify-center">
              <SearchField />
            </div>
          </div>
        </SearchProvider>
      </AlertProvider>
    </CountryProvider>
  );
}

export default App;
