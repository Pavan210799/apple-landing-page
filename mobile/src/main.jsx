import { AppRegistry } from "react-native";
import App from "./App";

AppRegistry.registerComponent("IPhone", () => App);
AppRegistry.runApplication("IPhone", {
  rootTag: document.getElementById("root"),
});
