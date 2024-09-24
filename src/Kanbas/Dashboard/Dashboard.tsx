import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses(4)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width={200} alt=""/>
            <div>
                <h5>
                    CS1234 React JS
                </h5>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer
                </p>
                <button> Go </button>
            </div>
        </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/4420/Home">
            <img src="/images/reactjs.jpg" width={200} alt=""/>
            <div>
                <h5>
                    DS4420 
                </h5>
                <p className="wd-dashboard-course-title">
                    Machine Learning 2
                </p>
                <button> Go </button>
            </div>
        </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/5591/Home">
            <img src="/images/reactjs.jpg" width={200} alt=""/>
            <div>
                <h5>
                    BIOL5591
                </h5>
                <p className="wd-dashboard-course-title">
                    Advanced Genomics
                </p>
                <button> Go </button>
            </div>
        </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/4202/Home">
            <img src="/images/reactjs.jpg" width={200} alt=""/>
            <div>
                <h5>
                    PHTH4202
                </h5>
                <p className="wd-dashboard-course-title">
                    Epidemiology
                </p>
                <button> Go </button>
            </div>
        </Link>
        </div>
        </div>
    </div>
    );
}

