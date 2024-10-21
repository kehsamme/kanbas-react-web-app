import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";
export default function AssignmentEditor() {
    const { aid } = useParams();
    const assignments = db.assignments;
    return (
      <div>
        {assignments
          .filter((assignment: any) => assignment._id === aid)
          .map((assignment: any) => (
      <div id="wd-assignments-editor">
        
        <form key={aid}>
        <div className="col-12 container">
        <label>Assignment Name</label> <br/>
        <div className="mb-3">
        <input className="form-control" id="wd-name" value={assignment.title} /><br /><br />
        <textarea className="form-control" id="wd-description" cols={50} rows={10}>
         {assignment.description}
        </textarea>
        </div>
        <br />
        <div className="row">
          <div className="col-2">Points</div>
              <div className="col-6">
                <input id="wd-points" className="form-control" value={assignment.points} />
          </div>
          <br /><br />
          <div className="row">
            <div className="col-2">
                <label htmlFor="wd-group">Assignment Group</label>
              </div>
              <div className="col-6">
                    <select id="wd-group" className="form-select">
                    <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="QUIZZES">Quizzes</option>
                    <option value="PROJECT">Project</option>
                    </select> 
              </div>
            </div>
            <br /><br />
            <div className="row">
              <div className="col-2">
                    <label htmlFor="wd-display-grad-as">Display Grade as</label> 
                </div>
              <div className="col-6">
                    <select id="wd-display-grad-as" className="form-select">
                    <option selected value="PERCENTAGE">Percentage</option>
                    <option value="FRACTION">Fraction</option>
                    </select> 
                    <br />
                    <br />
                </div>
            </div>
            <br /><br />
            <div className="row">
            <div className="col-2">
                    <label htmlFor="wd-submission-type">Submission Type</label> 
                </div>
                <div className="col-6 padding-editor">
                    <select id="wd-select-submission" className="form-select">
                    <option selected value="ONLINE">Online</option>
                    <option value="PAPER">Paper</option>
                    </select><br/><br/>

                    <label>Online Entry Options:</label><br/><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-text-entry"/>
                    <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br/><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-website-url"/>
                    <label htmlFor="wd-chkbox-website-URL">Website URL</label><br/><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-media-recordings"/>
                    <label htmlFor="wd-chkbox-media-record">Media Recordings</label><br/><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-student-annotation"/>
                    <label htmlFor="wd-chkbox-student-ant">Student Annotation</label><br/><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-file-upload"/>
                    <label htmlFor="wd-chkbox-file-upload">File Uploads</label>
                    <br />
                    <br />
                </div>
            </div>
            <br /><br />
            <br /><br />
            <div className="row">
              <div className="col-2">
                <label htmlFor="wd-assign-to"> Assign </label> <br/></div>
              <div className="col-6 padding-editor">
                <label htmlFor="wd-assign-to"> Assign to </label> <br/>
                <select className="form-select">
                <option selected value="EVERYONE">Everyone</option>
                <option value="EMMA">Emma Shek</option>
                </select>
                <br />
                <label htmlFor="wd-due-date"> Due </label> <br/>
                <input className="form-control" type="date"
                id="wd-due-date"
                value={assignment.due}/>
                <br />
                <div className="row">
                  <div className="col-6">
                <label htmlFor="wd-available-from"> Available from </label> <br/>
                <input className="form-control" type="date"
                id="wd-available-from"
                value={assignment.availability}/>
                </div>
                <div className="col-6">
                <label htmlFor="wd-available-until"> Until </label> <br/>
                <input className="form-control" type="date"
                id="wd-available-until"
                value={assignment.due}/> 
              </div>
            </div>
            </div>
            </div>
              </div>
              </div>
              </form>
              <br/><br/>
              <div className="row">
                <div className="col-10 d-flex justify-content-end">
                <Link to={`/Kanbas/Courses/${assignment.course}/Assignments`} className="btn btn-secondary" id="wd-cancel">
                  Cancel
                </Link> 
                <Link to={`/Kanbas/Courses/${assignment.course}/Assignments`} className="btn btn-danger" id="wd-save">
                  Save
                </Link>
              </div>
            </div>
          </div>
    ))} </div> 
  );
}
  

 