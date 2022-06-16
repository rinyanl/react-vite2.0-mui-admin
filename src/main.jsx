import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from '@/App'

import '@/styles/index.less'// 初始化
import 'nprogress/nprogress.css'  //顶部进度条样式

if (process.env.NODE_ENV !== 'development') {
  console.log = () => { }
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)
