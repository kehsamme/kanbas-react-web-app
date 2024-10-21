import { Link, useParams, useLocation} from "react-router-dom";
export default function CoursesNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = [
    { label: "Home",       path: `/Kanbas/Courses/${cid}/Home` },
    { label: "Modules",    path: `/Kanbas/Courses/${cid}/Modules` },
    { label: "Piazza",     path: `/Kanbas/Courses/${cid}/Piazza` },
    { label: "Zoom",       path: `/Kanbas/Courses/${cid}/Zoom` },
    { label: "Assignments",path: `/Kanbas/Courses/${cid}/Assignments` },
    { label: "Quizzes",    path: `/Kanbas/Courses/${cid}/Quizzes` },
    { label: "Grades",     path: `/Kanbas/Courses/${cid}/Grades` },
    { label: "People",     path: `/Kanbas/Courses/${cid}/People` }
  ];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link key={link.path} to={link.path} className={`list-group-item bg-white text-left border-0
              ${pathname.includes(link.label) ? "active border border-0" : "text-danger border border-0"}`}>
          {link.label}
        </Link>
      ))}
    </div>
);}