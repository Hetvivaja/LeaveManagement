import React ,{useState} from "react";

const LeaveForm=({onSubmit,loading})=>{

    const [form,setForm]=useState({
         leave_type : '',
        start_date : '',
        end_date   : '',
        reason     : '',});

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value});
    };

    const handleSubmit=(e)=>{
        if(!form.leave_type || !form.start_date || !form.end_date || !form.reason){
            alert('Please fill all fields');
            return;
        }
        if(form.start_date > form.end_date){
             alert('Start date, End date se pehle honi chahiye!');
            return;
        }
        onSubmit(form);
    };

    return(
         <div style={styles.container}>

            {/* Leave Type */}
            <label style={styles.label}>Leave Type</label>
            <select
                name="leave_type"
                style={styles.input}
                onChange={handleChange}
            >
                <option value="">Select Leave Type</option>
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="earned">Earned Leave</option>
                <option value="maternity">Maternity Leave</option>
            </select>

            {/* Start Date */}
            <label style={styles.label}>Start Date</label>
            <input
                style={styles.input}
                type="date"
                name="start_date"
                onChange={handleChange}
            />

            {/* End Date */}
            <label style={styles.label}>End Date</label>
            <input
                style={styles.input}
                type="date"
                name="end_date"
                onChange={handleChange}
            />

            {/* Reason */}
            <label style={styles.label}>Reason</label>
            <textarea
                style={styles.textarea}
                name="reason"
                placeholder="Leave for reason write..."
                onChange={handleChange}
            />

            {/* Submit Button */}
            <button
                style={styles.button}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit Leave'}
            </button>

        </div>
    );
};

const styles={
    container : { display:'flex', flexDirection:'column' },
    label     : { marginBottom:'5px', fontWeight:'bold', color:'#333' },
    input     : { padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ddd', fontSize:'14px' },
    textarea  : { padding:'10px', marginBottom:'15px', borderRadius:'5px', border:'1px solid #ddd', fontSize:'14px', height:'100px', resize:'vertical' },
    button    : { padding:'12px', background:'#1890ff', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontSize:'16px' },  
};
export default LeaveForm;