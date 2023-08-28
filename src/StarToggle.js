import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { db } from './firebase.js'
export default function StarToggle({toggleoptions}) {
    const[data,setData] = useState(toggleoptions[0]);
    return (
    <div> 
        {  (() =>
            {
                console.log(data, toggleoptions[1]);
            if(data) {
                return <StarIcon onClick={()=>{setData(false)
                db.collection('myfiles').doc(toggleoptions[1].id).update({starred: false})}}></StarIcon>
            } else {
                return <StarBorderIcon onClick={()=>{setData(true)
                    
                    db.collection('myfiles').doc(toggleoptions[1].id).update({starred: true})}}></StarBorderIcon>
         } })()
        }
    </div>
    )
}