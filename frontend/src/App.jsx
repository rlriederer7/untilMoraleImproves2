import './App.css';
import MessagesPage from './pages/MessagesPage';
import ChurnPredictionPage from './pages/ChurnPredictionPage';
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
                    </nav>

                    <Routes>
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/churn-prediction" element={<ChurnPredictionPage />} />
                    </Routes>
                </header>
            </div>
        </Router>
    )
}

export default App;
