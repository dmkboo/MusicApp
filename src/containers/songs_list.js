import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SongList extends Component {
	componentWillMount() {
    this.props.showSongs()
  }

	renderSongsList(){
    return this.props.songs.map((song) =>{
      return (
				<tr key={song.id} onClick={this.playThisSong} className="tr-song">
					<td className="song-number">{song.id}</td>
					<td className="song-name">{song.name}</td>
					<td className="song-artist">{song.artist}</td>
					<td className="song-album">{song.album}</td>
					<td className="song-duration">{song.duration}</td>
				</tr>
      )
    });
  }
	render(){
		return(
			<div className="songs-list-container">
				<div className="album-wrapper">
					<div className="thumbnail-album-cover">
						<img src="http://mp3.hhgroups.com/albumes/Santa-RM-Listo-para-lo-que-venga-46419_front.jpg" />
					</div>
					<div className="info-album-cover">
						<p className="album-year">2016</p>
						<h2>Listo para lo que venga</h2>
					</div>
				</div>
				<div className="tb-wrapper">
					<table className="tb-output">
						<thead>
							<tr>
								<th>#</th>
								<th>Nombre</th>
								<th>Artista</th>
								<th>Album</th>
								<th>Duración</th>
							</tr>
						</thead>
						<tbody>
							{ this.renderSongsList() }
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state){
  return{
    songs: state.song.list
  }
}

export default connect(mapStateToProps, actions)(SongList);
