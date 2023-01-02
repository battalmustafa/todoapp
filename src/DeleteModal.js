import { CgDanger } from 'react-icons/cg';

function DeleteModal (props){


    function cancelHandler() {
        props.onCancel();
    }

    function confirmhandler () {
        props.onConfirm();
    }
   
    
    return (
        <div className='backdrop'>
    <div className="modal"> 
    <CgDanger color="red"
              size="24"></CgDanger>
        <p>Are you sure you want to delete it?</p>
        <button className="btnmodal btn--alt" onClick={cancelHandler}>Cancel</button>
        <button className="btnmodal" onClick={confirmhandler}>Approve</button>
       


    </div>
    </div>
    );
}



export default DeleteModal;