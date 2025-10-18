import logo from "./logo.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";

function App({ router }) {
  return <RouterProvider router={router} />;
}

export default App;
