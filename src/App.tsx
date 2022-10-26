import React from 'react';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
// import './App.less';
import { AboutComponent } from './pages/about';
import { NewsComponent } from './pages/news';
import { createFromIconfontCN } from '@ant-design/icons';
import { LayOut } from './pages/layout';
import { Select } from 'antd';
console.log(Select);
export const MySelect = (prop: any) => {
  const { children, ...props }: any = prop;
  return (
    <Select {...props} listItemHeight={32}>
      {children}
    </Select>
  );
};

export const IconFont = createFromIconfontCN({
  scriptUrl: ['//s3-relay.360buyimg.com/relay/c/iconfont/4/font_3902210pmg4wT54N5y.js'],
});
function App() {
  return (
    <div className="App">
      {/* <h2>asdff3f</h2>
      <ul>
        <Link style={{ marginRight: '20px' }} to="/about">
          about
        </Link>
        <Link to="/news">news</Link>
      </ul>
      <div>
        <Routes>
          {[
            <Route path={'/about'} key={'about'} element={<AboutComponent />} />,
            <Route path={'/news'} key={'news'} element={<NewsComponent />} />,
          ]}
        </Routes>
      </div> */}
      <LayOut />
    </div>
  );
}

export default App;
