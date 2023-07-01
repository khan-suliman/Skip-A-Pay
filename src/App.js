import Layout from "layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "pages/Dashboard";
import SubmittedForm from "pages/Submitted-Form";
import Settings from "pages/Settings";
import Login from "pages/Login";
import ApplyForm from "pages/Apply-Form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/submitted-form" element={<SubmittedForm />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* apply form route */}
        <Route path="/apply" element={<ApplyForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
