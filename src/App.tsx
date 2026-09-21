import "./App.css";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchField from "./components/SearchField";

function App() {
  return (
    <div>
      <div className="bg-nordic flex h-screen w-full flex-col justify-start px-4">
        <NavBar />
        <SearchBar />
        <SearchField />
      </div>
      <Footer />
    </div>
  );
}

export default App;
