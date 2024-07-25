import "./App.css";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchField from "./components/SearchField";
import { SearchProvider } from "./Context/SearchContext";

function App() {
  return (
    <SearchProvider>
      <div>
        <NavBar />
        <SearchBar />
        <SearchField />
      </div>
    </SearchProvider>
  );
}

export default App;
