import React from 'react';
import {List, ListItem, ListItemAvatar, ListItemText} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

export const inputListItem = (
  <List>
    <ListItem component="div" button>
      <ListItemAvatar>
        <Avatar>
          <WorkIcon/>
        </Avatar>
      </ListItemAvatar>
      <Box
        textAlign="right"
        sx={{pr: 3}}
      >
        2022/1/20
      </Box>
      <Box
        textAlign="right"
        sx={{pr: 3}}
      >
        ￥10000
      </Box>
      <ListItemText
        secondary={'メモです'}
        secondaryTypographyProps={{
          fontSize: '11px',
          align: 'left',
        }}
      />
    </ListItem>
  </List>
);
