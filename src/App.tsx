import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchField from "./components/SearchField";

function App() {
  return (
    <div className="flex w-full flex-col justify-start">
        <NavBar />
        <SearchBar />
        <SearchField />
        <Footer />
      </div>
  );
}

export default App;
