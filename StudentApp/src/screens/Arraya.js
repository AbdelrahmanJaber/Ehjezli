import React, { useEffect, useState, Component, useRef } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

var axios = require("axios").default;

var options = {
  method: "GET",
  url: "https://trueway-directions2.p.rapidapi.com/FindDrivingPath",
  params: {
    origin: "32.226913,35.222492",
    destination: "32.22164945630641,35.23874061209938",
  },
  headers: {
    "x-rapidapi-host": "trueway-directions2.p.rapidapi.com",
    "x-rapidapi-key": "9ccb99e5f7msh669c9f9dfb0a2bcp1760a4jsnfaaa9334367e",
  },
};

var points = [];

const RouteMapNew = () => {
  const [route, setroute] = useState();

  const func = async () => {
    await axios
      .request(options)
      .then((response) => {
        response.data.route.geometry.coordinates.map((item) => {
          points.push({
            latitude: item[0],
            longitude: item[1],
          });
        });

        setroute(points);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  func();

  console.log(points);

  return <></>;
};

export default RouteMapNew;
