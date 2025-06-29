import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import useLogOut from "../hooks/useLogOut";
export default function Navbar() {
  const { user } = useAuth();
  console.log(user);
  let userFound = user?.userfound?.id;
  const { logOut } = useLogOut();
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Ticket AI
        </Link>
      </div>
      <div className="flex gap-2">
        {userFound ? (
          <>
            <Link to="/signup" className="btn btn-sm">
              Signup
            </Link>
            <Link to="/login" className="btn btn-sm">
              Login
            </Link>
          </>
        ) : (
          <>
            <p>Hi, {user?.email}</p>
            {userFound && user?.userfound?.role === "admin" ? (
              <Link to="/admin" className="btn btn-sm">
                Admin
              </Link>
            ) : null}
            <button onClick={logOut} className="btn btn-sm">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}