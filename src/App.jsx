import './App.css';
import React, { useState } from 'react';
import Navbar from './Component/Navbar';
import News from './Component/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);
  // const apiKey = "f37e2e0007024de4a86820eaf0eb4942";
  const pageSize = 8;

  return (
    <div>
      <Router>
        <Navbar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<React.Fragment><News setProgress={setProgress}  key='general' pageSize={pageSize} country='in' category='general' /></React.Fragment>} />
          <Route exact path="/business" element={<React.Fragment><News setProgress={setProgress}  key='business' pageSize={pageSize} country='in' category='business' /></React.Fragment>} />
          <Route exact path="/entertainment" element={<React.Fragment><News setProgress={setProgress}  key='entertainment' pageSize={pageSize} country='in' category='entertainment' /></React.Fragment>} />
          <Route exact path="/science" element={<React.Fragment><News setProgress={setProgress}  key='science' pageSize={pageSize} country='in' category='science' /></React.Fragment>} />
          <Route exact path="/sport" element={<React.Fragment><News setProgress={setProgress}  key='sport' pageSize={pageSize} country='in' category='sport' /></React.Fragment>} />
          <Route exact path="/technology" element={<React.Fragment><News setProgress={setProgress}  key='technology' pageSize={pageSize} country='in' category='technology' /></React.Fragment>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
