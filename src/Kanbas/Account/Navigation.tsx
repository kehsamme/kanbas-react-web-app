import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  const { pathname } = useLocation();


  // const links = currentUser ? [{ path: "/Kanbas/Account/Profile", label: "Profile" }] 
  // : [
  //     { path: "/Kanbas/Account/Signin", label: "Signin" }, 
  //     { path: "/Kanbas/Account/Signup", label: "Signup" }
  //   ];


  return (
      <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
        {/* {links.map((link) => (
        <Link key={link.path} to={link.path} className={`list-group-item bg-white text-left border-0
              ${pathname.includes(link.label) ? "active border border-0" : "text-danger border border-0"}`}>
          {link.label}
        </Link>))} */}
        {links.map((link) => (
       <Link key={link} to={`/Kanbas/Account/${link}`} className={`list-group-item ${active(link)}`}> {link} </Link>
        ))}
        {currentUser && currentUser.role === "FACULTY" && (
       <Link to={`/Kanbas/Account/Users`} className={`list-group-item ${active("Users")}`}> Users </Link> )}
       <hr />

    </div>
);}
