import React from 'react';
import ReactDOM from 'react-dom/client';
import { Inspector, InspectParams } from 'react-dev-inspector';
import locale from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const c: string = '';
root.render(
  <ConfigProvider locale={locale}>
    <InspectorWrapper
      keys={['q', 'w', 'e']}
      onClickElement={({ codeInfo }: InspectParams) => {
        if (!codeInfo?.absolutePath) return;
        const { absolutePath, lineNumber, columnNumber } = codeInfo;
        let ael: any = document.createElement('a');
        ael.href = `vscode://file/${absolutePath}:${lineNumber}:${columnNumber}`;
        ael.className += 'vscode';
        document.body.appendChild(ael);
        ael.click();
        document.body.removeChild(ael);
      }}
    >
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </Provider> */}
    </InspectorWrapper>
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
