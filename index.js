/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import "./src/helper/numberHelpers";

AppRegistry.registerComponent(appName, () => App);
