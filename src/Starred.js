import React, { useState,useEffect } from 'react'

import "./firebase.js";
import ListIcon from '@mui/icons-material/List';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import "./css/data.css"
import { db } from './firebase';

export default function Starred() {
  const [files,setFiles] =  useState([]);
  useEffect(() => {
    db.collection("myfiles").onSnapshot(snapshot=>{
      setFiles(snapshot.docs.map(doc=>{return ({
        id:doc.id,
        data:doc.data()
    }); }))}
      )
  }, []);
  function formatBytes(bytes,decimals=2){
    if(bytes == 0) return '0 Bytes';
    const k =1024;
    const dm = decimals < 0?0:decimals;
    const sizes=['Bytes','KB','MB','GB','TB']
    const i = Math.floor(Math.log(bytes)/Math.log(k));
    return parseFloat((bytes/Math.pow(k,i)).toFixed(dm))+' '+sizes[i];

  }
  return (
    <div className='data'>
      <div className='data__header'>
        <div className='data__headerleft'>
            <p>Starred</p>
        </div>
        <div className='data__headerright'>
           <ListIcon></ListIcon>
           <InfoOutlinedIcon></InfoOutlinedIcon>
        </div>
      </div>
      <div className='data__content'>
          
          <div className='data__list'>
                <div className='details__row'>
                    <p><b>Name</b></p>
                    <p><b>Last Modified</b></p>
                    <p><b>File Size</b></p>
                  

                </div>
                {
                
                  files.map((file)=>{
                      if(file.data.starred){
               return <div className='details__row'>
                 <p>
                   <a href={file.data.fileURL} target="_blank">
                   <InsertDriveFileIcon></InsertDriveFileIcon>{file.data.filename}
                   </a>
                 </p>
                    <p>{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                    <p>{formatBytes(file.data.size)}</p>
                  
                  
                </div>
                  }})
                }
         
      </div>
    </div>
    </div>
  )
}
