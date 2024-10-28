import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RouterName } from "./constants/Constants";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import SignIn from "./pages/Login/Login.jsx";
import ChangePassword from "./pages/Login/ChangePassword.jsx";
import MFAQRCodeSetup from "./pages/Mfa/MFAQRCodeSetup";
import VerifyOtp from './pages/Mfa/Verify';
import FileLists from './pages/filesUpload/FileLists';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={RouterName.SIGN_IN} element={<SignIn />} />
        <Route element={<ProtectedRoutes />}>
          <Route path={RouterName.DASHBOARD} element={<Dashboard />} />
          <Route path={RouterName.MFA_SETUP} element={<MFAQRCodeSetup />} />
          <Route path={RouterName.VERIFYOTP} element={<VerifyOtp /> }/>
          <Route path={RouterName.FILELISTS} element={<FileLists /> }/>
          <Route
            path={RouterName.CHANGE_PASSWORD}
            element={<ChangePassword />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
