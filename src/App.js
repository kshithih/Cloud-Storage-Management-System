import React, { useState } from 'react'
import {auth, provider} from "./firebase.js";
import Data from "./Data";
import Header from "./Header";
import Sidebar, {globalValue} from "./Sidebar";
import Starred from "./Starred.js"
import Recent from './Recent.js';
import Trash from "./Trash.js";
function App() {
  const [user,setUser]=useState(null)
  const[data,setData]=useState(1)
  const signIn=()=>{
auth.signInWithPopup(provider).then(({user})=>{
  setUser(user)
}).catch(error=>{
  alert(error.message);
})
  }
  const sideoptions = (data) => {
    setData(data)
    console.log(data)
  }
  return (
   <>
    {
      user ?(
       <>
<Header photoUrl={user.photoUrl}/>
    <div className="App">
      <Sidebar sideoptions={sideoptions}></Sidebar>
   
      {
        (() => {
          switch(data) {
            case (1):return <Data></Data>; 
            
            case 2: return <Recent></Recent>; 
            case 3:return <Starred></Starred>
            case 4: return <Trash></Trash>;
          }
        })()
      }
    </div>
    </>
      ):(
        <div className="loginWrap">
          <img src="https://ssl.gstatic.com/images/branding/product/2x/hh_drive_96dp.png"/>
          <button onClick={signIn}>Login to Cloud storage</button>
        </div>
      )
    }
    </>
    
    
  );
}

export default App;
