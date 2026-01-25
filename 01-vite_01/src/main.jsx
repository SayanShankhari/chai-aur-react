import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'



const element = (
  <a href="https://google.com" target='_blank'>Google</a>
);

const evaluated_expression = 10 + 20;

const react_element = React.createElement (
  "a"
  , {href: "https://google.com", target: "_blank"}
  , "Google expr-val:"
  , evaluated_expression
)

console.log (react_element);

createRoot(document.getElementById('root')).render(
  react_element
)
