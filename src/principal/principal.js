import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Header, Content,
    Card, CardItem, Text, Body,Button,
   Icon,Input,Label,Item} from "native-base";
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
      };
    }
  
    //funcion de registro
  
  registro = () => {
    this.props.navigation.navigate('Registro', 
    {titulo: 'Registro', 
      })
  }
  
  
    async componentDidMount() {
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
        <Container>
     

        <Content padder contentContainerStyle={styles.content}>
          <Card>
            <CardItem header bordered>
              <Text style={styles.textCenter}>texto</Text>
            
            </CardItem>
            <CardItem bordered>
              <Body style={styles.body}>
                     <Button small primary>
                         <Text>Default Small</Text>
                    </Button>
                    
                    <Button success>
                        <Text>Success Default</Text>
                    </Button>
                    
                    <Button large dark>
                        <Text>Dark Large</Text>
                    </Button>
              </Body>
            </CardItem>
           
          </Card>
        </Content>
      </Container>





        
       
        
      );
      }
    }
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff', 
          alignItems: 'center',
          justifyContent: 'center',
        },
        textCenter: {
          width:'100%',
          textAlign: 'center'
        },
        content:{
          flex:1,
          justifyContent:'center'
          
        },
        buttonEntrar:{
          marginLeft:'30%',
           //marginRight:'10%',
           
           
          
        },
        body: {
          paddingVertical:30,
        }
      });



      export default App

      /**
         <Container>
        <Header />
        <Content>
          //Small size button
          <Button small primary>
            <Text>Default Small</Text>
          </Button>
          //Regular size button
          <Button success>
            <Text>Success Default</Text>
          </Button>
          //Large size button
          <Button large dark>
            <Text>Dark Large</Text>
          </Button>
        </Content>
      </Container>
       
       */