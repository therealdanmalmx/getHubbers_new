import "./App.css";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchField from "./components/SearchField";
import { SearchProvider } from "./Context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <div className="flex h-screen flex-col justify-center">
        <NavBar />
        <SearchBar />
        <div className="h-[calc(h-screen - 192px)] flex items-center justify-center">
          <SearchField />
        </div>
      </div>
    </SearchProvider>
  );
}

export default App;
