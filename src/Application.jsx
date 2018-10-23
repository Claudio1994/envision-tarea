import React, { Component } from 'react';
import { App, Statusbar, View, Page, Navbar, Card, Button, Row, Block, Col, Preloader, CardContent} from 'framework7-react';
import axios from 'axios';

import List from './components/List';
import Error from './components/Error';

const f7params = { 
  theme: 'auto', 
  name: 'Envision', 
  id: 'com.tarea.envision'
 }

class Application extends Component{
  constructor(){
    super();
    this.state = {
      peliculas: [],
      error: false,
      cargando: false
    }
    this.handleClick = this.handleClick.bind(this);
    this.panelCerrado = this.panelCerrado.bind(this);
  }


  async handleClick(){
    this.setState({
      cargando: true,
    });
    let url = 'https://prod-10.centralus.logic.azure.com:443/workflows/c36b1a9494b04194abf624469f91c940/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=U1vLE4fiwd6nPzxr_uR2srtue6O8FnE_kqoYc4iMwTI';
     await axios.get(url)
      .then(response => {
        this.setState({
          peliculas: response.data.response
        });
        
        this.ordenarSegunRating();

        let movies = this.ordenarSegunMetascore();
        let urlPost = 'https://prod-23.centralus.logic.azure.com:443/workflows/7ce2d63016c740b78559c8d3e9834ed6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=Odo-7PKdqwRvsnhBAt9LJPPocKnqSLOn2qYS6e6nWg4';
        axios.post(urlPost, {
          "RUT": "18947240-4",
          "Peliculas": movies
        })
          .then((response) => {
            console.log('Se ha recibido correctamente ', response);
          })
          .catch(err => {
            console.log('Ha habido un error: ', err);
          });
      })
      .catch(error => {
        this.setState({
          error: true,
          cargando: false
        });
      });
    
  }

  ordenarSegunRating(){
    let peliculas = this.state.peliculas;
    peliculas.sort((a,b) => {
      return b.rating - a.rating;
    });
    this.setState({
      peliculas 
    });
  }

  ordenarSegunMetascore(){
    let peliculas = this.state.peliculas;
    peliculas.sort((a, b) => {
        return b.metascore - a.metascore;
    });

    peliculas = peliculas.map(pelicula => {
      return pelicula.title;
    });

    return peliculas;
  }

  panelCerrado(){
    this.setState({
      error: false
    });
  }

  
  render(){
    let error;
    let lista;
    if(this.state.error){
      error = <Error error="No se han podido obtener las películas." cerrado={this.panelCerrado}></Error>;
    }
    if(this.state.cargando && this.state.peliculas.length === 0){
      lista = <Preloader size={42} color="blue"></Preloader>
    }else{
      lista = <List peliculas={this.state.peliculas}></List>
    }

    return(
      <App params={f7params}>

      { error }

      {/* Status bar overlay for full screen mode (Cordova or PhoneGap) */}
        <Statusbar></Statusbar>
        {/* Your main view, should have "main" prop */}
        <View main>
        {/*  Initial Page */}
          <Page style={{background: "ghostwhite"}}>
            {/* Top Navbar */}
            <Navbar title="Tarea Envision"></Navbar>

            {/* Page Content */}
            <Block>
              <Row noGap>
                <div className="desktop-10 col-0 tablet-0"></div> 
                <div className="desktop-35 tablet-40 col-100">
                  <Card outline title="Click en el botón para mostrar el listado de películas">
                    <CardContent>
                      <Button fill onClick={this.handleClick} text="Obtener películas"></Button>
                    </CardContent>
                  </Card>
                </div>
                <div className="desktop-45 tablet-60 col-100">
                  <Row>
                    <div className="desktop-100 tablet-100 col-100">
                    <h2 className="text-align-center">Películas</h2>
                        <Row>
                          <Col className="text-align-center">
                            { lista }
                          </Col>
                        </Row>
                    </div>
                  </Row>
                </div>
                <div className="desktop-10"></div>
              </Row>
            </Block>
          </Page>
        </View>
      </App>
    );
  }
}

export default Application;
