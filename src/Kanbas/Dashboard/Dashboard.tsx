import { Link } from "react-router-dom";
import * as db from "../Database";
export default function Dashboard() {
  const courses = db.courses;
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <img src={`/images/${course.image}`} width="100%" height={160} />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>
                    <button className="btn btn-primary"> Go </button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>);}



        {/* <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/4420/Home">
            <img src="/images/reactjs.jpg" width="100%" height={160}/>
            <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    DS4420 Machine Learning 2
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    2024_2 Fall 2024 Semester Full Term
                </p>
                <button className="btn btn-primary"> Go </button>
            </div>
        </Link>
        </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5591/Home">
            <img src="/images/reactjs.jpg" width="100%" height={160}/>
            <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    BIOL5591 Advanced Genomics
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    2024_3 Fall 2024 Semester Full Term
                </p>
                <button className="btn btn-primary"> Go </button>
            </div>
        </Link>
        </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/4202/Home">
            <img src="/images/reactjs.jpg" width="100%" height={160}/>
            <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    PHTH4202 Epidemiology
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    2024_4 Fall 2024 Semester Full Term
                </p>
                <button className="btn btn-primary"> Go </button>
            </div>
        </Link>
        </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5591/Home">
            <img src="/images/reactjs.jpg" width="100%" height={160}/>
            <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    BIOL5591 Advanced Genomics
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    2024_5 Fall 2024 Semester Full Term
                </p>

                <button className="btn btn-primary"> Go </button>
            </div>
        </Link>
        </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5591/Home">
            <img src="/images/reactjs.jpg" width="100%" height={160}/>
            <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    BIOL5591 Advanced Genomics
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    2024_6 Fall 2024 Semester Full Term
                </p>
                <button className="btn btn-primary"> Go </button>
            </div>
        </Link>
        </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/5591/Home">
            <img src="/images/reactjs.jpg" width="100%" height={160}/>
            <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    BIOL5591 Advanced Genomics
                </h5>
                <p className="wd-dashboard-course-title card-text">
                    2024_7 Fall 2024 Semester Full Term
                </p>
                <button className="btn btn-primary"> Go </button>
            </div>
        </Link>
        </div>
        </div> */}
//         </div>
//         </div>
//     </div>
//     );
// }

