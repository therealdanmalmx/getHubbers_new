import "./App.css";
import Alert from "./components/Alert";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchField from "./components/SearchField";

function App() {
  return (
    <div className="flex h-screen flex-col justify-start">
        <NavBar />
        <Alert />
        <SearchBar />
        <div className="flex h-96 items-center justify-center">
          <SearchField />
        </div>
      </div>
  );
}

export default App;
