
import HumidityDisplay from './components/HumidityDisplay';
import './styles/HumidityDisplay.css';

export default function Humidity() {
    return (
        <div className="App">
            <header className="App-header">
                {/* Other content */}
                <HumidityDisplay />
            </header>
        </div>
    );
}



export function App() {
  return <h1>Hello World!</h1>;
}

