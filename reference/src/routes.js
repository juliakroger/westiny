import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import MonitorPage from './containers/MonitorPage'; // eslint-disable-line import/no-named-as-default
import CoinPage from './containers/CoinPage'; // eslint-disable-line import/no-named-as-default
import UpcomingPage from './containers/UpcomingPage'; // eslint-disable-line import/no-named-as-default
import AlertPage from './containers/AlertPage'; // eslint-disable-line import/no-named-as-default
import AboutPage from './containers/AboutPage'; // eslint-disable-line import/no-named-as-default
import SocialPage from './containers/SocialPage'; // eslint-disable-line import/no-named-as-default
import CheckEmailPage from './containers/CheckEmailPage'; // eslint-disable-line import/no-named-as-default
import LoginExternalPage from './containers/LoginExternalPage'; // eslint-disable-line import/no-named-as-default
import RenewPasswordPage from './containers/RenewPasswordPage'; // eslint-disable-line import/no-named-as-default
// import AboutPage from './components/AboutPage';
// import NotFoundPage from './components/NotFoundPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={CoinPage} />
    <Route path="upcoming" component={UpcomingPage} />
    <Route path="masternodes" component={CoinPage} />
    <Route path="monitoring" component={MonitorPage} />
    <Route path="alerts" component={AlertPage} />
    <Route path="social" component={SocialPage} />
    <Route path="about" component={AboutPage} />
    <Route path="check-email/:hash" component={CheckEmailPage} />
    <Route path="login-external/:hash" component={LoginExternalPage} />
    <Route path="password-renew/:hash" component={RenewPasswordPage} />
  </Route>
);

/*
<Route path="monitor" component={MonitorPage}/>
    <Route path="about" component={AboutPage}/>
    <Route path="*" component={NotFoundPage}/>
*/
