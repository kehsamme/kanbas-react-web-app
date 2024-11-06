import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls"
import ModulesControlButtons from "./ModulesControlButtons"
import { useParams } from "react-router";
import * as db from "../../Database";
import React, { useState } from "react";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";


export default function Modules() {
    const { cid } = useParams();
    // const [modules, setModules] = useState<any[]>(db.modules);
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const dispatch = useDispatch();
   
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    // const { users } = db;
  
    // const addModule = () => {
    //   setModules([ ...modules, { _id: new Date().getTime().toString(),
    //                                   name: moduleName, course: cid, lessons: [] } ]);
    //   setModuleName("");
    // };
    // const deleteModule = (moduleId: string) => {
    //   setModules(modules.filter((m) => m._id !== moduleId));
    // };
    // const editModule = (moduleId: string) => {
    //   setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
    // };
    // const updateModule = (module: any) => {
    //   setModules(modules.map((m) => (m._id === module._id ? module : m)));
    // };
  
  

    return (
      <div>
        {isFaculty && (
        <ModulesControls  setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }} /> 
        )}
        <br /><br /><br />
        <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> 
            <BsGripVertical className="me-2 fs-3" /> 
            {!module.editing && module.name}
            { module.editing && (
              <input className="form-control w-50 d-inline-block"
                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}/>
            )}
            {isFaculty && (
            <ModulesControlButtons 
              moduleId={module._id}
              deleteModule={(moduleId) => { dispatch(deleteModule(moduleId));
              }}
              editModule={(moduleId) => dispatch(editModule(moduleId))}/>
              )}
            </div>
            {module.lessons && (
            <ul className="wd-lessons list-group rounded-0">
              {module.lessons.map((lesson: any) => (
              <li className="wd-lesson list-group-item p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                {lesson.name}
                <LessonControlButtons />
                </li>
              ))}</ul>
            )}</li>
          ))}</ul> </div>
      )
  ;}
         

        {/* <button>Collapse All</button> <button>View Progress</button> 
        <select id="wd-select-all"> <option selected value="ALL"> Publish All</option> </select> <button>+ Module</button>
        <ul id="wd-modules" className="list-group rounded-0">
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</div>
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 ps-1">
                <span className="wd-title wd-lesson list-group-item p-3 ps-1">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item wd-lesson list-group-item p-3 ps-1">Introduction to the course</li>
                  <li className="wd-content-item wd-lesson list-group-item p-3 ps-1">Learn what is Web Development</li>
                </ul>
                <span className="wd-title">READING</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer - Chapter 1 - Introduction</li>
                  <li className="wd-content-item">Full Stack Developer - Chapter 2 - Creating User</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Intro to Web Development</li>
                  <li className="wd-content-item">Creating an HTTP server with Node.js</li>
                  <li className="wd-content-item">Creating a React Application</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 1, Lecture 2 - Formatting User Interfaces with HTML</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn how to create user interfaces with HTML</li>
                  <li className="wd-content-item">Deploy the assignment to Netlify</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Intro to HTML and DOM</li>
                  <li className="wd-content-item">Formatting Web content with Headings and Lists</li>
                  <li className="wd-content-item">Formatting content with Tables and Textboxes</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Intro to CSS</li>
                  <li className="wd-content-item">Learn how to implement color</li>
                  <li className="wd-content-item">Lear how to implement font</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div> */}
 
  