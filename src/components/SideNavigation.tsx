import { NavLink } from "react-router-dom";
import "./SideNavigation.css";

type SideNavigationProps = {
  links: Record<"to" | "label", string>[];
};

export function SideNavigation({ links }: SideNavigationProps) {
  return (
    <nav className="side-navigation">
      <ul>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <li>{label}</li>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
