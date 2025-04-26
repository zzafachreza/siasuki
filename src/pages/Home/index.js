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


    getDataProduk();
    getDataKategori();

    if (isFocused) {
      __getDataUserInfo();
    }
  }, [isFocused]);


  const getDataProduk = () => {
    axios.post(urlAPI + 'aset').then(res => {
      console.log('barang', res.data);

      setProduk(res.data);
    })
  }

  const getDataKategori = () => {
    axios.post(urlAPI + 'kategori').then(res => {
      console.log('kategori', res.data);

      setKategori(res.data);
    })
  }



  const __getDataUserInfo = () => {
    getData('user').then(users => {
      console.log(users);
      setUser(users);
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



        <Text style={{
          fontFamily: fonts.secondary[400],
          fontSize: windowWidth / 28,
          color: colors.black,
        }}>Selamat datang, {user.nama_lengkap} </Text>
        <Text style={{
          fontFamily: fonts.secondary[600],
          fontSize: windowWidth / 20,
          color: colors.black,
        }}>My Asset</Text>

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




          <TouchableOpacity onPress={() => navigation.navigate('Komponen', {
            key: 0,
            id_user: user.id
          })} style={{
            marginVertical: 5,
            padding: 10,
            elevation: 1,
            flexDirection: 'row',
            backgroundColor: colors.secondary
          }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/a1.png')} style={{
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
                color: colors.white,
              }}>KATEGORI</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Barang', {
            key: 0,
            id_user: user.id
          })} style={{
            marginVertical: 5,
            elevation: 1,
            padding: 10,
            flexDirection: 'row',
            backgroundColor: colors.primary
          }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/a2.png')} style={{
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
                color: colors.white,
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
          APLIKASI INVENTARISASI ASET
        </Text>
      </ScrollView>

    </SafeAreaView>
  );
}
