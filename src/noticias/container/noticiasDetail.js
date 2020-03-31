import React, {Component} from 'react';
import {StyleSheet,FlatList} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Header, View, DeckSwiper, Card, CardItem, 
  Thumbnail, Text, Left, Body, Icon, Button, Item, Content } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Api from '../../utils/API'

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
        datos:[],
        url: this.props.navigation.getParam ('url'),
      };
    }
  
    //funcion de registro
  
  registro = () => {
    this.props.navigation.navigate('Registro', 
    {titulo: 'Registro', 
      })
  }
  
  
    async componentDidMount() {

      let data = await Api.getData();
      this.setState({
        datos: data
      })
      console.log(data);

      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      this.setState({ isReady: true });
    }
  
    render() {
      if (!this.state.isReady) {
        return <AppLoading />;
      }
  
      return (
        <WebView source={{ uri: this.state.url }} style={{ marginTop: 10 }} />
       
      
      
      
        
      
        
       
        
      );
      }
    }
      export default App


      /**
       *  <WebView source={{ uri: 'http://www.tvbus.tv/web/' }} style={{ marginTop: 20 }} />
       */