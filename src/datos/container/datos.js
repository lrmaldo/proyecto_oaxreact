import React, {Component} from 'react';
import {StyleSheet, FlatList, Linking } from 'react-native';
import { AppLoading } from 'expo';
import { Image } from 'react-native';
import {  Container, Right, Content, Header, View, DeckSwiper, Card, CardItem,Button, Thumbnail, Text, Left, Body, Icon , Badge } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Api from '../../utils/API'



class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isReady: false,
        datos:[],
        cards:[],
        isLoading: true

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

      const Total_confirmados = this.state.datos.reduce((total_Con, index) => total_Con + index.confirmados, 0);
      const Total_recuperados = this.state.datos.reduce((total_Con, index) => total_Con + index.recuperados, 0);
      const Total_muertos = this.state.datos.reduce((total_Con, index) => total_Con + index.muertos, 0);
      const Total_sospechosos = this.state.datos.reduce((total_Con, index) => total_Con + index.sospechosos, 0);
      const Total_negativos = this.state.datos.reduce((total_Con, index) => total_Con + index.negativos, 0);
      console.log(Total_confirmados+"  "+ Total_muertos+"  "+ Total_sospechosos+" "+" "+Total_recuperados+" "+" "+Total_negativos);
      const TotalCasos = Total_confirmados+Total_muertos+Total_sospechosos+Total_recuperados+Total_negativos;
     
     
      this.setState({
        
        cards: {
          totalCasos: TotalCasos,
          totalC: Total_confirmados,
          totalR:Total_recuperados,
          totalM: Total_muertos,
          totalS:Total_sospechosos,
          totalN:Total_negativos


        },
        
        
                
              });

             

      console.log(this.state.cards);
     
     
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
       
        <Content>
          <Card>
            <CardItem>
              <Left>
               
                <Body>
                  <Text style={{fontSize:25,fontWeight: "bold", textAlign:"center"}}>Total de casos Notificados</Text>
                  <Text style={{fontSize:22,fontWeight: "bold", textAlign:"center"}} note>En el estado de Oaxaca</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem >
              
            <Left>
                
            <Badge primary>
                  <Text style={{fontSize:17, textAlign:"center"}}>Total de casos Notificados: {this.state.cards.totalCasos}</Text>
                </Badge>
              </Left>
              
             
            </CardItem>
            <CardItem >
              <Left>
               
              <Badge>
             <Text  style={{fontSize:17}}>Total de casos Confirmados: {this.state.cards.totalC} </Text>
                </Badge>
              </Left>
              
            </CardItem>
            <CardItem >
            <Left>
                
            <Badge warning>
                  <Text  style={{fontSize:17}}>Total de casos Sospechosos:  {this.state.cards.totalS}</Text>
                </Badge>
              </Left>
              
            </CardItem>
            <CardItem >
            <Left>
                
            <Badge success>
            <Text  style={{fontSize:17}}>Total de casos Negativos: {this.state.cards.totalN}</Text>
            </Badge>
              </Left>
            
            </CardItem>
            <CardItem >
            <Left>
                
            <Badge info>
                  <Text  style={{fontSize:17}}>Total de casos Recuperados:   {this.state.cards.totalR}</Text>
                </Badge>
              </Left>
              
            </CardItem>
            <CardItem >
            <Left>
                
            <Badge style={{ backgroundColor: 'black' }}>
                  <Text  style={{fontSize:17}}>Total de casos Muertos:   {this.state.cards.totalM}</Text>
                </Badge>
              </Left>
              
            </CardItem>
          </Card>
          <Card>
            <CardItem>
             
               
                <Body>
                <Left>
                  <Text style={{ textAlign:"center", fontSize:23,fontWeight: "bold" }}>¿CÓMO SE TRANSMITE?</Text>
                  </Left>
                </Body>
              
            </CardItem>
            <CardItem >
            <Text >El virus puede haberse transmitido originalmente por contacto directo entre animales y humanos.

                Los coronavirus humanos se transmiten de una persona infectada a otra:</Text>
            </CardItem>
            <CardItem  >
            <Text >-A través del aire cuando estás cerca de una persona infectada que tose o estornuda.</Text>
            </CardItem>
            <CardItem  >
            <Text >-Al tocar o estrechar la mano de una persona enferma.</Text>
            </CardItem>
            <CardItem  >
            <Text >-Al tocar un objeto o superficie contaminada y llevarse las manos sucias a la boca, la nariz o los ojos.</Text>
            </CardItem>
            <CardItem>
            
            </CardItem>
          </Card>



          <Card style={{flex: 0}}>
            <CardItem>
              
                <Body>
                <Left>
                  <Text style={{ textAlign:"center", fontSize:23,fontWeight: "bold" }}>MEDIDAS DE PREVENCIÓN</Text>
                  </Left>
                </Body>
              
            </CardItem>
            <CardItem>
              <Body>
                <Left>
                <Image style={{ height: 100, width:100,  }} source={require('../../../assets/icons-web-coronavirus-10.png')} />
                </Left>
                <Text>
                 </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Left>
                <Text> Lavarse las Manos
                 </Text>
                </Left>
               
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Left>
                <Image style={{ height: 100, width:100,  }} source={require('../../../assets/consulta.png')} />
                </Left>
                <Text>
                 </Text>
              </Body>
            </CardItem>
            <CardItem  >
              <Body >
                
                <Text style={{ textAlign:"center" }}> Consulta y comparte información de fuentes confiables
                 </Text>
              
               
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Left>
                <Image style={{ height: 100, width:100,  }} source={require('../../../assets/tose.png')} />
                </Left>
                <Text>
                 </Text>
              </Body>
            </CardItem>
            <CardItem  >
              <Body >
                
                <Text style={{ textAlign:"center" }}> Tose o estornuda en la parte interna de tu codo
                 </Text>
              
               
              </Body>
            </CardItem>

            <CardItem>
              <Body>
                <Left>
                <Image style={{ height: 100, width:100,  }} source={require('../../../assets/sintomas.png')} />
                </Left>
                <Text>
                 </Text>
              </Body>
            </CardItem>
            <CardItem >
            <Body>
                <Left>
                <Text> Si tienes síntomas, ve al médico
                 </Text>
                </Left>
               
              </Body>
            </CardItem>
            
          </Card>


          <Card style={{flex: 0}}>
            <CardItem>
              
                <Body>
                <Left>
                  <Text style={{ textAlign:"center", fontSize:23,fontWeight: "bold" }}>¿CUÁLES SON LOS SÍNTOMAS DEL CORONAVIRUS?</Text>
                  </Left>
                </Body>
              
            </CardItem>
           
            




            <CardItem>
           
              <Body>
                <Left>
                   <Image style={{  height: 150, width:150, }} source={require('../../../assets/fiebre.png')} />
                </Left>
                <Left>
                  <Text> Fiebre
                 </Text>
                </Left>
                <Left>
                  <Image style={{  height: 150, width:150,  }} source={require('../../../assets/estortudo.png')} />
                </Left>
                <Left>
                  <Text style={{ textAlign:"center" }}> Tos, estornudos
                 </Text>
              </Left>
                 <Left>
                  <Image style={{  height: 150, width:150,  }} source={require('../../../assets/malestar-general.png')} />
                </Left>
                <Left>
                <Text style={{ textAlign:"center" }}> Malestar general
                 </Text>
                 </Left>

                 <Left>
                <Image style={{  height: 150, width:150, }} source={require('../../../assets/dolor.png')} />
                </Left>
                <Left>
                <Text> Dolor de cabeza
                 </Text>
                </Left>

                <Left>
                <Image style={{ height: 150, width:150,  }} source={require('../../../assets/respirar.png')} />
                </Left>
                <Left>
                <Text> Dificultad para respirar
                (casos más graves)
                 </Text>
                 </Left>
              </Body>
            </CardItem>
           
           
          </Card>



          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
               
                <Body>
                  <Text style={{ textAlign:"center", fontSize:23, fontWeight: "bold"}}>Desarrollado por</Text>
                  <Text style={{ textAlign:"center", fontSize:22,fontWeight: "bold" }}>MiAppshop by Sattlink®</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
              <Left>
              <Text  style={{ textAlign:"center", fontSize:23,fontWeight: "bold" }} > Quienes somos </Text>
               </Left>
                <Left>
                <Text  style={{ textAlign:"center", fontSize:18 }} >
                Somos un departamento de Desarrollo de Progressive Web App nos
                 ubicamos en Wifishop en la ciudad de San Juan Bautista Tuxtepec, contamos con propuestas
                 para tu negocio en donde cuál tu podrás alcanzar a una gran mayoría de clientes.
                </Text>
                </Left>
               
              </Body>

              
            </CardItem>

            <CardItem>
              <Left>
               
                <Body>
                        <Text  style={{ textAlign:"center", fontSize:23, fontWeight: "bold" }} > Contactanos </Text>
                        <Text style={{ textAlign:"center", fontSize:18 }}>Si tienes una idea de negocio
                        o necesitas llegar a más clientes con un App Nuestro número de oficina es</Text>
                        <Text style={{color: 'blue', textAlign:"center"}}
                          onPress={() => Linking.openURL('https://wa.me/522871214707')}>
                        287 121 4707
                        </Text>
                        <Text style={{color: 'blue', textAlign:"center"}}
                          onPress={() => Linking.openURL('mailto:miappshop@sattlink.com')}>
                          miappshop@sattlink.com
                        </Text>
                </Body>
              </Left>
            </CardItem>
         
           
            <CardItem>
              <Left>
               
                <Body>
                        <Text  style={{ textAlign:"center", fontSize:23, fontWeight: "bold"}} > Donde nos ubicamos </Text>
                        <Text style={{ textAlign:"center", fontSize:18 }}>Nos encontramos en Plaza Santa Fe, Manuel Ávila Camacho #549 Col, 
                        María Luisa, 68313 San Juan Bautista Tuxtepec, Oax.</Text>
          
                </Body>
              </Left>
            </CardItem>

            
            
          </Card>


          <Card>
            <CardItem>
             
               
                <Body>
                <Left>
                  <Text style={{ textAlign:"center", fontSize:23,fontWeight: "bold" }}>¿DONDÉ SE OBTIENE LA INFORMACIÓN?</Text>
                  </Left>
                </Body>
              
            </CardItem>
            <CardItem >
            <Text > La información se recopila todos los días de la secretaria de salud del
               gobierno del estado de Oaxaca </Text>
         
               
            </CardItem>

            
            <Body>
            <Left>
                  <Text style={{ textAlign:"center", fontSize:23, fontWeight: "bold"  }}>Fuentes de información</Text>
            </Left>
            <Left>
            <Text style={{color: 'blue', textAlign:"center"}}
                          onPress={() => Linking.openURL('http://www.tvbus.tv/web/')}>
                       http://www.tvbus.tv/web/
                        </Text>
           
              </Left>

              <Left>
              <Text style={{color: 'blue', textAlign:"center"}}
                          onPress={() => Linking.openURL('https://www.oaxaca.gob.mx/salud/')}>
                        https://www.oaxaca.gob.mx/salud/
                        </Text>
           
              </Left>

              <Left>
              <Text style={{color: 'blue', textAlign:"center"}}
                          onPress={() => Linking.openURL('https://coronavirus.gob.mx/')}>
                       https://coronavirus.gob.mx/
                        </Text>
           
              </Left>
              <Left>
              <Text style={{color: 'blue', textAlign:"center"}}
                          >
                      
                        </Text>
           
              </Left>
                </Body>
           
          </Card>






          

        </Content>
      </Container>
        
      
       
      );

      }
    }
      export default App


   