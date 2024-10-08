
import { FaPlus } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";
export default function AssignmentsControl() {
    return(
      <div id="wd-modules-controls" className="text-nowrap">
        <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment</button>
        <button id="wd-view-progress" className="btn btn-lg btn-secondary me-1 float-end">
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Group</button>
          <div id="wd-css-responsive-forms-2">
            <div className="col-sm-10">
                <input type="search" className="form-control" id="r1" placeholder="Search"/>
            </div> 
            </div>
        </div>
  );
}