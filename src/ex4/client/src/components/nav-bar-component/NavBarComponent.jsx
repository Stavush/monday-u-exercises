import { useNavigate } from "react-router-dom";
import { ROUTES } from "./consts";

function NavBarComponent() {
  const navigate = useNavigate();

  return (
    <div className="tabs-div">
      {ROUTES.map(({ name, route, key }) => {
        return (
          <div className="tab" key={key} onClick={() => navigate(route)}>
            {name}
          </div>
        );
      })}
    </div>
  );
}

export default NavBarComponent;
