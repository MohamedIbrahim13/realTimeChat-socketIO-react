import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import MainHome from './components/MainHome';
import Navbar from './components/Navbar';
import Join from './components/Join';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path='/join' component={MainHome} />
              <Route path='/' component={Join}/>
              
            </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
