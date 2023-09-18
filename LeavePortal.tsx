import * as React from 'react'
import { Web } from 'sp-pnp-js';
import { Panel, PanelType } from 'office-ui-fabric-react';
const LeavePortal = (props: any) => {
    const [name, setName]: any = React.useState({});
    const closeLeavesPopup = () => {
        props.closeLeavesPopup()
    };
    const SaveLeave = () => {
        const Postdata = {
            Title: name.Subject,
            Name: name.Name,
            Description: name.Description,
            EventDate: new Date(name.FromDate),
            EndDate: new Date(name.ToDate),
            Event_x002d_Type: name.LeaveType,
            //Employee: name.Employee,
        };
        let web = new Web('https://hhhhteams.sharepoint.com/sites/HHHH/SP/')
        web.lists.getByTitle("SmalsusLeaveCalendar").items.add(Postdata).then((response: any) => {
            console.log(response);
            if (response)
                closeLeavesPopup()
        }).catch((error: any) => {
            console.error(error);
        });
    }
    const onRenderCustomHeaderDocuments = () => {
        return (
          <>
    
            <div className='subheading siteColor'>
            Apply Leave
            </div>
          
          </>
        );
      };
    return (
        <>
            <div>
                {<Panel
                    title="popup-title"
                    isOpen={true}
                    onDismiss={closeLeavesPopup}
                    type={PanelType.custom}
                    isBlocking={false}
                    onRenderHeader={onRenderCustomHeaderDocuments}
                    customWidth="750px"
                    >
                    {/* <div className="ms-modalExample-header">
                        <h3 id="popup-title">Apply Leave</h3>
                    </div> */}
                    <div className='applyLeavePopup'>
                        <div className="topInfoSec row mt-2">
                            <div className="col-sm-6">
                                <div className='planSecBdr inputTile'>
                                    <span>Planned Leaves</span>
                                    <span className='pull-right'><span>12</span> / 12</span>
                                </div>
                                
                            </div>
                            <div className="col-sm-6">
                                <div className='unplanSecBdr inputTile'>
                                    <span>Un-Planned Leaves</span>
                                    <span className='pull-right'><span>12</span> / 12</span>
                                </div>
                            </div>
                            <div className="col-sm-6 mt-3">
                                <div className='sickSecBdr inputTile'>
                                    <span>Sick Leaves</span>
                                    <span className='pull-right'><span>12</span> / 12</span>
                                </div>
                            </div>
                            <div className="col-sm-6 mt-3">
                                <div className='RHSecBdr inputTile'>
                                    <span> Restricted Holiday Leaves</span>
                                    <span className='pull-right'><span>12</span> / 12</span>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-4">
                                <div className='input-group'>
                                    <label className='full-width'> From Date<span className='text-danger'>*</span></label>
                                    <input type="date" className='form-control' onChange={(e) => setName({ ...name, FromDate: e.target.value })}></input>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className='input-group'>
                                    <label className='full-width'> To Date<span className='text-danger'>*</span></label>
                                    <input type="date" className='form-control' onChange={(e) => setName({ ...name, ToDate: e.target.value })}></input>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className='input-group'>
                                    <label className='full-width'> Leaves types<span className='text-danger'>*</span></label>
                                    {/* <input type="text" className='form-control' onChange={(e) => setName({ ...name, LeaveType: e.target.value })}></input> */}
                                    <select onChange={(e) => setName({ ...name, LeaveType: e.target.value })}>
                                        <option value="Planned">Planned Leave</option>
                                        <option value="UnPlanned">Un-Planned Leave</option>
                                        <option value="Sick">Sick Leaves</option>
                                        <option value="RH">RH Leave</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className='midSection SpfxCheckRadio'>
                                <span>08/Sep/2023</span> 
                                <span className='ms-4'>Working Day</span> 
                                <span className='ms-4'>Planned Leave</span>
                                <span className='ms-4'><label className='switcher'><input type="text" /><span className="slider round"></span></label>Full Day</span>
                                <span className='ms-4'><input type='radio' className='radio'/>First</span>
                                <span className='ms-2'><input type='radio' className='radio'/>Second</span>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-12">
                                <div className='input-group'>
                                    <label className='full-width'> Reason for Leave<span className='text-danger'>*</span></label>
                                    <input type="text" className='form-control' onChange={(e) =>  setName({ ...name, Description: e.target.value })}></input>
                                </div>
                            </div>
                            <div className='my-2 f-15 bold'>Alternative Contact Details</div>
                            <div className="col-sm-4">
                            <div className='input-group'>
                                <label className='full-width'> Contact Number</label>
                                <input type="text" className='form-control' onChange={(e) => setName({ ...name, Subject: e.target.value })}></input>
                            
                            </div></div>
                            <div className="col-sm-4">
                            <div className='input-group'>
                                <label className='full-width'> Contact Address </label>
                                <input type="text" className='form-control' onChange={(e) => setName({ ...name, Name: e.target.value })}></input>
                            </div></div>
                        </div>
                        <div className="modal-footer border-0 px-0">
                            {/* <PrimaryButton onClick={() => closeLeavesPopup()} text="Close" />
                            <PrimaryButton onClick={() => SaveLeave()} text="Update" /> */}
                            <button className='btn btn-primary mx-2 mt-0' onClick={() => SaveLeave()}> Save</button>
                            <button className='btn btn-default m-0' onClick={() => closeLeavesPopup()}>
                                Cancel
                            </button>
                        </div>
                    </div>

                </Panel>
                }
            </div >
        </>
    )
}
export default LeavePortal