import React, { useState } from 'react'
import "./css/sidebar.css"
import './firebase.js'
import firebase from "firebase"
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Modal from '@mui/material/Modal';
import { db, storage } from './firebase.js';
var fileglobal=0
export default function Sidebar({sideoptions}) {
    const[open,setOpen] =  useState(false);
    const[value,setValue] = useState(1);
    const[uploading,setUploading] = useState(false);
    // const[value,setValue] = useState(1)
    const[file,setFile]=useState(null);
    fileglobal=file
    const handleClose =()=>{
        setOpen(false);
    }
    const handleOpen=()=>{
        setOpen(true);
    }
    const handleChange=(e)=>{
            if(e.target.files[0]){
                setFile(e.target.files[0]);
            }
    }
  const handleUpload=(event)=> {
        event.preventDefault();
        setUploading(true);
        storage.ref(`files/${file.name}`).put(file).then(snapshot=>{
            storage.ref("files").child(file.name).getDownloadURL().then(url=>{
                db.collection("myfiles").add({
                    timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    filename:file.name,
                    fileURL:url,
                    size:snapshot._delegate.bytesTransferred,
                    starred: false
                })
                
           setUploading(false);
           setFile(null);
        setOpen(false);
            })
        })
      
    }
  return (
      <>
      <Modal open ={open} onClose={handleClose}>
        <div className='modal_pop'>
            <form>
                <div className='modalHeading'>
                    <h3>Select file you want to upload</h3>
                </div>
                <div className='modalBody'>
                    {
                        uploading?(<p className='uploading'>Uploading</p>):(
    <>
                    <input type="file" onChange={handleChange}></input>
                    <input type="submit" className='post_submit' onClick={handleUpload}></input>
                        </>
                        )
                        }
                </div>
    
            </form>

        </div>
      </Modal>
    <div className="sidebar">
        <div className ="sidebar__button">
            <button onClick={handleOpen}>
                <img src="data:image/svg+xml;charset=UTF-8,%3Csvg 
xmlns=%22http://www.w3.org/2000/svg%22 
width=%2236%22 
height=%2236%22 
viewBox=%220 0 36 36%22%3E%3Cpath 
fill=%22%2334A853%22 
d=%22M16 16v14h4V20z%22/%3E%3Cpath 
fill=%22%234285F4%22 
d=%22M30 16H20l-4 4h14z%22/%3E%3Cpath 
fill=%22%23FBBC05%22 
d=%22M6 16v4h10l4-4z%22/%3E%3Cpath 
fill=%22%23EA4335%22 
d=%22M20 16V6h-4v14z%22/%3E%3Cpath 
fill=%22none%22 
d=%22M0 0h36v36H0z%22/%3E%3C/svg%3E"></img>

            </button>
            <span>New</span>
        </div>
  
      <div className='sidebar__options'>
          <div onClick={()=>{sideoptions(1);setValue(1)}} className={value==1?'sidebar__option sidebar__option-Active':'sidebar__option'}>
              <MobileScreenShareIcon></MobileScreenShareIcon>
              <span >My Drive</span>
          </div>
          
          <div  onClick={()=>{sideoptions(2);setValue(2)}} className={value==2?'sidebar__option sidebar__option-Active':'sidebar__option'}>
              <QueryBuilderIcon ></QueryBuilderIcon>
              <span>Recent</span>
          </div>
          <div className={value==3?'sidebar__option sidebar__option-Active':'sidebar__option'}  onClick={()=>{sideoptions(3);setValue(3)}}>
              <StarBorderPurple500Icon></StarBorderPurple500Icon>
              <span>Starred</span>
          </div>
          <div className={value==4?'sidebar__option sidebar__option-Active':'sidebar__option'}  onClick={()=>{sideoptions(4);setValue(4)}}>
              <DeleteOutlineIcon></DeleteOutlineIcon>
              <span>Trash</span>
          </div>
      </div>
     
</div>
   
</>
  )
  
}
export {fileglobal}
