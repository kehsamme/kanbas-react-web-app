export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <h3>Assignment Name</h3> <br/>
        <div className="mb-3">
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" cols={50} rows={10}>
          The assignment is available online Submit a link to the landing page of your Web application running on Netlify. 
          The landing page should include the following: Your full name and section Links to each of the lab assignments Link 
          to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link 
          to navigate back to the landing page.
        </textarea>
        <br />
        <br />
        <div className="row">
          <div className="col">
                <label htmlFor="wd-points">Points</label>
              <div className="col">
                <input id="wd-points" value={100} />
          </div>
          </div>
          <div className="row">
            <div className="col">
                <label htmlFor="wd-group">Assignment Group</label>
              </div>
              <div className="col">
                    <select id="wd-group" className="form-select">
                    <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="QUIZZES">Quizzes</option>
                    <option value="PROJECT">Project</option>
                    </select> 
              </div>
            </div>
            <div className="row">
              <div className="col">
                    <label htmlFor="wd-display-grad-as">Display Grade as</label> 
                </div>
              <div className="col">
                    <select id="wd-display-grad-as" className="form-select">
                    <option selected value="PERCENTAGE">Percentage</option>
                    <option value="FRACTION">Fraction</option>
                    </select> 
                    <br />
                    <br />
                </div>
            </div>
            <form>
            <div className="row">
            <div className="col">
                    <label htmlFor="wd-submission-type">Submission Type</label> 
                </div>
                <div className="col">
                    <select id="wd-select-submission" className="form-select">
                    <option selected value="ONLINE">Online</option>
                    <option value="PAPER">Paper</option>
                    </select><br/><br/>

                    <label>Online Entry Options:</label><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-text-entry"/>
                    <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-website-url"/>
                    <label htmlFor="wd-chkbox-website-URL">Website URL</label><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-media-recordings"/>
                    <label htmlFor="wd-chkbox-media-record">Media Recordings</label><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-student-annotation"/>
                    <label htmlFor="wd-chkbox-student-ant">Student Annotation</label><br/>

                    <input className="form-check-input" type="checkbox" name="submission-type" id="wd-file-upload"/>
                    <label htmlFor="wd-chkbox-file-upload">File Uploads</label>
                    <br />
                    <br />
                </div>
            </div>
            </form>
            <div className="row">
              <div className="col">
                <label htmlFor="wd-assign-to"> Assign </label> <br/></div>
              <div className="col">
                <label htmlFor="wd-assign-to"> Assign to </label> <br/>
                <input id="wd-text-fields-assign-to" placeholder="Everyone" />
                <br />
                <br />
              </div>
            </div>
            <div className="row">
            <div className="col">
                <br/>
              </div>
              <div className="col">
              <label htmlFor="wd-due-date"> Due </label> <br/>
                <input type="date"
                id="wd-due-date"
                value="2024-05-13"/>
                <br />
                <br />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="wd-available-from"> Available from </label> <br/>
                <input type="date"
                id="wd-available-from"
                value="2024-05-06"/>
                <br/>
                <br/>
              </div>
              <div className="col">
                <label htmlFor="wd-available-until"> Until </label> <br/>
                <input type="date"
                id="wd-available-until"
                value="2024-05-20"/> 
                <br/>
                <br/>
              </div>
              </div>
              <div className="row">
                <div className="col">
                  <button id="wd-cancel" onClick={() => alert("Changes Canceled")} type="button">
                  Cancel
                  </button>
                  <button id="wd-cancel" onClick={() => alert("Changes Saved")} type="button">
                      Save
                  </button>
                  </div>
              </div>
      </div>
      </div>
      </div>
  );
}
  

 