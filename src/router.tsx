import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import { SmartLightbulbV1Demo } from "./routes/v1";
import { SmartLightbulbV2Demo } from "./routes/v2";
import { SmartLightbulbV3Demo } from "./routes/v3";
import { SmartLightbulbV4Demo } from "./routes/v4";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="v1" element={<SmartLightbulbV1Demo />} />
      <Route path="v2" element={<SmartLightbulbV2Demo />} />
      <Route path="v3" element={<SmartLightbulbV3Demo />} />
      <Route path="v4" element={<SmartLightbulbV4Demo />} />
    </Route>
  )
);
