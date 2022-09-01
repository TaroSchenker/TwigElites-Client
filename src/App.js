import "./App.css";
import { Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Home, Registry } from "./pages";
import { Chat, Signin, Signup } from "./components";

import Layout from "./layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/registry" element={<Registry />}></Route>
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/logout" element={<Signin />} />
      </Route>
    </Routes>
  );
}

export default App;
