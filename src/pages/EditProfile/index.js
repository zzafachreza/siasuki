import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { MyInput, MyGap, MyButton, MyPicker } from '../../components';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { getData, storeData, urlAPI } from '../../utils/localStorage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { showMessage } from 'react-native-flash-message';
import DatePicker from 'react-native-date-picker';
import { Icon } from 'react-native-elements';

export default function EditProfile({ navigation, route }) {
  navigation.setOptions({
    title: 'Edit Profile',
  });

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [kota, setKota] = useState([]);
  const [data, setData] = useState({

  });




  useEffect(() => {
    getData('user').then(res => {
      setData(res);
      console.error('data user', res);
    });
    console.log('test edit');
  }, []);

  const simpan = () => {
    setLoading(true);
    console.log('kirim edit', data);

    axios.post(urlAPI + 'update_profile', data).then(res => {
      storeData('user', res.data);
      setLoading(false);
      showMessage({
        type: 'success',
        message: 'Data bershasil diupdate..',
      });

      navigation.replace('MainApp');
    })

    // axios.post(urlAPI + '/profile.php', data).then(res => {



    // });
  };
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView style={styles.page} showsVerticalScrollIndicator={false}>
        {/* <Image
        source={require('../../assets/logooren.png')}
        style={styles.image}
      /> */}


        <MyGap jarak={10} />
        <MyInput
          label="Nama Lengkap"
          iconname="person-outline"
          value={data.nama_lengkap}
          onChangeText={value =>
            setData({
              ...data,
              nama_lengkap: value,
            })
          }
        />



        <MyGap jarak={10} />
        <MyInput
          label="E - mail"
          iconname="mail-outline"
          value={data.email}
          onChangeText={value =>
            setData({
              ...data,
              email: value,
            })
          }
        />

        <MyGap jarak={10} />
        <MyInput
          label="Telepon"
          iconname="call-outline"
          keyboardType="number-pad"
          value={data.telepon}
          onChangeText={value =>
            setData({
              ...data,
              telepon: value,
            })
          }
        />
        <MyGap jarak={10} />
        <MyInput
          label="Alamat"
          iconname="map-outline"
          multiline={true}
          value={data.alamat}
          onChangeText={value =>
            setData({
              ...data,
              alamat: value,
            })
          }
        />






        <MyGap jarak={10} />
        <MyInput
          label="Password"
          placeholder="Kosongkan jika tidak diubah"
          iconname="key-outline"
          secureTextEntry
          value={data.newpassword}
          onChangeText={value =>
            setData({
              ...data,
              newpassword: value,
            })
          }
        />

        <MyGap jarak={20} />
        <MyButton
          warna={colors.primary}
          title="Simpan Perubahan"
          Icons="log-in"
          onPress={simpan}
        />
      </ScrollView>


      {loading && (
        <LottieView
          source={require('../../assets/animation.json')}
          autoPlay
          loop
          style={{
            flex: 1,
            backgroundColor: colors.primary,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background1
  },
  image: {
    width: 620 / 4,
    height: 160 / 4,
  },
});
