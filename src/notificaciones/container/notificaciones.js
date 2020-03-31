import React, {Component} from 'react';
import {StyleSheet,  Vibration} from 'react-native';
import { AppLoading } from 'expo';
import { Container, Header, Content,
   Card, CardItem,View, Text, Body,Button,
  Icon,Input,Label,Item} from "native-base";
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
        expoPushToken : '',
      notification: {},
      };
    }

   
  
    registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
          );
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        let token = await Notifications.getExpoPushTokenAsync();
        console.log(token);
        this.setState({expoPushToken: token});
      } else {
        alert('Must use physical device for Push Notifications');
      }
    };
  



  
    //funcion de registro
  
  registro = () => {
    this.props.navigation.navigate('Registro', 
    {titulo: 'Registro', 
      })
  }
  
  
    async componentDidMount() {

      this.registerForPushNotificationsAsync();

      // Handle notifications that are received or selected while the app
      // is open. If the app was closed and then opened by tapping the
      // notification (rather than just tapping the app icon to open it),
      // this function will fire on the next tick after the app starts
      // with the notification data.
      this._notificationSubscription = Notifications.addListener(
        this._handleNotification
      );

      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
      this.setState({ isReady: true });
    }

    _handleNotification = notification => {
      Vibration.vibrate()
      this.setState({ notification: notification });
    };
  
    // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
    sendPushNotification = async () => {
      const message = {
        to: this.state.expoPushToken,
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { data: 'goes here' },
      };
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });
      const data = response._bodyInit;
      console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
    };
  
    render() {
      if (!this.state.isReady) {
        return <AppLoading />;
      }
  
      return (
        <Container style={{justifyContent:"center", alignItems:"center"}}>


          <Text>Origin: {this.state.notification.origin}</Text>
          <Text >Data: {JSON.stringify(this.state.notification.data)}</Text>
         
         <Button onPress={() => this.sendPushNotification()}>
            <Icon name="arrow-forward" />
            <Text>Siguiente</Text>
          </Button>
   
       
            </Container>
      );
      }
    }
      export default App