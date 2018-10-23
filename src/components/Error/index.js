import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Panel, View, Page, Block, Navbar, Card } from 'framework7-react';

class Error extends Component{
    constructor(props){
        super();
    }

    render(){
        let {error} = this.props;
        return(
            <Panel right opened onPanelClosed={this.props.cerrado}>
                <View>
                <Page style={{background: "ghostwhite"}}>
                    <Navbar color="red" title="Error"></Navbar>
                    <Block>
                        <Card content={error}></Card>
                        
                    </Block>
                </Page>
                </View>
            </Panel>
        );
    }
}

Error.propTypes = {
    cerrado: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired

}

export default Error;