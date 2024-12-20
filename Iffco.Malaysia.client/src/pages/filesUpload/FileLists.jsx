﻿import { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
} from "react-bootstrap";
//import dayjs from "dayjs";
//import { DateRangePicker } from "react-date-range";
import FileUploadModal from "../filesUpload/FileUploadModal"
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Sidebar from "../SideBar";
import { get } from "../../Services/api";


const FileLists = () => {
  //const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
      fetchFiles();
  }, [currentPage]);

    const fetchFiles = async() => {
        setIsError(false);
        setIsLoading(true);
        await get("/FileUpload/GetAllFiles?page=" + currentPage)
        .then((response) => {
          setFileList(response.data);
          setIsLoading(false);
        })
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleCloseModal = () => {
    setShowModal(false);
  };


  return (
    <>
      <Sidebar />
      <Card
        className="mt-3"
        style={{
          padding: "20px",
          minHeight: "300px",
          margin: "auto",
        }}
      >
        <Card.Body>
          <InputGroup className="mb-3">
            {/*<OverlayTrigger*/}
            {/*  trigger="click"*/}
            {/*  placement="bottom"*/}
            {/*  overlay={popover}*/}
            {/*  rootClose*/}
            {/*>*/}
            {/*  <Form.Control*/}
            {/*    type="text"*/}
            {/*    value={`📅  ${dayjs(dateRange.startDate).format(*/}
            {/*      "YYYY-MM-DD"*/}
            {/*    )} - ${dayjs(dateRange.endDate).format("YYYY-MM-DD")}`}*/}
            {/*    readOnly*/}
            {/*  />*/}
            {/*</OverlayTrigger>*/}

            {/*<Button*/}
            {/*  variant="primary"*/}
            {/*  className="rounded-end"*/}
            {/*  onClick={() => handleSearch()}*/}
            {/*>*/}
            {/*  Search*/}
            {/*</Button>*/}

            <Button
              variant="primary"
              className="rounded"
              style={{ marginLeft: "10px" }}
              onClick={() => setShowModal(true)}
            >
              Upload
            </Button>
                  </InputGroup>
          <>
            {isLoading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "200px" }}
              >
                <Spinner animation="grow" />
              </div>
            ) : isError ? (
              <div className="text-center" style={{ paddingTop: "40px" }}>
                <h5>Oops! Something went wrong.</h5>
              </div>
            ) : (
              <div className="w-100">
                <Table striped bordered hover responsive>
                  <thead>
                    <tr className="text-center">
                      <th>File Name</th>
                      <th>Date</th>
                      <th>Uploaded By</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fileList && fileList.length > 0 ? (
                      fileList.map((fileData, index) => (
                        <tr key={index}>
                          <td>{fileData.fileName}</td>
                              <td>{fileData.uploadDate}</td>
                          <td>{fileData.uploadedBy}</td>
                              <td>{fileData.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>

                <div className="d-flex ">
                  <Button
                    variant="primary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ width: "90px", textAlign: "center" }}
                  >
                    Previous
                  </Button>
                  <Form.Control
                    className="mx-2"
                    value={currentPage}
                    onChange={(e) => {
                      if (e.target.value < 1) {
                        setCurrentPage(1);
                      } else {
                        setCurrentPage(e.target.value);
                      }
                    }}
                    type="number"
                    style={{ width: "50px", textAlign: "center" }}
                  />
                  <Button
                    variant="primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{ width: "90px", textAlign: "center" }}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        </Card.Body>
          </Card>
          <FileUploadModal isOpen={showModal} onClose={handleCloseModal} fetchFiles={fetchFiles} />

    </>
  );
};

export default FileLists;
