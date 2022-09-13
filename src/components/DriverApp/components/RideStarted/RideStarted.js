import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ReadyStartData, RideStartedData } from "../DriveData";
import "./RideStarted.css";
import Rectanglebar from "../Navigate/Rectangle-bar.png";
import { CallLogIcon } from "../../../../shared/icons/CallLog";
import { CarLogIcon } from "../../../../shared/icons/CarLog";
import { MapPin } from "react-feather";
import { LocationIcon } from "../../../../shared/icons/Location";
import { startRide } from "../SwitchButton/Driver.Services";

function RideStarted({ trip, location }) {
  console.log({ trip, location });
  const [smShow, setSmShow] = useState({ status: false, data: undefined });
  const [rideDetail, setRideDetail] = useState(false);
  const handleStartRide = async () => {
    const res = await startRide(trip.Id).then((response) => response.data);
    setSmShow({ status: !smShow.status, data: res.Trip });
  };
  console.log({ smShow });
  const status = smShow.data ? smShow.data.DisplayStatus : "Not Confirmed";
  return (
    <>
      {smShow.status ? (
        <div className="bottomModal">
          <div
            className="rectangle-bar"
            onClick={() => setRideDetail(!rideDetail)}
          >
            <button class="recbar">
              <img src={Rectanglebar} alt="Rectangle bar" />
            </button>
          </div>
          <div className="titlle" id="example-modal-sizes-title-sm">
            {RideStartedData.title}
          </div>
          <div>
            <div className="titlle-text" id="example-modal-sizes-title-sm">
              <div>You are on your way towards</div>
              the drop locations
            </div>
          </div>
          <div className="carLog">
            <CarLogIcon />
          </div>
          <div className="callLog">
            <CallLogIcon />
          </div>
          <RideStartedExpand
            rideDetail={rideDetail}
            trip={trip}
            setRideDetail={setRideDetail}
            location={location}
          />
        </div>
      ) : (
        <div></div>
      )}
      <Button onClick={handleStartRide} className="me-2 fixed-bottom">
        {status === "Started" ? "Navigate" : "Start Ride"}
      </Button>
    </>
  );
}

export default RideStarted;

function RideStartedExpand({ rideDetail, setRideDetail, location, trip }) {
  return (
    <>
      {rideDetail ? (
        <div className="bottomModal-R">
          <div className="rectangle-bar-R" onClick={() => setRideDetail(false)}>
            <button class="recbar-R">
              <img src={Rectanglebar} alt="Rectangle bar" />
            </button>
          </div>
          <div className="nevigate-body-R">
            <div>
              <div>
                <div className="titlle-R" id="example-modal-sizes-title-sm">
                  {RideStartedData.title}
                </div>
                <div className="carLog-R">
                  <CarLogIcon />
                </div>
                <div className="callLog-R">
                  <CallLogIcon />
                </div>
                <h6 className="h6-R">
                  <div>You are on your way towards</div>
                  the drop locations
                </h6>
              </div>

              <div>
                <hr className="hr-RS" />
              </div>

              <div className="loc-RS">
                <span className="SourceAddress-RS">
                  <LocationIcon />
                  <p className="sub-RS">{location.driverAddress}</p>
                </span>
                <span className="MapPin-RS">
                  <MapPin color="#D22323" className="map-RS" />
                  <p className="dest-RS">{location.pickupAddress}</p>
                </span>
              </div>

              <hr className="hrs-RS" />
              <h6 className="hd-RS">{ReadyStartData.TotalRide} :</h6>
              <h6 className="rs-RS">{trip.Price || ReadyStartData.Amount}</h6>
              <p className="ps-RS">{ReadyStartData.Colletion}</p>
              <hr className="Cancelridehr-RS" />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
