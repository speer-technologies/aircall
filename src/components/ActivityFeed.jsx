import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const Demo = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export default function InteractiveList() {
  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  const [callList, setCallList] = useState([]);
  const [archivedCallList, setArchivedCallList] = React.useState(0);

  useEffect(() => {
    axios({
      method: 'get',
      url: ` https://aircall-job.herokuapp.com/activities`
    })
      .then((response) => {
        setCallList(response.data);
        console.log('some', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
      <Grid item xs={12} md={6}>
        <Demo>
          <List>
            {callList.map((calls) => (
              <ListItem
                key={calls.id}
                secondaryAction={
                  <IconButton aria-label="Example">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar>
                  <i class="fa-solid fa-phone"></i>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={calls.from}
                  secondary={calls.created_at}
                />
              </ListItem>
            ))}
          </List>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
              <BottomNavigationAction label="Archived" icon={<FolderIcon />} />
            </BottomNavigation>
        </Demo>
      </Grid>
    </Box>
  );
}