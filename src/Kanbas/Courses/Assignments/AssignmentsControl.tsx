
import { FaPlus } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";

import { MdDoNotDisturbAlt } from "react-icons/md";
export default function AssignmentsControl() {
    return(
      <div id="wd-modules-controls" className="d-flex text-nowrap">
        <div id="wd-css-responsive-forms-2" className="flex-grow-1">
          <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                          <FaMagnifyingGlass />
                      </span>
                <input type="search" className="form-control border-start-0" id="r1" placeholder="Search" style={{width: "50%"}}/>
            </div> 
            </div>
        <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment</button>
        <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 float-end">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group</button>
        </div>
  );
}