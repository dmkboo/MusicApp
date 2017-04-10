import React, { Component } from 'react';
import classnames from 'classnames';
import shuffle from 'shuffle-array';
import { connect } from 'react-redux';
import * as actions from '../actions';

class FooterPlayer extends Component {
  state = {
    active: this.props.songs[0],
    current:0,
    progress: 0,
    songDuration:0,
    songStatus:0,
    progressVolume:100,
    random: false,
    repeat: false,
    mute: false,
    play: this.props.autoplay || false,
    songs: this.props.songs
  }

  componentDidMount = () => {
    let playerElement = this.refs.player;
    playerElement.addEventListener('timeupdate', this.updateProgress);
    playerElement.addEventListener('ended', this.end);
    playerElement.addEventListener('error', this.next);
  }

  componentWillUnmount = () => {
    let playerElement = this.refs.player;
    playerElement.removeEventListener('timeupdate', this.updateProgress);
    playerElement.removeEventListener('ended', this.end);
    playerElement.removeEventListener('error', this.next);
  }

  setProgress = (e) => {
    let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    let width = target.clientWidth;
    let rect = target.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let duration = this.refs.player.duration;
    let currentTime = (duration * offsetX) / width;
    let progress = (currentTime * 100) / duration;

    this.refs.player.currentTime = currentTime;
    this.setState({ progress: progress});
    this.play();
  }

  updateProgress = (e) => {
    let duration = this.refs.player.duration;
    let currentTime = this.refs.player.currentTime;
    let progress = (currentTime * 100) / duration;
    let songStatusMin = Math.floor(currentTime / 60);
    let songStatusSeg = currentTime - songStatusMin * 60;
    let songStatus = songStatusMin + ":" + Math.floor(songStatusSeg);
    let minutes =  Math.floor(duration / 60);
    let seconds =  duration - minutes * 60;
    let songDuration = minutes + ":" + Math.floor(seconds);
    this.setState({ progress: progress,songDuration: songDuration,songStatus: songStatus });
  }

  setVolume = (e) =>{
    let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target;
    let width = target.clientWidth;
    let rect = target.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let volume = this.refs.player.volume;
    let currentVolume = (volume * offsetX) / 100;
    let volumeMath = offsetX / 100;
    this.refs.player.volume = volumeMath
    let progressVolume = (currentVolume * 100) / volume;
    console.log('currentWidth:',offsetX);
    console.log('actual output volume', volumeMath);
    this.setState({ progressVolume: progressVolume })
  }

  play = () =>{
    this.setState({ play:true });
    this.refs.player.play();
  }

  pause = () =>{
    this.setState({ play: false });
    this.refs.player.pause();
  }

  toggle = () => {
    this.state.play ? this.pause() : this.play();
  }

  end = () =>{
    (this.state.repeat) ? this.play() : this.setState({ play: false });
  }

  next = () =>{


    var total = this.state.songs.length;
    var current = (this.state.repeat) ? this.state.current : (this.state.current < total - 1) ? this.state.current + 1 : 0;
    var active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0, songDuration: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  previous = () => {
    var total = this.state.songs.length;
    var current = (this.state.current > 0) ? this.state.current - 1 : total - 1;
    var active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  randomize = () => {
    var s = shuffle(this.state.songs.slice());

    this.setState({ songs: (!this.state.random) ? s : this.state.songs, random: !this.state.random });
  }

  repeat = () => {
    this.setState({ repeat: !this.state.repeat });
  }

  toggleMute = () => {
    let mute = this.state.mute;

    this.setState({ mute: !this.state.mute });
    this.refs.player.volume = (mute) ? 1 : 0;
  }

  render(){
    const { active, play, progress, progressVolume, songDuration, songStatus } = this.state;

    let coverClass = classnames('player-cover', {'no-height': !!!active.cover });
    let playPauseClass = classnames('player-icons', {'icon-player7': play}, {'icon-player8': !play});
    let volumeClass = classnames('player-icons', {'icon-player4': !this.state.mute}, {'icon-volume-mute': this.state.mute});
    let repeatClass = classnames('player-icons repeat', {'active': this.state.repeat});
    let randomClass = classnames('player-icons random', {'active': this.state.random });

    return(
      <footer>
        <div className="footer-flex">
          <div className="footer-flex_item now-playing-container">
            <audio src={active.url} autoPlay={this.state.play} preload="auto" ref="player" className="hide-audio"></audio>
            <div className="playing-thumbnail">
              <img src={active.cover}/>
            </div>
            <div className="song-container">
              <p className="song-name">{active.name}</p>
              <p className="song-artist">{active.artist}</p>
            </div>
          </div>
          <div className="footer-flex_item player-manager-container">
            <div className="controls-manager">
              <div className={randomClass} onClick={this.randomize} title="Random"><i className="icon-player2 player-icons"></i></div>
              <div className="control-item" onClick={this.previous} title="Canción anterior"><i className="icon-player6 player-icons"></i></div>
              <div className="control-item" onClick={this.toggle} title="Play/Pause"><i className={playPauseClass}></i></div>
              <div className="control-item" onClick={this.next} title="Canción siguiente"><i className="icon-player5 player-icons"></i></div>
              <div className={repeatClass} onClick={this.repeat} title="Repetir"><i className="icon-player3 player-icons"></i></div>
            </div>
            <div className="song-status" onClick={this.setProgress}>
              <p className="current-song-status">{songStatus}</p>
              <span className="player-progress-value" style={{width: progress + '%'}}></span>
              <p className="current-song-duration">{songDuration}</p>
            </div>
          </div>
          <div className="footer-flex_item volume-container">
            <div className="volume-manager">
                <div className="volume-item" onClick={this.toggleMute} ><i className={volumeClass}></i></div>
                <div className="volume-item volume-status" onClick={this.setVolume}>
                  <span className="player-volume-value" style={{width: progressVolume + '%'}}></span>
                </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

FooterPlayer.propTypes = {
  autoplay:  React.PropTypes.bool,
  songs:  React.PropTypes.array.isRequired
};

function mapStateToProps(state){
  return{
    songs: state.song.list
  }
}
export default connect (mapStateToProps, actions)(FooterPlayer);
