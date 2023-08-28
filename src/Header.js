import React from 'react'
import "./css/header.css"
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import AppsIcon from '@mui/icons-material/Apps';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from '@mui/material';
export default function Header({photoURL}) {
  return (
    <div className='header'>
    <div className='header__logo'>
        <img src="https://play-lh.googleusercontent.com/t-juVwXA8lDAk8uQ2L6d6K83jpgQoqmK1icB_l9yvhIAQ2QT_1XbRwg5IpY08906qEw"></img>
        <span>Cloud Storage</span>
    </div>
    <div className='header__search'>
        <SearchOutlinedIcon/>
        <input type="text" placeholder='Search in Cloud'></input>
        <FormatAlignCenterIcon></FormatAlignCenterIcon>
    </div>
    <div className='header__options'>
        <span>
            <SettingsIcon></SettingsIcon>
        </span>
    <span>
        <AppsIcon></AppsIcon>
    </span>

    <span>
        <Avatar src={photoURL}>

        </Avatar>
    </span>
</div>
    </div>
  )
}
