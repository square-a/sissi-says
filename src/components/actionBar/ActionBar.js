import React from 'react';
import { NavLink } from 'redux-first-router-link';

import { ROUTE_INDEX } from '@/router/routes';

import LogoutButton from './LogoutButton';
import PublishButton from './PublishButton';

const ActionBar = () => (
  <div className='action-bar'>
    <PublishButton />
    <LogoutButton />
    <NavLink
      to={{ type: ROUTE_INDEX }}
      className='button'
      activeClassName='hidden'
      exact={true}
    >Index</NavLink>
  </div>
);

export default ActionBar;