import React, { Component } from 'react';

import SideNav from './side_nav';
import FooterPlayer from './footer';
import SearchBar from '../containers/search_bar';
import SongList from '../containers/songs_list';

class App extends Component {
  render() {
    return (
      <div>
        <SideNav />
        <div className="feature-container">
          <SearchBar />
          <SongList />
        </div>
        <FooterPlayer autoplay />
      </div>
    );
  }
}

export default App;
