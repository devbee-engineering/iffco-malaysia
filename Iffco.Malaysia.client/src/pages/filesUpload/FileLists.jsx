import { useState, useEffect } from "react";
import {
  Table,
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
  OverlayTrigger,
  Popover,
  Badge,
  Tooltip,
} from "react-bootstrap";
//import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
//import { RouterName } from "../../constants/Constants";
import { DateRangePicker } from "react-date-range";
import FileUploadModal from "../filesUpload/FileUploadModal"
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Sidebar from "../SideBar";
import { get } from "../../Services/api";


const FileLists = () => {
  //const navigate = useNavigate();
  const [invoiceLogs,] = useState([]);
    const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

    // const [selectedLog, setSelectedLog] = useState(null);
     const [showModal, setShowModal] = useState(false);
  //const itemsPerPage = 10;
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().startOf("month").toDate(),
    endDate: dayjs().endOf("month").toDate(),
    key: "selection",
  });
  //const targetRef = useRef();

  useEffect(() => {
    fetchInvoices();
  }, [currentPage]);

    const fetchInvoices = async() => {
        setIsError(false);
        setIsLoading(true);
        await get("/FileUpload/GetAllFiles?page=" + currentPage)
        .then((response) => {
          setFileList(response.data);
          setIsLoading(false);
        })
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchInvoices();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleShowModal = () => {
    setShowModal(true);
    };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDateRangeSelect = (ranges) => {
    var startDate = ranges.selection.startDate;
    var endDate = ranges.selection.endDate;
    setDateRange({ startDate, endDate, key: "selection" });
  };

  const popover = (
    <Popover id="popover-basic" style={{ minWidth: " 580px" }}>
      <Popover.Body>
        <DateRangePicker
          ranges={[dateRange]}
          onChange={handleDateRangeSelect}
        />
      </Popover.Body>
    </Popover>
  );

  const handleView = (log) => {
    window.localStorage.setItem("invoiceData", JSON.stringify(log));
    handleShowModal();
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
                    </tr>
                  </thead>
                  <tbody>
                    {fileList && fileList.length > 0 ? (
                      fileList.map((fileData, index) => (
                        <tr key={index}>
                          <td>{fileData.fileName}</td>
                              <td>{fileData.uploadDate}</td>
                          <td>{fileData.uploadedBy}</td>
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
          <FileUploadModal isOpen={showModal} onClose={handleCloseModal} />

    </>
  );

  function NoteBadge(log) {
    let noteType = log.invoiceType === "CREDIT_NOTE" ? "CN" : "DN";
    let noteTypeLabel =
      log.invoiceType === "CREDIT_NOTE" ? "Credit Note" : "Debit Note";

    return (
      <OverlayTrigger
        key="top"
        placement="bottom"
        overlay={
          <Tooltip id={`tooltip-top`}>
            {noteTypeLabel} for Invoice Number{" : "}
            {log.invoiceReferenceNumber} , Reason : {log.noteReason}
          </Tooltip>
        }
      >
        <Badge pill bg="secondary">
          {noteType}
        </Badge>
      </OverlayTrigger>
    );
  }
};

export default FileLists;
