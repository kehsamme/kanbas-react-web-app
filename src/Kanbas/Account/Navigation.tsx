import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? [{ path: "/Kanbas/Account/Profile", label: "Profile" }] 
  : [
      { path: "/Kanbas/Account/Signin", label: "Signin" }, 
      { path: "/Kanbas/Account/Signup", label: "Signup" }
    ];
  const { pathname } = useLocation();


  return (
      <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
        {links.map((link) => (
        <Link key={link.path} to={link.path} className={`list-group-item bg-white text-left border-0
              ${pathname.includes(link.label) ? "active border border-0" : "text-danger border border-0"}`}>
          {link.label}
        </Link>))}
    </div>
);}
