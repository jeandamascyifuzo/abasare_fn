/* eslint-disable no-useless-concat */
import React from "react";

const ClientAppointment = ({ RowData }) => {
  console.log("RowData", RowData);
  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12">
        <br />
        <div className="basic-form">
          <div className="custom-card">
            <div className="card-header">
              <h4 className="card-title">Experiance and Other Information</h4>
            </div>
            <div className="card-body">
              <div className="list-group-flush">
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0">
                  <p className="mb-0 ml-4">
                    <strong>Year of Experiences</strong>
                  </p>
                  <p className="mb-0 mr-4">
                    {RowData?.yearExperience + "years"}
                  </p>
                </div>
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                  <p className="mb-0 ml-4">
                    <strong>Rides</strong>
                  </p>
                  <p className="mb-0 mr-4">{RowData?.rides}</p>
                </div>
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                  <p className="mb-0 ml-4">
                    <strong>License Number</strong>
                  </p>
                  <p className="mb-0 mr-4">{RowData?.licenseNumber}</p>
                </div>
                <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1">
                  <p className="mb-0 ml-4">
                    <strong>Accepting Booking</strong>
                  </p>
                  <p className="mb-0 mr-4">
                    {RowData?.acceptingBooking === "true" ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAppointment;
