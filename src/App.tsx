import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <h3>Demos</h3>
      <nav>
        <ul>
          <li>
            <Link to="v1">Choose a color</Link>
          </li>
          <li>
            <Link to="v2">Cycle colors</Link>
          </li>
          <li>
            <Link to="v3">Random colors</Link>
          </li>
          <li>
            <Link to="v4">Global controls</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
