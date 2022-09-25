import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { storeData, getData, urlAPI } from '../../utils/localStorage';
import { Icon } from 'react-native-elements';
import MyCarouser from '../../components/MyCarouser';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import 'intl';
import 'intl/locale-data/jsonp/en';
import LottieView from 'lottie-react-native';
import { useIsFocused } from '@react-navigation/native';
import { MyGap } from '../../components';

export default function Home({ navigation }) {
  const [user, setUser] = useState({});
  const [kategori, setKategori] = useState([]);

  const [produk, setProduk] = useState([]);
  const [cart, setCart] = useState(0);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {

    const unsubscribe = messaging().onMessage(async remoteMessage => {

      const json = JSON.stringify(remoteMessage);
      const obj = JSON.parse(json);

      // console.log(obj);

      // alert(obj.notification.title)



      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'siasuki', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        title: obj.notification.title, // (optional)
        message: obj.notification.body, // (required)
      });
    });

    getDataProduk();
    getDataKategori();

    if (isFocused) {
      __getDataUserInfo();
    }
    return unsubscribe;
  }, [isFocused]);


  const getDataProduk = () => {
    axios.post(urlAPI + '/1data_barang.php').then(res => {
      console.log('barang', res.data);

      setProduk(res.data);
    })
  }

  const getDataKategori = () => {
    axios.post(urlAPI + '/1data_kategori.php').then(res => {
      console.log('kategori', res.data);

      setKategori(res.data);
    })
  }



  const __getDataUserInfo = () => {
    getData('user').then(users => {
      console.log(users);
      setUser(users);
      axios.post(urlAPI + '/1_cart.php', {
        fid_user: users.id
      }).then(res => {
        console.log('cart', res.data);

        setCart(parseFloat(res.data))
      })
      getData('token').then(res => {
        console.log('data token,', res);
        setToken(res.token);
        axios
          .post(urlAPI + '/update_token.php', {
            id: users.id,
            token: res.token,
          })
          .then(res => {
            console.error('update token', res.data);
          });
      });
    });
  }

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const ratio = 192 / 108;


  const __renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Show', {
          key: item.kode_barang
        });
      }}
      style={{
        backgroundColor: colors.background1,
        flex: 0.5,
        margin: 5,

      }}>
      <Image source={{
        uri: item.image
      }} style={{
        alignSelf: 'center',
        // resizeMode: 'contain',
        width: '100%',
        height: 200,

      }} />







      <Text
        style={{
          paddingLeft: 5,
          fontSize: windowWidth / 25,
          color: colors.primary,
          fontFamily: fonts.secondary[600],
        }}>
        Rp. {new Intl.NumberFormat().format(item.harga_barang)}
      </Text>
      {/* <Text
        style={{
          padding: 5,
          backgroundColor: colors.primary,
          fontSize: windowWidth / 35,
          color: colors.white, borderRadius: 2,
          fontFamily: fonts.secondary[400],
        }}>
        {item.nama_kategori}
      </Text> */}
      <Text
        style={{
          padding: 5,
          height: 50,
          fontSize: windowWidth / 30,
          color: colors.textPrimary, borderRadius: 2,
          fontFamily: fonts.secondary[400],
        }}>
        {item.nama_barang}
      </Text>






    </TouchableOpacity>
  );

  const __renderItemKategori = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Barang', {
        key: item.id,
        id_user: user.id
      })} style={{
        backgroundColor: colors.background1,
        margin: 3,
        flex: 0.5,

      }}>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <Image style={{
            width: '100%',
            height: 150,
            resizeMode: 'contain'

          }} source={{
            uri: item.image
          }} />
        </View>
        <Text style={{
          textAlign: 'center',
          color: colors.textPrimary,
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 30,
        }}>{item.nama_kategori}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>

      <View
        style={{
          height: windowHeight / 10,
          padding: 10,
          backgroundColor: colors.background1,
        }}>


        <View style={{
          flexDirection: 'row'
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Barang', {
            key: 0,
            id_user: user.id
          })} style={{
            flex: 1,
            height: 40,
            flexDirection: 'row',
            backgroundColor: colors.background6,
            borderRadius: 5,

          }}>

            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
              <Icon type='ionicon' name="search-outline" color={colors.black} size={windowWidth / 30} />
            </View>
            <View style={{
              paddingLeft: 5,
              flex: 1,
              justifyContent: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[400],
                color: colors.black,
                fontSize: windowWidth / 30
              }}>Pencarian barang</Text>
            </View>

          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => navigation.navigate('Scan')} style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Icon type='ionicon' name='qr-code-outline' color={colors.primary} />
          </TouchableOpacity> */}

        </View>


      </View>

      <ScrollView style={{
        backgroundColor: colors.background1
      }}>
        <MyGap jarak={10} />
        <MyCarouser />

        <View style={{
          flex: 1,
          padding: 10,
        }}>




          <TouchableOpacity onPress={() => navigation.navigate('MenuKelas', {
            transmisi: 'MANUAL'
          })} style={{
            marginVertical: 5,
            elevation: 1,
            flexDirection: 'row',
            backgroundColor: colors.secondary
          }}>
            <View onPress={() => navigation.navigate('MenuKelas', {
              transmisi: 'MANUAL'
            })} style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/logo.png')} style={{
                height: windowHeight / 5,
                width: windowHeight / 5,
              }} />
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.primary,
              }}>KOMPONEN</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('MenuKelas', {
            transmisi: 'MATIC'
          })} style={{
            marginVertical: 5,
            elevation: 1,
            flexDirection: 'row',
            backgroundColor: colors.primary
          }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/logo.png')} style={{
                height: windowHeight / 5,
                width: windowHeight / 5,
              }} />
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 20,
                color: colors.secondary,
              }}>INVENTARISASI ASET</Text>
            </View>
          </TouchableOpacity>

        </View>
        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            fontSize: windowWidth / 30,
            color: colors.primary,
            fontFamily: fonts.secondary[600],
          }}>
          YAYASAN UNIVERSITAS KRISTEN INDONESIA
        </Text>
      </ScrollView>

    </SafeAreaView>
  );
}
