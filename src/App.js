import React from 'react';

import Error from './Page/errors/Error';
import Post from './Page/Post';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const renderRouter = (props) => {
  return (
    <Switch>
      <Route exact path="/" component={Post} />
      <Route component={Error} />

    </Switch>
  )
}
function App() {
  return (
      <BrowserRouter>
        {renderRouter()}
      </BrowserRouter>
  );
}

export default App;
