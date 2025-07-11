import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import useLogOut from "../hooks/useLogOut";
import { LogOut, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const { logOut } = useLogOut();

  const getAvatarInitial = (email) => {
    return email ? email.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
     Collab AI
        </Link>
      </div>

      <div className="flex-none gap-2">
        {!user?.userFound?._id ? (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content flex items-center justify-center rounded-full  w-12">
                <span className="text-xl font-bold">{getAvatarInitial(user.userFound.email)}</span>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
            >
              <li className="p-2">
                <p className="font-semibold text-sm">Signed in as</p>
                <p className="truncate">{user.userFound.email}</p>
              </li>
              <div className="divider my-1"></div>
              {user.userFound.role === "admin" && (
                <li>
                  <Link to="/admin">
                    <ShieldCheck size={16} />
                    Admin Dashboard
                  </Link>
                </li>
              )}
              <li>
                <a onClick={logOut}>
                  <LogOut size={16} />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}