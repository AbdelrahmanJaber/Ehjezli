import { combineReducers } from "redux";
import bugsReducer from "./bugs";
import projectsReducer from "./projects";
import userSliceReducer from "./userSlice";
import availableDriversReducer from "./availableDrivers";
import originPlacesReducer from "./originPlaces";
import destinationPlacesReducer from "./destinationPlaces";
import codeAndGateReducer from "./codeAndGate";

import DriverOrderInfoReducer from "./DriverOrderInfo";
import FullOrderReducer from "./FullOrder";

import carsReducer from "./cars";

import previousOrderReducer from "./previousOrder";

import expoTokenReducer from "./expoToken";

import historyReducer from "./history";

import currentLocationReducer from "./currentLocation";

import settingsReducer from "./settings";

import avatarReducer from "./avatar";

export default combineReducers({
  bugs: bugsReducer,
  projects: projectsReducer,
  userSlice: userSliceReducer,
  availableDrivers: availableDriversReducer,
  originPlaces: originPlacesReducer,
  destinationPlaces: destinationPlacesReducer,
  codeAndGate: codeAndGateReducer,

  DriverOrderInfo: DriverOrderInfoReducer,
  FullOrder: FullOrderReducer,

  expoToken: expoTokenReducer,

  cars: carsReducer,

  previousOrder: previousOrderReducer,

  history: historyReducer,

  currentLocation: currentLocationReducer,

  settings: settingsReducer,

  avatar: avatarReducer,
});
