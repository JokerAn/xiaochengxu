import React from 'react';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
// import './App.less';
import { AboutComponent } from './pages/about';
import { NewsComponent } from './pages/news';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <Link style={{ marginRight: '20px' }} to="/about">
            about
          </Link>
          <Link to="/news">news</Link>
        </ul>
      </header>
      <div>
        <Routes>
          {[
            <Route path={'/about'} key={'about'} element={<AboutComponent />} />,
            <Route path={'/news'} key={'news'} element={<NewsComponent />} />,
          ]}
        </Routes>
      </div>
    </div>
  );
}

export default App;
