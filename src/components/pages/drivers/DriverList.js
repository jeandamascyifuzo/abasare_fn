/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Dashboard from "../../Dashboard";
import Fade from "react-reveal/Fade";
import { axiosRequest, refreshPage } from "../../../api/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "../../Skeleton";
import LoadingButton from "../../LoadingButton";
import ClientDetails from "./clientComp/ClientDetails";
import ClientAppointment from "./clientComp/ClientAppointment";
import ClientService from "./clientComp/ClientService";
const Driver_URL = "drivers/profile";

const DriverList = () => {
  const [createClientModel, setCreateClientModel] = useState(false);
  const [updateClientModel, setUpdateClientModel] = useState(false);
  const [deleDataModel, setDeleteDataModel] = useState(false);
  const [updateDataModel, setUpdateDataModel] = useState(false);
  const [clientSales, setClientSales] = useState(false);
  const [clientAp, setClientAp] = useState(false);
  const [RowData, SetRowData] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [clientDetals, setClientDetals] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    cityName: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    gender: "",
    status: "",
    cost: "",
    licenseNumber: "",
    latitude: "",
    longitude: "",
    acceptingBooking: "",
    yearExperience: "",
    rides: "",
    avatar: "",
    fontSide: "",
    backSide: "",
  });

  const handlerClientDetals = () => {
    setClientDetals(true);
    setClientAp(false);
    setClientSales(false);
  };
  const handlerClientAp = () => {
    setClientDetals(false);
    setClientAp(true);
    setClientSales(false);
  };
  const handlerClientSales = () => {
    setClientDetals(false);
    setClientAp(false);
    setClientSales(true);
  };

  const removeModel = () => {
    let newState = !createClientModel;
    setCreateClientModel(newState);
  };
  const ViewAndUpdateModel = () => {
    let newState = !updateClientModel;
    setUpdateClientModel(newState);
  };
  const deleteModel = () => {
    let newState = !deleDataModel;
    setDeleteDataModel(newState);
  };
  const updateModel = () => {
    let newState = !updateDataModel;
    setUpdateDataModel(newState);
  };

  const getDrivers = () => {
    setLoading(true);
    axiosRequest
      .get(Driver_URL)
      .then((response) => {
        setLoading(false);
        const result = response?.data?.data;
        setData(result);
      })
      .catch((error) => {
        setLoading(false);
        if (error.code !== "ERR_NETWORK") {
          toast.info(error.response.data.message, "error");
        } else {
          toast.error(error.message, "error");
        }
      });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const url = "driver";
    setLoading(true);
    await axiosRequest
      .post(url, formData)
      .then((res) => {
        setLoading(false);
        const result = res.data;
        console.log("...",result)
        setCreateClientModel(false);
        getDrivers();
        toast.success("Driver add successful");
        setTimeout(() => {
          if(result.status ==="1")
          refreshPage();
        }, 1000)
      })
      .catch((error) => {
        console.log(">..............", error);
        if (error.code === "ERR_BAD_RESPONSE") {
          toast.error(error.response.data.message);
        } else {
          toast.info(error.message);
          setTimeout(() => {
            setLoading(false);
            refreshPage();
          }, 2000);
        }
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const url = `drivers/profile/${id}`;
    setLoading(true);
    axiosRequest
      .delete(url)
      .then((response) => {
        setLoading(false);
        getDrivers();
        setDeleteDataModel(false);
        setUpdateClientModel(false);
        toast.success("Deleted succefully");
      })
      .catch((error) => {
        toast.info(error.message);
        setTimeout(() => {
          setLoading(false);
          refreshPage();
        }, 2000);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const url = `drivers/profile/${id}`;
    setLoading(true);
    axiosRequest
      .put(url, formData)
      .then((response) => {
        setLoading(false);
        const result = response.data;
        const { message } = result;
        setFormData("");
        getDrivers();
        setUpdateDataModel(false);
        setUpdateClientModel(false);
        toast.success(message);
      })
      .catch((error) => {
        toast.info(error.message);
        setTimeout(() => {
          setLoading(false);
          refreshPage();
        }, 2000);
      });
  };

  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <>
      <ToastContainer />
      <Dashboard>
        {/* ====================== Start::  deleteDataModel =============================== */}
        <Fade right>
          <div
            className={`min-h-full w-screen z-50 bg-opacity-30 backdrop-blur-sm fixed flex items-center justify-center px-4 ${
              deleDataModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-white w-1/2 shadow-2xl rounded-lg p-4 pb-8">
              <div className="card-title w-full flex  flex-wrap justify-center items-center  ">
                <h1 className="font-bold text-sm text-center w-11/12">
                  Delete Driver
                </h1>
                <hr className=" bg-primary border-b w-full" />
              </div>
              <div className="card-body">
                <form className=" px-8">
                  <div>
                    <h2 className="text-base m-4">
                      Do you really want permanently delete{" "}
                      <span className="italic text-black">
                        {RowData?.firstname}
                      </span>
                    </h2>
                  </div>
                  <div className="w-full flex justify-between">
                    <button
                      className="btn btn-danger light shadow-none"
                      onClick={(e) => deleteModel(e.preventDefault())}
                    >
                      Cancel
                    </button>
                    {loading ? (
                      <LoadingButton />
                    ) : (
                      <button
                        className="btn btn-outline-danger btn-s shadow-none"
                        onClick={handleDelete}
                      >
                        remove
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Fade>
        {/* =========================== End::  deleteDataModel =============================== */}

        {/* ===============Start:: createmodel ================ */}
        <div
          className={`h-screen w-full bg-gray-600 bg-opacity-30 backdrop-blur-sm mt-[90%] lg:-mt-4 fixed flex items-center justify-center z-50 ${
            createClientModel === true ? "block" : "hidden"
          }`}
        >
          <div className="bg-transparent w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-10">
            <div className="w-full">
              <div className="modal-content">
                <div className="modal-header justify-content-center">
                  <h2 className="modal-title text-black font-w600">
                    Add a new Driver
                  </h2>
                </div>
                <form onSubmit={handlerSubmit}>
                  <div className="modal-body">
                    <div className="row justify-center items-center active show overflow-y-auto h-[65vh] scrollbar-hide">
                      <div className="col-xl-8 col-lg-12">
                        <div className="basic-form">
                          <div className="custom-card">
                            <div className="card-header">
                              <h4 className="card-title">Basic Information</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-row">
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    First Name
                                  </label>
                                  <input
                                    type="text"
                                    name="text"
                                    className="form-control"
                                    placeholder="John Deo"
                                    defaultValue={formData.fullName}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        fullName: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Email"
                                    defaultValue={formData.email}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        email: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    Address
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Kn 67"
                                    defaultValue={formData.address}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        address: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Kigali"
                                    defaultValue={formData.cityName}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        cityName: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    Phone Number
                                  </label>
                                  <input
                                    type="number"
                                    name="number"
                                    className="form-control"
                                    placeholder="+2507xxxxxxxx"
                                    defaultValue={formData.phoneNumber}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        phoneNumber: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    Alternate Phone Number
                                  </label>
                                  <input
                                    type="number"
                                    name="number"
                                    className="form-control"
                                    placeholder="+2507xxxxxxxx"
                                    defaultValue={formData.alternatePhoneNumber}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        alternatePhoneNumber: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>

                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    Gender
                                  </label>
                                  <select
                                    id="inputState"
                                    name="gender"
                                    className="form-control"
                                    defaultValue={formData.gender}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        gender: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Choose...</option>

                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Say nothing">
                                      Say nothing
                                    </option>
                                  </select>
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    Status
                                  </label>
                                  <select
                                    id="inputState"
                                    name="status"
                                    className="form-control"
                                    defaultValue={formData.status}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        status: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Choose...</option>

                                    <option value="Active">Active</option>
                                    <option value="Not Active">
                                      Not Active
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="custom-card">
                            <div className="card-header">
                              <h4 className="card-title">
                                Experiance And other information
                              </h4>
                            </div>
                            <div className="card-body">
                              <div className="form-row">
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    License Number
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder=""
                                    defaultValue={formData.licenseNumber}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        licenseNumber: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    Years of Experience
                                  </label>
                                  <input
                                    type="number"
                                    name="yearExperience"
                                    className="form-control"
                                    placeholder=""
                                    defaultValue={formData.yearExperience}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        yearExperience: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    cost
                                  </label>
                                  <input
                                    type="number"
                                    name="cost"
                                    className="form-control"
                                    placeholder="+2507xxxxxxxx"
                                    defaultValue={formData.cost}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        cost: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    Rides
                                  </label>
                                  <input
                                    type="number"
                                    name="rides"
                                    className="form-control"
                                    placeholder=""
                                    defaultValue={formData.rides}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        rides: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>

                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    Accepting Booking
                                  </label>
                                  <select
                                    id="inputState"
                                    name="acceptingBooking"
                                    className="form-control"
                                    defaultValue={formData.acceptingBooking}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        acceptingBooking: e.target.value,
                                      })
                                    }
                                  >
                                    <option value="">Choose...</option>

                                    <option value="true">Yes</option>
                                    <option value="false">No</option>
                                  </select>
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    latitude
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="0.0987656789"
                                    defaultValue={formData.latitude}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        latitude: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    longitude
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="0.567890"
                                    defaultValue={formData.longitude}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        longitude: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="custom-card">
                            <div className="card-header">
                              <h4 className="card-title">Upload Documents</h4>
                            </div>
                            <div className="card-body">
                              <div className="form-row">
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    License Front Side
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="docs link"
                                    defaultValue={formData.fontSide}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        fontSide: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="form-group col-md-4">
                                  <label className="text-black font-w600">
                                    License Back Side
                                  </label>
                                  <input
                                    type="text"
                                    name="backSide"
                                    className="form-control"
                                    placeholder="docs link"
                                    defaultValue={formData.backSide}
                                    onChange={(e) =>
                                      setFormData({
                                        ...formData,
                                        backSide: e.target.value,
                                      })
                                    }
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div>
                      <button
                        type="button"
                        className="btn btn-danger light mr-3 shadow-none"
                        data-dismiss="modal"
                        onClick={(e) => removeModel(e.preventDefault())}
                      >
                        Close
                      </button>
                      {loading ? (
                        <LoadingButton />
                      ) : (
                        <button
                          type="submit"
                          className="bg-[#1b1a17] hover:bg-[#cf7500] p-2.5 text-white font-semibold rounded"
                        >
                          Add Driver
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* ===============End:: createmodel ================ */}

        {/* ===============Start:: UpdateModel ================ */}
        <Fade right>
          <div
            className={`h-screen w-full bg-gray-600 bg-opacity-30 backdrop-blur-sm mt-[90%] lg:mt-0 fixed flex items-center justify-center z-50 ${
              updateDataModel === true ? "block" : "hidden"
            }`}
          >
            <div className="bg-transparent w-screen shadow-2xl rounded-lg p-4 pb-8 -ml-8">
              <div className="w-full">
                <div className="modal-content">
                  <div className="modal-header justify-content-center">
                    <h2 className="modal-title text-black font-w600">
                      Update a Driver Informarion
                    </h2>
                  </div>
                  <div className="modal-body">
                    <div className="row justify-center items-center active show overflow-y-auto h-[65vh]">
                      <div className="col-xl-6 col-lg-12">
                        <div className="basic-form">
                          <form>
                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Basic Information
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      name="text"
                                      className="form-control"
                                      placeholder="John Deo"
                                      defaultValue={formData.fullName}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          fullName: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      name="email"
                                      className="form-control"
                                      placeholder="Email"
                                      defaultValue={formData.email}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          email: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Address
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Kn 67"
                                      defaultValue={formData.address}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          address: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="Kigali"
                                      defaultValue={formData.cityName}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          cityName: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Phone Number
                                    </label>
                                    <input
                                      type="number"
                                      name="number"
                                      className="form-control"
                                      placeholder="+2507xxxxxxxx"
                                      defaultValue={formData.phoneNumber}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          phoneNumber: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Alternate Phone Number
                                    </label>
                                    <input
                                      type="number"
                                      name="number"
                                      className="form-control"
                                      placeholder="+2507xxxxxxxx"
                                      defaultValue={
                                        formData.alternatePhoneNumber
                                      }
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          alternatePhoneNumber: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>

                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Gender
                                    </label>
                                    <select
                                      id="inputState"
                                      name="gender"
                                      className="form-control"
                                      defaultValue={formData.gender}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          gender: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">Choose...</option>

                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="Say nothing">
                                        Say nothing
                                      </option>
                                    </select>
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Status
                                    </label>
                                    <select
                                      id="inputState"
                                      name="status"
                                      className="form-control"
                                      defaultValue={formData.status}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          status: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">Choose...</option>

                                      <option value="Active">Active</option>
                                      <option value="Not Active">
                                        Not Active
                                      </option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">
                                  Experiance And other information
                                </h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      License Number
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.licenseNumber}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          licenseNumber: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Years of Experience
                                    </label>
                                    <input
                                      type="number"
                                      name="yearExperience"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.yearExperience}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          yearExperience: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      cost
                                    </label>
                                    <input
                                      type="number"
                                      name="cost"
                                      className="form-control"
                                      placeholder="+2507xxxxxxxx"
                                      defaultValue={formData.cost}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          cost: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Rides
                                    </label>
                                    <input
                                      type="number"
                                      name="rides"
                                      className="form-control"
                                      placeholder=""
                                      defaultValue={formData.rides}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          rides: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>

                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      Accepting Booking
                                    </label>
                                    <select
                                      id="inputState"
                                      name="acceptingBooking"
                                      className="form-control"
                                      defaultValue={formData.acceptingBooking}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          acceptingBooking: e.target.value,
                                        })
                                      }
                                    >
                                      <option value="">Choose...</option>

                                      <option value="true">Yes</option>
                                      <option value="false">No</option>
                                    </select>
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      latitude
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="0.0987656789"
                                      defaultValue={formData.latitude}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          latitude: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      longitude
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="0.567890"
                                      defaultValue={formData.longitude}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          longitude: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="custom-card">
                              <div className="card-header">
                                <h4 className="card-title">Upload Documents</h4>
                              </div>
                              <div className="card-body">
                                <div className="form-row">
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      License Front Side
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      placeholder="docs link"
                                      defaultValue={formData.fontSide}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          fontSide: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="form-group col-md-4">
                                    <label className="text-black font-w600">
                                      License Back Side
                                    </label>
                                    <input
                                      type="text"
                                      name="backSide"
                                      className="form-control"
                                      placeholder="docs link"
                                      defaultValue={formData.backSide}
                                      onChange={(e) =>
                                        setFormData({
                                          ...formData,
                                          backSide: e.target.value,
                                        })
                                      }
                                      required
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <div>
                      <button
                        type="button"
                        className="btn btn-danger light mr-3 shadow-none"
                        data-dismiss="modal"
                        onClick={(e) => updateModel(e.preventDefault())}
                      >
                        Close
                      </button>
                      {loading ? (
                        <LoadingButton />
                      ) : (
                        <button
                          type="button"
                          className="bg-[#1b1a17] hover:bg-[#cf7500] p-2.5 text-white font-semibold rounded"
                          onClick={handleUpdate}
                        >
                          Save changes
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        {/* ===============End:: UpdateModel ================ */}

        {/* ===============Start:: ViewModel ================ */}
        <div
          className={`h-screen w-full bg-gray-600 bg-opacity-30 backdrop-blur-sm mt-[90%] lg:mt-0 fixed flex items-center justify-center z-40 ${
            updateClientModel === true ? "block" : "hidden"
          }`}
        >
          <div className="bg-white w-screen shadow-2xl rounded-lg p-4 pb-8 h-screen -ml-8 -mt-6">
            <div className="custom-tab-1">
            <div className="flex justify-end pr-10 -mt-4">
              <button
                type="button"
                className=""
                data-dismiss="modal"
                onClick={(e) => ViewAndUpdateModel(e.preventDefault())}
              >
                <span>&times;</span>
              </button>
            </div>
              <div className="row">
                <div className="col-md-4">
                  <br />
                  <br />
                  <br />
                  <div className="text-center mb-3 mt-3">
                    <div className="profile-photo flex justify-center mx-auto">
                      <img
                        src={RowData?.avatar}
                        width="100"
                        className="img-fluid rounded-circle"
                        alt=""
                      />
                    </div>
                    <h3 className="mt-4 mb-1">{RowData?.fullName}</h3>
                    <button
                      className="bg-warning hover:bg-primaryHover hover:text-white btn btn-success btn-s mr-3 shadow-none"
                      onClick={() =>
                        updateModel(
                          setFormData(RowData),
                          setId(RowData.driverId)
                        )
                      }
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-outline-danger btn-s shadow-none"
                      onClick={() => {
                        deleteModel(SetRowData(RowData), setId(RowData._id));
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <br />
                </div>
                <div className="col-md-8">
                  <ul
                    className="nav nav-tabs h-16 flex items-center justify-between px-20 bg-transparent
  text-gray-900"
                  >
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-toggle="tab"
                        onClick={handlerClientDetals}
                      >
                        Driver Details
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-toggle="tab"
                        onClick={() => {
                          handlerClientAp();
                        }}
                      >
                        Experiance
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-toggle="tab"
                        onClick={() => {
                          handlerClientSales();
                        }}
                      >
                        Documents
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    {clientSales && (
                      <div className="tab-pane fade active show overflow-y-auto h-[75vh] scrollbar-hide">
                        <ClientService RowData={RowData} />
                      </div>
                    )}

                    {clientAp && (
                      <div className="tab-pane fade active show overflow-y-auto h-[75vh] scrollbar-hide">
                        <br />
                        <ClientAppointment RowData={RowData} />
                      </div>
                    )}

                    {clientDetals && (
                      <div
                        className="tab-pane fade active show overflow-y-auto h-[75vh] scrollbar-hide"
                        id="product-details"
                      >
                        <br />
                        <ClientDetails RowData={RowData} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ===============End:: ViewModel ================ */}

        <div className="content-body mt-28 ml-56">
          <div className="container-fluid">
            <div className="relative form-head mb-3 flex items-center justify-between">
              <div className="mr-auto d-none d-lg-block">
                <h2 className="text-black font-w500 mb-6">Our Drivers</h2>
                {/* <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    value={search}
                    onChange={handleInputChange}
                    className="w-[50vh] py-2 px-2 rounded"
                    placeholder="Search by Name or Gender"
                  />
                </div> */}
              </div>
              <button
                type="button"
                className="absolute right-0 btn btn-sm btn-primary light d-flex align-items-center svg-btn shadow-none"
                data-toggle="modal"
                data-target="#new-client"
                aria-expanded="false"
                onClick={removeModel}
              >
                <span className="fs-16 ">Add new Driver</span>
              </button>
            </div>
            <div className="row">
              <div className="col-12">
                {loading && <Skeleton />}
                {!loading && (
                  <div className="table-responsive">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table
                            id="table-to-xls"
                            className="display table-hover w-full"
                          >
                            <thead>
                              <tr className="border-b">
                                <th className="py-6">Names</th>
                                <th className="py-6">Email</th>
                                <th className="py-6">Address</th>
                                <th className="py-6">City</th>
                                <th className="py-6">Telephone</th>
                                <th className="py-6">Gender</th>
                                <th className="py-6">Cost(Rwf)</th>
                                <th className="py-6">Status</th>
                                <th className="py-6">{""}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Data?.map((item) => (
                                <tr key={item._id} className="border-b">
                                  <td className="py-3 capitalize">
                                    {item?.fullName}
                                  </td>
                                  <td className="py-3 capitalize">
                                    {item?.email}
                                  </td>
                                  <td className="py-3 capitalize">
                                    {item?.address}
                                  </td>
                                  <td className="py-3 capitalize">
                                    {item?.cityName}
                                  </td>
                                  <td className="py-3 capitalize">
                                    {item?.phoneNumber}
                                  </td>
                                  <td className="py-3 capitalize">
                                    {item?.gender}
                                  </td>
                                  <td className="py-3 capitalize">
                                    {parseInt(item?.cost).toLocaleString()}
                                  </td>
                                  <td className="py-3 capitalize">
                                    {item?.status}
                                  </td>
                                  <td className="py-3">
                                    {" "}
                                    <button
                                      className="rounded px-4 py-1.5  border border-gray-600 bg-gray-900 text-white"
                                      onClick={() => {
                                        ViewAndUpdateModel(SetRowData(item));
                                      }}
                                    >
                                      view
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export default DriverList;
