import Lab1 from "./Lab1"
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import { Route, Routes, Navigate } from "react-router";


export default function Labs() {
    return(
        <div id="wd-labs">
            <h1>Welcome to Web Dev!</h1>
            <p id="wd-name"> Emma Shek </p>
            <p id="wd-section"> T/F 3:25-5:05 </p>
            <TOC />
            <h1>Labs</h1>
            <Routes>
                <Route path="/" element={<Navigate to="Lab1" />} />
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2" element={<Lab2 />} />
                <Route path="Lab3" element={<Lab3 />} />
            </Routes>
        </div>
    );
}