import {
  Typography,
} from "@mui/material";
import LogoIcon from '../../siteImages/logo-partner.svg';

function Loading(){
	return(	
		   <div className="loading-screem">
				<img src={LogoIcon} className="logo-icon" />
				<Typography variant="h4" className="">Loading...</Typography>
			</div>
		);
}

export default Loading;