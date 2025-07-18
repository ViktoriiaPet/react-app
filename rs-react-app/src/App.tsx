import { Component } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary.js';
import React from 'react';

import SearchPage from './pages/Searching.js';

export default class App extends Component {
  render() {
    return (
    <React.StrictMode>
      <ErrorBoundary>
        <SearchPage />
      </ErrorBoundary>
    </React.StrictMode>)
  }
}
