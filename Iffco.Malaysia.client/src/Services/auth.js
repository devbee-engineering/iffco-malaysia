import { useLocation } from 'react-router-dom';

export function IsAuthenticated() {
  return localStorage.getItem("token") ? true : false;
}

export function GetJwtToken() {
  return localStorage.getItem("token");
}

export function SetJwtToken(token) {
  localStorage.setItem("token", token);
}

export function ClearLocalStore() {
  localStorage.clear();
}

export function IsMfaOtpVerified() {
    const location = useLocation();

    var otpVerified= localStorage.getItem("IsMfaOtpVerified");
    var mfaStatus = localStorage.getItem("mfaStatus");
    var currentPage = location.pathname;
    var returnValue = false;
    if (mfaStatus == "true" && otpVerified == "false" && currentPage != "/veryfy-otp") {
        returnValue = true;
    }
    return returnValue;
}
