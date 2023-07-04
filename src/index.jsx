import React from "react"
import ReactDOM from "react-dom"
// import BrowserRouter and rename to Router
// BrowserRouter is a component to hadle routing in React web apps. It uses HTML history API to keep the UI in synch with the URL
import { BrowserRouter as Router } from "react-router-dom"
import { ContextProvider } from "./Context"

import App from "./App"

ReactDOM.render(
  /**
   * App component is wrapped inside Router component so that the App component and its children can get access to routing functionalities defining your routes using the Route component, navigae between routes via Link component
   * ContextProvider component(Provider) wraps around App component so that ContextProvider can give access to its global state and state methods to App component and its children without prop drilling
   * Code flow:
   * ContextProvider component gets invoked in index.js >> ContextProvider function in Context.js gets executed >> ContextProvider function render Context.Provider component with value prop that hosts props.children(Route and App component) >> Both Route & App component can now consume the context values passed to the value prop of Context.Provider
   */
  <ContextProvider><Router><App /></Router></ContextProvider>,
  document.getElementById("root"))
