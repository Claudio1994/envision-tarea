import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, List, ListItem, CardContent }from 'framework7-react';

class Pelicula extends Component{

    constructor(props){
        super();
    }

    render(){
        let { title, director, year, rating, metascore, index } = this.props;
        let titulo = `${index+1} .- ${title}`; 
        return(
            <Card>
            <CardContent>
                <List mediaList >
                    <ListItem title={titulo}></ListItem>
                    <ListItem text={director}></ListItem>
                    <ListItem text={year}></ListItem>
                    <ListItem text={rating}></ListItem>
                    <ListItem text={metascore}></ListItem>
                </List>
            </CardContent>
                
            </Card>
        );
    }
}

Pelicula.propTypes = {
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    metascore: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
}

export default Pelicula;

