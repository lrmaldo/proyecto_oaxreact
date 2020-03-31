import React, {Component} from 'react';
import {StyleSheet,FlatList,Image} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import Api from '../../utils/APINoticias'

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
        datos:[],
      };
    }
  
    //funcion de registro
  
  detalle = (props) => {
    this.props.navigation.navigate('DetalleNoticia', 
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
        <FlatList  
        data ={ this.state.datos.reverse()}
        keyExtractor={(x,i)=> i.toString()}
        renderItem ={({item})=>
       
           <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
              
                <Body>
                  <Text style={{fontSize:17, fontWeight: "bold"}} >{item.titulo}</Text>
                  <Text note>{item.created_at}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
              <Thumbnail source={{uri: item.url_imagen}} style={{height: 300, width: 350, flex: 1}} />
              
                <Text>
                  {item.resumen.substring(0,100)}...
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
              <Button transparent  onPress={() => {
            this.props.navigation.navigate('DetalleNoticia', {
              url: item.url_noticia,
              
            });
          }}textStyle={{color: '#87838B'}}>
          
          <Text>Ver más</Text>
        </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
       
      
      
      }
        
        />
        
       
        
      );
      }
    }
      export default App


      /**
       *  <WebView source={{ uri: 'http://www.tvbus.tv/web/' }} style={{ marginTop: 20 }} />
       */