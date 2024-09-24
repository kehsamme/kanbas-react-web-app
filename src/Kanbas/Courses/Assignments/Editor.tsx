export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <h3>Assignment Name</h3> <br/>
        <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
        <textarea id="wd-description" cols={50} rows={10}>
          The assignment is available online Submit a link to the landing page of your Web application running on Netlify. 
          The landing page should include the following: Your full name and section Links to each of the lab assignments Link 
          to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link 
          to navigate back to the landing page.
        </textarea>
        <br />
        <br />
          <table>
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-points">Points</label>
              </td>
              <td>
                <input id="wd-points" value={100} />
                <br />
                <br />
              </td>
            </tr>
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
              </td>
              <td>
                    <select id="wd-group">
                    <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                    <option value="QUIZZES">Quizzes</option>
                    <option value="PROEJCT">Project</option>
                    </select> 
                    <br />
                    <br />
              </td>
            </tr>
            <tr>
              <td align="right" valign="top">
                    <label htmlFor="wd-display-grad-as">Display Grade as</label> 
                </td>
                <td>
                    <select id="wd-display-grad-as">
                    <option selected value="PERCENTAGE">Percentage</option>
                    <option value="FRACTION">Fraction</option>
                    </select> 
                    <br />
                    <br />
                </td>
            </tr>
            <tr>
                <td align="right" valign="top">
                    <label htmlFor="wd-submission-type">Submission Type</label> 
                </td>
                <td>
                    <select id="wd-select-submission">
                    <option selected value="ONLINE">Online</option>
                    <option value="PAPER">Paper</option>
                    </select><br/><br/>

                    <label>Online Entry Options:</label><br/>

                    <input type="checkbox" name="submission-type" id="wd-text-entry"/>
                    <label htmlFor="wd-chkbox-text-entry">Text Entry</label><br/>

                    <input type="checkbox" name="submission-type" id="wd-website-url"/>
                    <label htmlFor="wd-chkbox-website-URL">Website URL</label><br/>

                    <input type="checkbox" name="submission-type" id="wd-media-recordings"/>
                    <label htmlFor="wd-chkbox-media-record">Media Recordings</label><br/>

                    <input type="checkbox" name="submission-type" id="wd-student-annotation"/>
                    <label htmlFor="wd-chkbox-student-ant">Student Annotation</label><br/>

                    <input type="checkbox" name="submission-type" id="wd-file-upload"/>
                    <label htmlFor="wd-chkbox-file-upload">File Uploads</label>
                    <br />
                    <br />
                </td>
            </tr>
            <tr>
              <td align="right" valign="top"> 
                <label htmlFor="wd-assign-to"> Assign </label> <br/></td>
              <td>
                <label htmlFor="wd-assign-to"> Assign to </label> <br/>
                <input id="wd-text-fields-assign-to" placeholder="Everyone" />
                <br />
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <br/>
              </td>
              <td>
              <label htmlFor="wd-due-date"> Due </label> <br/>
                <input type="date"
                id="wd-due-date"
                value="2024-05-13"/>
                <br />
                <br />
              </td>
            </tr>
            <tr>
              <td>
                <br/>
              </td>
              <td>
                <label htmlFor="wd-available-from"> Available from </label> <br/>
                <input type="date"
                id="wd-available-from"
                value="2024-05-06"/>
                <br/>
                <br/>
              </td>
              <td>
                <label htmlFor="wd-available-until"> Until </label> <br/>
                <input type="date"
                id="wd-available-until"
                value="2024-05-20"/> 
                <br/>
                <br/>
              </td>
              </tr>
              <tr>
                <td>
                </td>
                <td>
                </td>
                  <td align="right" valign="bottom">
                  <button id="wd-cancel" onClick={() => alert("Life is Good!")} type="button">
                  Cancel
                  </button>
                  <button id="wd-cancel" onClick={() => alert("Life is Good!")} type="button">
                      Save
                  </button>
                  </td>
              </tr>
          </table>
      </div>
  );}
  

 