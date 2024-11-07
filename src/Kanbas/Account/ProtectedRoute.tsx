// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// export default function ProtectedRoute({ children }: { children: any }) {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   if (currentUser) {
//     return children;
//   } else {
//     return <Navigate to="/Kanbas/Account/Signin" />;
// }}

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiresStudent?: boolean;       // Restrict to students
    requiresEnrollment?: boolean;    // Require enrollment for specific course
}

export default function ProtectedRoute({
    children,
    requiresStudent = false,
    requiresEnrollment = false,
}: ProtectedRouteProps) {
    const { cid } = useParams(); // Course ID for course-specific routes
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

    // Check if user is logged in
    if (!currentUser) {
        return <Navigate to="/Kanbas/Account/Signin" />;
    }

    // Restrict to students if `requiresStudent` is true
    if (requiresStudent && currentUser.role !== "Student") {
        return <Navigate to="/Dashboard" />;
    }

    // Check enrollment for course-specific routes if `requiresEnrollment` is true
    const isEnrolled = enrollments.some(
        (enrollment: any) => enrollment.user === currentUser._id && enrollment.course === cid
    );

    if (requiresEnrollment && !isEnrolled) {
        return <Navigate to="/Dashboard" />;
    }

    return <>{children}</>;
}
