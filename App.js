import React from 'react';
import 'react-native-gesture-handler';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { StyleSheet, Text, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {FontAwesome} from '@expo/vector-icons';


//vistas
import Mapa from './src/mapa/container/mapa';
import Datos from './src/datos/container/datos';
import Noticias from './src/noticias/container/noticias';
import Notificacion from './src/notificaciones/container/notificaciones';
import DetalleNoti from './src/noticias/container/noticiasDetail';

/** 
import Login from './src/modulos/login/containers/login';
import Registro from './src/modulos/login/containers/registro'
import Home from './src/modulos/home/containers/inicio'
import Agenda from './src/modulos/agenda/containers/agenda'
import Notificacion from './src/modulos/notificacion/containers/notificacion'
import GeoMap from './src/modulos/GeoMaps/containers/geomaps'
import Perfil from './src/modulos/perfil/containers/perfil'
*/


const TabIconInicio = (props) => (
  <FontAwesome
    name={'map-marker'}
    size={30}
    color={props.focused ? 'white' : 'darkgrey'}
  />
)
const TabIcondatos = (props) => (
  <Ionicons
    name={'md-information-circle'}
    size={30}
    color={props.focused ? 'white' : 'darkgrey'}
  />
)

const TabIconNoticias = (props) => (
  <FontAwesome
    name='newspaper-o'
    size={30}
    color={props.focused ? 'white' : 'darkgrey'}
  />
)

const TabIconNotificaciones = (props) => (
  <Ionicons
    name='md-notifications'
    size={30}
    color={props.focused ? 'white' : 'darkgrey'}
  />
)




const HomeNavigator = createStackNavigator({
  Home:{
    screen: Mapa,
    navigationOptions:{
          title:"Miappshop",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:85, backgroundColor:"red", position:'absolute', top:0, left:0, right:-12.5, borderBottomRightRadius:50}}/>
        <View style={{height:80, backgroundColor:"#007bff", position:'absolute', top:0, left:0, right:-10, borderBottomRightRadius:50}}/>
      </View>,

      
        
        
    },
  },
  
  
});

const DatosNavigator = createStackNavigator({
  Datos: {
    screen: Datos,
    navigationOptions:{
          title:"Datos",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:85, backgroundColor:"red", position:'absolute', top:0, left:0, right:-12.5, borderBottomRightRadius:50}}/>
        <View style={{height:80, backgroundColor:"#007bff", position:'absolute', top:0, left:0, right:-10, borderBottomRightRadius:50}}/>
      </View>,
    },
  },
  
});

const NotificacionNavigator = createStackNavigator({
  Notificacion: {
    screen: Notificacion,
    navigationOptions:{
          title:"Notificaciones",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:75, backgroundColor:"red", position:'absolute', top:0, left:0, right:-12.5, borderBottomRightRadius:50}}/>
        <View style={{height:70, backgroundColor:"#007bff", position:'absolute', top:0, left:0, right:-10, borderBottomRightRadius:50}}/>
      </View>,
    },
  },
  
});
const NoticiasNavigator = createStackNavigator({
  Noticias: {
    screen: Noticias,
    navigationOptions:{
          title:"Noticias",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:85, backgroundColor:"red", position:'absolute', top:0, left:0, right:-12.5, borderBottomRightRadius:50}}/>
        <View style={{height:80, backgroundColor:"#007bff", position:'absolute', top:0, left:0, right:-10, borderBottomRightRadius:50}}/>
      </View>,
    },
  }, 
  DetalleNoticia: {
    screen: DetalleNoti,
    navigationOptions:{
          title:"Noticias Tvbus",
          headerTitleAlign:'center',
          headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerTintColor:"white",
        headerBackground:<View>
        <View style={{height:85, backgroundColor:"red", position:'absolute', top:0, left:0, right:-12.5, borderBottomRightRadius:50}}/>
        <View style={{height:80, backgroundColor:"#007bff", position:'absolute', top:0, left:0, right:-10, borderBottomRightRadius:50}}/>
      </View>,
    },
  },

  
});



const BottonNavegation = createBottomTabNavigator({
  
  Home:{
    screen:HomeNavigator,
    navigationOptions:{
      title:'Inicio',
      tabBarIcon: TabIconInicio,
     // tabBarIcon: ({activeTintColor}) => <FontAwesome name="home" color={"white"}></FontAwesome>
    },
    
       
  },
  Datos:{
    screen: DatosNavigator,
    navigationOptions:{
      title:'Datos',
      tabBarIcon: TabIcondatos,
     // tabBarIcon: ({activeTintColor}) => <FontAwesome name="home" color={"white"}></FontAwesome>
    },
  },
  Noticias:{
    screen:NoticiasNavigator,
    navigationOptions:{
      title:'Noticias',
      tabBarIcon: TabIconNoticias,
     // tabBarIcon: ({activeTintColor}) => <FontAwesome name="home" color={"white"}></FontAwesome>
    },
    
  },
  /**Notificacion: {
    screen:NotificacionNavigator,
    navigationOptions:{
      title:'Notificacion',
      tabBarIcon: TabIconNotificaciones,
    },
   
  },
 
*/

  
  
  
 

 
 /* screen:AgendaNavigator,
  screen:NotificacionNavigator,
  screen: GeoMapsNavigator,
  screen: PerfilNavigator,
  #007bff
*/
}
,

{tabBarOptions: {
  activeTintColor: 'white',
  //inactiveTintColor:'#6c757d',
  labelStyle: {
    fontSize: 12,
  },
  style: {
    backgroundColor: '#007bff',
  },
}
}

)

const SwitchNavigation = createSwitchNavigator({
  
  Home: BottonNavegation
},
{
  initialRouteName:'Home'
}

)
export default  createAppContainer(SwitchNavigation)
/*export default class  App extends React.Component {
  render(){
    return <Login/> 
  }
}



 options={{
          title: 'Registro',
          headerTitleAlign:'center',
          headerStyle: {
            backgroundColor: '#fffffff',
            
          },
          headerTintColor: '#0000000',
          
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
**/