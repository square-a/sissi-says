import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '@/actions/creators';

import Modal from './modal/Modal';
import Navigation from '@/components/navigation/Navigation';
import ActionBar from './actionBar/ActionBar';
import Guide from './guide/Guide';

const mapStateToProps = (state) => {
  const route = state.location.type;
  const Component = state.location.routesMap[route].component;
  return {
    Component,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onBuild: () => dispatch(actions.buildPage()),
});

const App = ({ Component, onBuild }) => (
  <div className='app'>
    <Navigation />
    <Component />
    <ActionBar />
    <Guide />
    <Modal />
  </div>
);

App.propTypes = {
  Component: PropTypes.func,
  onBuild: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
