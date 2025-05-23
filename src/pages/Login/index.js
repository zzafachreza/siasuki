import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert } from 'react-native';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import { fonts, windowWidth } from '../../utils/fonts';
import { colors } from '../../utils/colors';
import { storeData, urlAPI } from '../../utils/localStorage';


export default function ({ navigation }) {

  const [kirim, setKirim] = useState({
    email: null,
    password: null
  });
  const [loading, setLoading] = useState(false);



  const masuk = () => {


    if (kirim.email == null && kirim.password == null) {
      alert('telepon dan Passwoord tidak boleh kosong !');
    } else if (kirim.email == null) {
      alert('telepon tidak boleh kosong !');
    } else if (kirim.password == null) {
      alert('Passwoord tidak boleh kosong !');
    } else {

      setLoading(true);

      console.log(kirim);
      storeData('user', {
        username: 'reza',
        nama_lengkap: 'Fachreza Maulana'
      });
      navigation.replace('MainApp')

      // axios
      //   .post(urlAPI + 'login', kirim)
      //   .then(res => {
      //     setLoading(false);
      //     console.log(res.data);
      //     if (res.data.code == 404) {
      //       showMessage({
      //         type: 'danger',
      //         message: res.data.message
      //       })
      //     } else {

      //     }

      //   });



    }




  }

  useEffect(() => {

    // const backAction = () => {
    //   Alert.alert("Info Wks", "Apakah kamu yakin akan keluar aplikasi ?", [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel"
    //     },
    //     { text: "YES", onPress: () => BackHandler.exitApp() }
    //   ]);
    //   return true;
    // };

    // const backHandler = BackHandler.addEventListener(
    //   "hardwareBackPress",
    //   backAction
    // );

    // return () => backHandler.remove();
  }, [])

  return (
    <ScrollView style={{ padding: 10, flex: 1, backgroundColor: colors.white }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5, paddingTop: 10 }}>

        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>


          <Image
            source={require('../../assets/logo.png')}
            style={
              {
                width: 200,
                height: 200,
                resizeMode: 'contain'
              }
            }
          />



        </View>


      </View>
      <MyGap jarak={10} />
      <View style={{ padding: 10, marginVertical: 10, flex: 1 }}>
        <MyInput label="Username" onChangeText={val => setKirim({
          ...kirim,
          email: val
        })}
          iconname="at" placeholder="Masukan username Anda" />
        <MyGap jarak={20} />
        <MyInput
          onChangeText={val => setKirim({
            ...kirim,
            password: val
          })}
          secureTextEntry={true}
          label="Password"
          iconname="lock-closed-outline"
          placeholder="Masukan password Anda"
        />
        <MyGap jarak={40} />
        {!loading &&

          <>
            <MyButton
              onPress={masuk}
              title="Masuk"
              warna={colors.primary}
              Icons="log-in-outline"
            />
            {/* <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}><Text style={{
              fontSize: windowWidth / 28,
              marginTop: 10,
              fontFamily: fonts.primary[400],
              textAlign: 'center',
              color: colors.secondary
            }}>Belum punya akun ? <Text style={{
              fontSize: windowWidth / 28,
              marginTop: 10,
              fontFamily: fonts.primary[600],
              textAlign: 'center',
              color: colors.secondary
            }}>Daftar disini</Text></Text></TouchableOpacity> */}
          </>
        }

      </View>
      {loading && <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
