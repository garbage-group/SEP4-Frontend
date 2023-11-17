import HumidityDisplay from "./components/HumidityDisplay";
import { Navbar } from "./components/Navbar";
import "../src/styles/App.css";
import { Sidebar } from "./components/Sidebar";

export default function Humidity() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>

      <div className="body-container">
        <Sidebar />
        <HumidityDisplay />
      </div>
    </div>
  );
}

export function App() {
  return <h1>Hello World!</h1>;
}
