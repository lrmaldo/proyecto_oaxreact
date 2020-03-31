import { AppLoading } from 'expo';
import { Container, Header, View, DeckSwiper, Card, CardItem, 
  Thumbnail, Text, Left, Body, Icon, Button, Item, Content } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons, FontAwesome } from '@expo/vector-icons';




function layouscard(props){
    detalle = () => {
        this.props.navigation.navigate('DetalleNoticia', 
        {titulo: 'Registro', 
          })
      }

    <Card style={{flex: 0}}>
    <CardItem>
      <Left>
      <Thumbnail source={{ uri: props.datos.url_imagen }} />
        <Body>
          <Text>{props.datos.titulo}NativeBase</Text>
          <Text note>{props.datos.created_at}</Text>
        </Body>
      </Left>
    </CardItem>
    <CardItem>
      <Body>
      <Image source={{uri: props.datos.url_imagen }} style={{height: 200, width: null, flex: 1}}/>
        <Text>
          {item.resumen}
        </Text>
      </Body>
    </CardItem>
   
    <CardItem footer button >
    <Button transparent onPress={this.detalle} textStyle={{color: '#87838B'}}>
          
          <Text>Ver más</Text>
        </Button>
    </CardItem>
  </Card>


}

export default layouscard 