import './App.css';
import MessagesPage from './pages/MessagesPage';
import ChurnPredictionPage from './pages/ChurnPredictionPage';
import CoefficientsPage from "./pages/CoefficientsPage";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {

    return (
        <Router>
            <div className="App-header">
                <header className="App-header">
                    <h1>React App</h1>

                    <nav style={{ margin: '20px 0' }}>
                        <Link to="/messages" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>
                            Messages
                        </Link>
                        <Link to="/churn-prediction" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>
                            Churn Prediction
                        </Link>
                        <Link to="/coefficients" style={{ margin: '0 15px', color: 'white', textDecoration: 'none' }}>
                            Predictive Coefficients
                        </Link>
                    </nav>

                    <Routes>
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/churn-prediction" element={<ChurnPredictionPage />} />
                        <Route path="/coefficients" element={<CoefficientsPage />} />
                    </Routes>
                </header>
            </div>
        </Router>
    )
}

export default App;
