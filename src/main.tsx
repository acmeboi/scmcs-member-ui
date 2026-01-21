import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { themeConfig } from './config/theme';
import './index.css';
import { store } from './stores/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={themeConfig}>
        <App />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
