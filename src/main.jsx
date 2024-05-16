import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './views/App/index.jsx';
import Login from './views/App/Login.jsx';

const Main = () => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('token'));

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setAuthToken={setAuthToken} />} />
                <Route path="/" element={<App authToken={authToken} />} />
            </Routes>
        </Router>
    );
};

ReactDOM.render(<Main />, document.getElementById('root'));
