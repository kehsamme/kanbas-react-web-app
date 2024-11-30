import "./style.css";
import { Routes, Route, Navigate } from "react-router"
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import Account from "./Account";
import Dashboard from "./Dashboard/Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
// import * as db from "./Database";
import ProtectedRoute from "./Account/ProtectedRoute";
// import Enrollment from "./Enrollments/Enrollment"
import Enrollment from "./Enrollments/Enrollment"
import Session from "./Account/Session";
import * as client from "./Courses/client";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentClient from "./Courses/client";





export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchCourses = async () => {
      try {
        //console.log("before find my courses")
        const courses = await userClient.findAllCourses();
        setCourses(courses);
        //console.log(courses)
      } catch (error) {
        console.error(error);
      }
    };
    useEffect(() => {
      fetchCourses();
    }, [currentUser]);
  
    const [course, setCourse] = useState<any>({
        _id: "0", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15",
        image: "/images/reactjs.jpg", description: "New Description"
    });
    const addNewCourse = async () => { const newCourse = await userClient.createCourse(course);
        setCourses([ ...courses, newCourse ]);    
            };
    const deleteCourse = async (courseId: string) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
        };
    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(
            courses.map((c) => {
            if (c._id === course._id) {
                return course;
            } else {
                return c;
            }
            })
        );
    };
    return (
    <Session>
      <div id="wd-kanbas">
                <KanbasNavigation />
                <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={ <ProtectedRoute>
                        <Dashboard
                            courses={courses}
                            course={course}
                            setCourse={setCourse}
                            addNewCourse={addNewCourse}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}/> </ProtectedRoute>
                    } />
                    <Route path="/Enrollment"
                        element={ <ProtectedRoute>
                            <Enrollment  courses={courses}/>
                        </ProtectedRoute> } />
                    <Route path="/Courses/:cid/*" element={<ProtectedRoute > <Courses courses={courses}/> </ProtectedRoute>} />
                    <Route path="/Calendar" element={<h1>Calendar </h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>
        </div>
    </Session>
);}