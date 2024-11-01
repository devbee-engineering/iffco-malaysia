import PropTypes from 'prop-types';
import { useState } from "react";
import { RiCloseLargeLine } from "react-icons/ri";
import { post } from "../../Services/api";
import { toast } from 'react-toastify';

import { Button, Spinner } from 'react-bootstrap';



const FileUploadModal = ({ isOpen, onClose, fetchFiles }) => {
    const [file, setFile] = useState(null);
    const [base64, setBase64] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            convertToBase64(droppedFile);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            convertToBase64(selectedFile);
        }
    };

    const convertToBase64 = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64(reader.result.split(',')[1]);
        };
        reader.readAsDataURL(file);
    };
    const handleClose = () => {
        setFile(null);
        setBase64(null);
        onClose();
    };

    const openFileDialog = () => {
        document.getElementById('fileInput').click();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
       
        if (!base64) {
            toast.error('Please select a file to upload.');
            return;
        }
        setIsLoading(true);
        const requestBody = {
            File: base64,
            FileName: file.name,
            UploadedBy: 'currentUserId'
        };

        try {
            const response = await post('/FileUpload/Upload', requestBody);
            if (response.status === 200) {
                toast(response.data.message);
                handleClose();
                setIsLoading(false);
                fetchFiles();
            } else {
                toast.error(response.data);
               
            }
           
        } catch (error) {
            setIsLoading(false);
            toast.error('Error uploading file: ' + error.response.data);
        }
    };


    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between">
                        <h5 className="modal-title">Upload File</h5>
                        <button type="button" className="btn btn-light" onClick={handleClose}>
                            <RiCloseLargeLine className="mb-1" />
                        </button>
                    </div>
                    <div className="modal-body">
                        <div
                            className="p-4 text-center"
                            onDrop={handleDrop}
                            onClick={openFileDialog}
                            onDragOver={(event) => event.preventDefault()}
                            style={{ cursor: 'pointer', height: '170px', border: '1px dashed #6c757d', overflowY: 'auto' }}
                        >
                            <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="fileInput" />
                            {file ? (
                                <div>
                                    <p>{file.name}</p>
                                </div>
                            ) : (
                                <p className="m-5 text-secondary">Drag & drop your file here or click to select</p>
                            )}
                        </div>
                    </div>
                    <div className="modal-footer justify-content-between">
                        <label htmlFor="fileInput" className="btn btn-secondary">Select File</label>
                        {/*<button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>*/}
                        <Button variant="primary" onClick={handleSubmit} disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    Loading...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

FileUploadModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    fetchFiles: PropTypes.func.isRequired
};

export default FileUploadModal;
