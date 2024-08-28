import { Outlet, NavLink } from "react-router-dom";
import "./Menu.css";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AuthButton from "../components/AuthButton";

const Menu = () => {
  return (
    <div className="main-layout">
      <header className="header">
        <nav className="w-100 d-flex justify-content-between align-items-center">
          <img
            style={{ maxWidth: "80px" }}
            className="text-center flex-grow-1 fs-1"
            // src='src\assests\Group_6.svg'
            src="/Group_6.svg"
            alt="N"
          />
          <AuthButton />
        </nav>
      </header>
      <main className="main-part">
        <div style={{ marginTop: "0px" }}>
          <Outlet />
        </div>
      </main>
      <footer>
        <nav>
          <NavLink to="/" className="fl-button">
            Found
          </NavLink>
          <Fab sx={{ flexBasis: 1 }} color="primary" aria-label="add">
            <NavLink className="post-button" to="postpage">
              <AddIcon />
            </NavLink>
          </Fab>
          <NavLink to="lostpage" className="fl-button">
            Lost
          </NavLink>
        </nav>
      </footer>
    </div>
  );
};

export default Menu;
