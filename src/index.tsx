import './public-path';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Inspector, InspectParams } from 'react-dev-inspector';
import { ConfigProvider } from 'antd';
import { unstable_HistoryRouter as BrowserRouter, useLocation } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';
import { createBrowserHistory } from 'history';
import { historyPathsF, historyPathsR } from './store/baseSlice';
const InspectorWrapper = process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;
let history: any = createBrowserHistory();

function render(props: any) {
  const { container } = props;
  const root: any = container ? container.querySelector('#root') : document.getElementById('root');
  history.listen((res: any) => {
    console.log('history', res);
    store.dispatch(historyPathsF(res.location.pathname));
  });
  ReactDOM.createRoot(root).render(
    <ConfigProvider>
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
        <Provider store={store}>
          <BrowserRouter
            history={history}
            basename={window.__POWERED_BY_QIANKUN__ ? '/qiankun-react-ansl' : '/'}
          >
            <App />
          </BrowserRouter>
        </Provider>
      </InspectorWrapper>
    </ConfigProvider>
  );
}
if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  // console.log('[react16] react app bootstraped');
}

export async function mount(props: any) {
  // console.log('mount-mount-[react16] props from main framework', props);
  render(props);
}

export async function unmount(props: any) {
  const { container } = props;
  const root: any = container ? container.querySelector('#root') : document.getElementById('root');

  root.unmount();
}
export async function update(props: any) {
  // console.log('update props', props);
}
// 不添加这一段代码就报错-经过反复测试生产环境也需要这段代码
// if (process.env.NODE_ENV === 'development') {
//   window.qiankunLifecycle = {
//     bootstrap,
//     mount,
//     unmount,
//   };
// }
window.qiankunLifecycle = {
  bootstrap,
  mount,
  unmount,
};
reportWebVitals();
