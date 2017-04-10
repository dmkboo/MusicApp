import React, { Component } from 'react';

class SideNav extends Component {
  render(){
    const AppThumbnail = 'http://lh3.googleusercontent.com/0thSC8HIHF8DtLsC6-ZpgkGbGqepYBGj1JUGMo4s-VZ6TgHL1VwZRn_k4qiBPs5RnEfS=w300';
    return(
      <nav className="user-panel">
        <ul>
          <li><img className="img-circle" src={AppThumbnail} /></li>
          <li><strong>Santa RM</strong></li>
        </ul>
      </nav>
    );
  }
}
export default SideNav;
