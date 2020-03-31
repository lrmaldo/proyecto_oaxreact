import React from 'react';
import MapView from 'react-native-maps';
import { Container, Header, Left, Body, Right, Title, Subtitle } from 'native-base';
import { StyleSheet, Text, View,
   AppRegistry,
   ScrollView,
   Animated,
   Dimensions, Badge } from 'react-native';


const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 20;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
      region: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.04864195044303443,
        longitudeDelta: 0.040142817690068,
      },
    };
    
  }

  fetchMarkerData() {
    fetch('http://mapa.sattlink.com/api')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          markers: responseJson, 
        });
        console.log(responseJson);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentWillMount() {
    this.index = 0;
    this.animation = new Animated.Value(0);
  }
  async  componentDidMount() {

    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.fetchMarkerData();

     this.animation.addListener(({value})=>{
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if(index >= this.state.markers.length){
        index = this.state.markers - 1;
      }
      if (index <= 0){
        index = 0;
      }
      clearTimeout(this.regionTimeout)
       /**this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;

          const { lat } = this.state.markers[index];
          const { long } = this.state.markers[index];
          this.map.animateToRegion(
            {
              latitude:lat,
              longitude: long
              latitudeDelta: this.state.region.latitudeDelta,
              longitudeDelta: this.state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
*/
    });
}


  render() {
    
    const interpolations = this.state.markers.map((marker,index)=>{
      const inputRange =[
        (index -1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index +1) * CARD_WIDTH
      ]
      const scale = this.animation.interpolate({
        inputRange,
        outputRange:[2,5,2],
        extrapolate:"clamp"
      })
      const opacity = this.animation.interpolate({
        inputRange,
        outputRange:[.35,1,.35],
        extrapolate:"clamp",
      })
      return {scale,opacity}
    })


    return (


      
      <Container style={styles.container}>
        
        
        <MapView style={styles.mapStyle}  
        initialRegion={{
          latitude: 17.0829383,
      longitude: -96.7884567,
      latitudeDelta: 5.622,
      longitudeDelta: 5.621,
        }}>

{this.state.isLoading ? null : this.state.markers.map((marker, index) => {
     const coords = {
         latitude: marker.lat,
         longitude: marker.long,
     };

     const metadata = `Esta región`;
     
     const scaleStyle ={
       transform: [
         {
           scale:interpolations[index].scale
         }
       ]
     }
     const opacityStyle ={
       opacity:interpolations[index].opacity
     }

     return (
         <MapView.Marker
            key={index}
            coordinate={coords}
            
            title={marker.region}
            description={metadata}
            
         >
          <Animated.View style={[styles.markerWrap,opacityStyle]}>
          <Animated.View style={[styles.ring,scaleStyle]} />
          <View style={styles.marker} />
        </Animated.View>
          
         </MapView.Marker>
         
       

     );
  })}
    </MapView>
  
    <Animated.ScrollView
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: this.animation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.endPadding}
        >
           {this.state.markers.map((marker, index) => (
            <View style={styles.card} key={index}>
            
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>{marker.region}</Text>
                <Text numberOfLines={1} style={styles.cardDescription, styles.cardConfirmados}>
                  Confirmados:   {marker.confirmados}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription,styles.cardsospechoso}>
                  Sospechosos: {marker.sospechosos}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription, styles.cardNegativos}>
                  Negativos: {marker.negativos}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription, styles.cardRecuperados}>
                  Negativos: {marker.recuperados}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                  Muertos: {marker.muertos}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
         
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
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
   scrollView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  }, endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  textContent: {
    flex: 1,
  },
  cardtitle: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: "bold" ,
  },
  cardDescription: {
    fontSize: 14,
    color: "#444",
  },

  cardConfirmados: {
    color:"red"
  },
  cardsospechoso: {
    color:"#DBA901"
  },
  cardNegativos: {
    color:"#088A08"
  },
  cardRecuperados: {
    color:"#0404B4"
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 140,
    backgroundColor: "rgba(232,21,21, 0.9)",
  },
  ring: {
    width: 4,
    height: 4,
    borderRadius:32,
    backgroundColor: "rgba(232,21,21, 0.3)",
    position: "absolute",
    borderWidth: 4,
    borderColor: "rgba(232,21,21, 0.5)",
  }, 



});

/**
 *  Keystore password: 25a78909d91d43689e1b931f29b89220
  Key alias:         QGxybWFsZG8vTWFwc0Nvcm8=
  Key password:      7b1d9fc0c21d4b49b6cd1b4a3c5b5a37
 */