import { post } from "../../Services/api";
import { useEffect, useState } from "react";
import OtpInput from 'react-otp-input';
import { toast } from "react-toastify";
import { ClearLocalStore } from "../../Services/auth";
const MFAQRCodeSetup = () => {
    const [qrCode, setQrCode] = useState("");
    const [authCode, setAuthCode] = useState("");
    const mfaStatus = localStorage.getItem("mfaStatus");

    if (mfaStatus === "true") {
        window.location.href = "/";
    }
    const generateQr = () => {
        // setLoading(true);
        post("/Mfa/Setup")
            .then((res) => {
                if (res.status === 200) {
                    setQrCode(`data:image/png;base64,${res.data}`);
                }
            })
            .catch((error) => {
                toast.error(error.response.data.Message);
            });
    };

    useEffect(() => {
        generateQr();
    }, []);

    const submitOtp = () => {
        post(`Mfa/Verify?authCode=${authCode}`)
            .then((res) => { 
                if (res.status === 200) {
                    toast(res.data);
                    setTimeout(() => {
                        ClearLocalStore();
                        window.location.href = "/";
                    }
                    , 2000);
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
                    MFA Setup
                </div>
                <div className="card-body text-center">
                    <p className="card-text mb-4">
                        To complete the MFA setup, scan the QR code below with your authentication app and enter the generated code.
                    </p>
                    <div className="mb-4">
                        {qrCode && <img src={qrCode} alt="MFA QR Code" style={{ width: '200px', height: '200px' }} />}
                    </div>
                    <form>
                        <div className="form-group">
                            <label htmlFor="authCode">Authentication Code</label>
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

export default MFAQRCodeSetup;
