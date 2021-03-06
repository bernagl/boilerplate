import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { unregister as unregisterServiceWorker } from './registerServiceWorker'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './store'
import 'antd/dist/antd.css'
import './index.css'
import 'bootstrap-4-grid/css/grid.min.css'
import './App.css'
import './assets/xtable.css'
import './assets/header.css'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
// registerServiceWorker()
unregisterServiceWorker()
