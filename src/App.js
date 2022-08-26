import "./App.css";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages";
import Layout from "./layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
