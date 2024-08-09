import "./App.css";
import Alert from "./components/Alert";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchField from "./components/SearchField";
import { AlertProvider } from "./Context/AlertContext";
import { SearchProvider } from "./Context/SearchContext";

function App() {
  return (
    <AlertProvider>
      <SearchProvider>
        <div className="flex h-screen flex-col justify-start">
          <NavBar />
          <Alert />
          <SearchBar />
          <div className="h-[calc(h-dvh - 192px)] flex items-center justify-center">
            <SearchField />
          </div>
        </div>
      </SearchProvider>
    </AlertProvider>
  );
}

export default App;
