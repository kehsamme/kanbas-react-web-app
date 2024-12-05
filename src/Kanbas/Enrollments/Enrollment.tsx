import { setEnrollment, enrollCourse, unenrollCourse } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import * as enrollmentsClient from "./client";

export default function Enroll({ courses }: { courses: any[] }) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

    // const removeCourse = async (userId: string, courseId: string) => {
    //     await enrollmentsClient.unenrollUser(userId, courseId);
    //     dispatch(unenrollCourse(enrollments));
    //   };
    
      
    const fetchEnrollments = async () => {
        console.log("in fetchEnrollments ...", currentUser._id );
        const enrollments = await enrollmentsClient.getEnrollmentsForUser(currentUser._id as string);

        console.log(enrollments);

        dispatch(setEnrollment(enrollments));
      };
      useEffect(() => {
        fetchEnrollments();
      }, []);


    const addCourse = async (userId: string, courseId: string) => {
    await enrollmentsClient.enrollUser(userId, courseId);
    console.log("add course...");
    dispatch(enrollCourse({ user: currentUser._id, cid: courseId }));
    };
    

    const isEnrolled = (courseId: string) => {
        return enrollments.some(
            (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId
        );
    };

    const handleUnenroll = async (courseId: string) => {
    //const handleUnenroll = (courseId: string) => {

        console.log("in handleUnenroll... calling api...");

        const enrollments =  await enrollmentsClient.unenrollUser(currentUser._id as string, courseId as string);

        console.log(enrollments);

        // const enrollment = enrollments.find(
        //     (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId
        // );
        // if (enrollment) {
        //     dispatch(unenrollCourse(enrollment));
        // }

        dispatch(setEnrollment(enrollments));
    };

    // // testig
    // const handleUnenroll = (courseId: string) => {
    //     const enrollment = enrollments.find(
    //         (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId
    //     );
    //     if (enrollment) {
    //         removeCourse(enrollment);
    //     }
    // };

    // const handleEnroll = (courseId: string) => {
    //     dispatch(enrollCourse({ user: currentUser._id, cid: courseId }));
    // };
    const handleEnroll = (courseId: string) => {
        console.log("handle enroll...");
        addCourse( currentUser._id, courseId );
    };

    const isStudent = currentUser.role === "STUDENT";

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">
                Published Courses ({courses.length})
            </h2>

            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses.map((course) => (
                            <div key={course._id} className="wd-dashboard-course col" style={{ width: "300px" }}>
                                <div className="card rounded-3 overflow-hidden">
                                    <div className="wd-dashboard-course-link text-decoration-none text-dark">
                                        <img src="/images/reactjs.jpg" width="100%" height={160} alt="Course" />
                                        <div className="card-body">
                                            <h5 className="wd-dashboard-course-title card-title">
                                                {course.name}
                                            </h5>
                                            <p className="wd-dashboard-course-description card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                                {course.description}
                                            </p>

                                            {isEnrolled(course._id) ? (
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleUnenroll(course._id)}
                                                >
                                                    Unenroll
                                                </button>
                                            ) : (
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleEnroll(course._id)}
                                                >
                                                    Enroll
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

