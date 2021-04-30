import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import Dashboard from './dashboard/Dashboard';
import UpcomingGames from './dashboard/UpcomingGames';
import AllGames from './dashboard/AllGames';
import Totals from './dashboard/Totals';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Dashboard}/>
      <Route path='/UpcomingGames' component={UpcomingGames}/>
      <Route path='/AllGames' component={AllGames}/>
      <Route path='/Totals' component={Totals}/>
    </Switch>
    </BrowserRouter>
  );
}
