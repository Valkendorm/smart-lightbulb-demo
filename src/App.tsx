import { Link, Outlet, ScrollRestoration } from "react-router-dom";
import { SideNavigation } from "./components/SideNavigation";
import "./App.css";
import xLogo from "./assets/x-logo.svg";

const links = [
  { to: "choose-a-color", label: "Choose a color" },
  { to: "cycle-colors", label: "Cycle colors" },
  { to: "random-colors", label: "Random colors" },
  { to: "global-controls", label: "Global controls" },
];

function App() {
  return (
    <div className="app">
      <ScrollRestoration />
      <header>
        <div>
          <h1>💡</h1>
          <div>
            <h1>
              <Link to="/">Smart Lightbulb</Link>
            </h1>
            <h6>
              Made by Martin Asnong{" · "}
              <a href="https://x.com/Valkendorm" target="_blank">
                <img src={xLogo} alt="X @Valkendorm" height={10} width="auto" />{" "}
                @Valkendorm
              </a>
            </h6>
          </div>
        </div>
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
