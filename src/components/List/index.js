import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pelicula from './Pelicula';

class List extends Component{
    constructor(props){
        super();
    }
    render(){
        let {peliculas} = this.props;
        return(
            <div className="desktop-100 tablet-100 col-100 text-align-left">
                {
                    peliculas.map((pelicula, index) => {
                        let {title, director, year, rating, metascore } = pelicula;
                        return(
                            <Pelicula key={index} index={index} title={title} director={director} year={year}
                            rating={rating} metascore={metascore}></Pelicula>
                        );
                    })
                }
            </div>
        );
    }
}

List.propTypes = {
    peliculas: PropTypes.array.isRequired
}

export default List;