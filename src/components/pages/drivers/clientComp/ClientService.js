import React from "react";

const ClientService = ({ RowData }) => {
  return (
    <div className="row justify-content-center">
      <div className="col-xl-10 col-lg-12">
        <div id="" className="basic-form">
          <div className="card-body">
              <div className="custom-card card-border pt-4 pb-4 pl-4 pr-4">
                <div className="media items-list-2">
                  <div className="media-footer align-self-center ml-auto d-block align-items-center gap-4 d-sm-flex">
                    <img src={RowData?.licenseImage[0]?.fontSide} className="w-44 h-44"/>
                    <img src={RowData?.licenseImage[0]?.backSide} className="w-44 h-44"/>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientService;
