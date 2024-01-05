"use client";

import styles from "./page.module.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MapComponent = withScriptjs(
  withGoogleMap(({ location, googleMapURL }) => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: location.latitude, lng: location.longitude }}
    >
      <Marker position={{ lat: location.latitude, lng: location.longitude }} />
    </GoogleMap>
  ))
);

const staticLocationData = {
  country: "Sweden",
  ip: "78.72.18.228",
  latitude: 59.3293,
  longitude: 18.0686,
};

const Page = () => {
  const [locationData, setLocationData] = useState(null);
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_location");
        const data = await response.json();
        setLocationData(data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocationData();
  }, []);

  return (
    <div className={styles.main}>
      <>
        <MapComponent
          location={locationData || staticLocationData}
          googleMapURL={{
            query: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
          }}
          loadingElement={<div style={{ height: "100vh" }} />}
          containerElement={<div style={{ height: "100vh", width: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </>
    </div>
  );
};

export default Page;
