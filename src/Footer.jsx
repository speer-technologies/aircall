import AppsRounded from '@mui/icons-material/AppsRounded'
import Archive from '@mui/icons-material/Archive'
import { blue, green } from '@mui/material/colors';
import './css/common.css'


const Footer = ({ handleScreens }) => {
    return <div className='footer_outter'>

        <div onClick={() => { handleScreens('archivedCalls') }} className='footer_section'>
            <Archive fontSize='large' sx={{ color: blue[500] }} />
            <div className='footer_text'>Archived Calls</div>
        </div>

        <div onClick={() => { handleScreens('allCalls') }} className='footer_section'>
            <AppsRounded fontSize='large' sx={{ color: green[500] }} />
            <div className='footer_text'>All Calls</div>
        </div>

        <div className='footer_section'>
            {/* <Unarchive fontSize='large' sx={{color:red[500]}}/>
            <div style={{fontSize:"10px",color:"gray"}}>UnArchive All</div> */}
        </div>
    </div>
}

export default Footer;