import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from 'react-router-dom';

export const mainListItems = (
  <>
    <ListItem button component={Link} to="/input">
      <ListItemIcon>
        <CurrencyYenIcon/>
      </ListItemIcon>
      <ListItemText primary="収支の入力"/>
    </ListItem>
    <ListItem button component={Link} to="/month_report">
      <ListItemIcon>
        <BarChartIcon/>
      </ListItemIcon>
      <ListItemText primary="レポート"/>
    </ListItem>
    <ListItem button component={Link} to="/setting">
      <ListItemIcon>
        <SettingsIcon/>
      </ListItemIcon>
      <ListItemText primary="設定"/>
    </ListItem>
  </>
);
