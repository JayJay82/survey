import React, { Component } from 'react';
import {Header} from './app/shared/header.component';
import { PostList } from './app/post/components/post-list.container';
import { Survey } from './app/survey/components/survey.container';
import { Footer } from './app/shared/footer.componet';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
            <Route path="/survey" component={Survey} />
            <Route exact path="/" component={PostList} />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
