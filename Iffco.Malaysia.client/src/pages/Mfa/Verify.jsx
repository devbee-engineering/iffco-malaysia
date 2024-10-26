import { post } from "../../Services/api";
import { useState } from "react";
import OtpInput from 'react-otp-input';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RouterName } from "../../constants/Constants";
const VerifyOtp = () => {
    const navigate = useNavigate();
    const [authCode, setAuthCode] = useState("");

    const submitOtp = () => {
        post(`Mfa/Verify?authCode=${authCode}`)
            .then((res) => {
                if (res.status === 200) {
                    toast(res.data);
                    localStorage.setItem("IsMfaOtpVerified", 'true');
                    navigate(RouterName.INVOICES);
                }
            })
            .catch((error) => {
                toast.error(error.response.data.Message);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg" style={{ borderRadius: '15px', maxWidth: '400px' }}>
                <div className="card-header text-white" style={{ backgroundColor: '#007bff', fontSize: '1.25rem' }}>
                    Verify Authentication
                </div>
                <div className="card-body text-center">
                    <p>Please go to your Authentication App and enter the code below to verify your identity.</p>
                    <form>
                        <div className="form-group">
                            <label htmlFor="authCode">Enter Authentication Code</label>
                            <div className="d-flex justify-content-center mt-2">
                                <OtpInput
                                    value={authCode}
                                    onChange={(code) => setAuthCode(code)}
                                    numInputs={6}
                                    renderSeparator={<span> </span>}
                                    renderInput={(props) => <input {...props} />}
                                    inputStyle={{
                                        width: "50px",
                                        height: "50px",
                                        margin: "0 5px",
                                        borderRadius: "6px",
                                        border: "1px solid #ced4da",
                                        textAlign: "center",
                                        fontSize: "20px",
                                        color: "black",
                                        outline: "none",
                                    }}
                                />
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary rounded-pill px-4 py-2 mt-3" onClick={submitOtp}>
                            Verify Code
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtp;
