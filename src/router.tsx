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
import { IndexRoute } from "./routes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<IndexRoute />} />
      <Route path="choose-a-color" element={<SmartLightbulbV1Demo />} />
      <Route path="cycle-colors" element={<SmartLightbulbV2Demo />} />
      <Route path="random-colors" element={<SmartLightbulbV3Demo />} />
      <Route path="global-controls" element={<SmartLightbulbV4Demo />} />
    </Route>
  )
);
