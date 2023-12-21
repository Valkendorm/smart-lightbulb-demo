import { Link, Outlet } from "react-router-dom";
import { SideNavigation } from "./components/SideNavigation";
import "./App.css";

const links = [
  { to: "choose-a-color", label: "Choose a color" },
  { to: "cycle-colors", label: "Cycle colors" },
  { to: "random-colors", label: "Random colors" },
  { to: "global-controls", label: "Global controls" },
];

function App() {
  return (
    <div className="app">
      <header>
        <h1>
          <Link to="/">💡 Smart Lightbulb</Link>
        </h1>
      </header>
      <main>
        <SideNavigation links={links} />
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default App;
