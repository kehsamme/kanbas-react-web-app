import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses(7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
    <div className="row row-cols-1 row-cols-md-5 g-4">
        <div className="wd-dashboard-course col" style={{ width: "300px"}}>
        <div className="card rounded-3 overflow-hidden">
          <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home">
            <img src="/images/reactjs.jpg" width="110%" height={160}/>
            <div className="card-body">
                <h5 className="wd-dashboard-course-title card-title">
                    CS1234 Full Stack Software Developer
                </h5>
                <p className="wd-dashboard-course-title card-title">
                    2024_1 Fall 2024 Semester Full Term
                </p>
                <button className="btn btn-primary"> Go </button>
            </div>
        </Link>
        </div>
        </div>
        <div className="wd-dashboard-course col" style={{ width: "300px" }}>
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
        </div>
        </div>
        </div>
    </div>
    );
}

