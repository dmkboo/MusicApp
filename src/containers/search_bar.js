// THIS IS A CONTAINER
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSongs } from '../actions/index';

class SearchBar extends Component{
	constructor(props){
		super(props);
		this.state={ term: ''};
		this.onInputChange = this.onInputChange.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onInputChange(event){
		this.setState({ term:event.target.value});
		console.log(this.state.term);
	}
	onFormSubmit (event){
		event.preventDefault();

		//we need to go and fetch weather data
		this.props.showSongs(this.state.term);
		this.setState({ term: '' });
	}
	render() {
		return (
      <div className="search-container">
        <form onSubmit={this.onFormSubmit}>
          <i className="icon-search"></i>
          <input
						value={this.state.term}
				 		onChange={this.onInputChange}
						type="text" id="search" placeholder="Buscar" />
					<button type="submit" className="hidden-btn">Enviar</button>
        </form>
      </div>
		);
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators( { showSongs }, dispatch )
}

export default connect(null, mapDispatchToProps)(SearchBar);
