import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Linking,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { getData, storeData } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function Account({ navigation, route }) {
  const [user, setUser] = useState({});
  const [com, setCom] = useState({});
  const isFocused = useIsFocused();
  const [wa, setWA] = useState('');



  useEffect(() => {
    if (isFocused) {
      getData('user').then(res => {
        setUser(res);
        console.error(res);
      });

    }
  }, [isFocused]);

  const btnKeluar = () => {
    storeData('user', null);

    navigation.replace('Login');
  };

  const kirimWa = x => {
    Linking.openURL(
      'https://api.whatsapp.com/send?phone=' +
      x +
      '&text=Halo%20NIAGA%20BUSANA',
    );
  };

  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.background1,
    }}>


      {/* data detail */}
      <View style={{ padding: 10, flex: 1, }}>


        <MyGap jarak={10} />
        <View>
          <View
            style={{
              marginVertical: 3,
              padding: 10,
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.black,
              }}>
              Nama Pribadi
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                color: colors.primary,
              }}>
              {user.nama_lengkap}
            </Text>
          </View>


          <View
            style={{
              marginVertical: 3,
              padding: 10,
              backgroundColor: colors.white,
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontFamily: fonts.secondary[600],
                color: colors.black,
              }}>
              Username
            </Text>
            <Text
              style={{
                fontFamily: fonts.secondary[400],
                color: colors.primary,
              }}>
              {user.username}
            </Text>
          </View>






        </View>
      </View>

      {/* button */}
      <View style={{ padding: 10, flexDirection: 'row', marginBottom: 20, }}>

        <View style={{
          flex: 1,

        }}>
          <MyButton
            onPress={btnKeluar}
            title="Keluar"
            colorText={colors.white}
            iconColor={colors.white}
            warna={colors.primary}
            Icons="log-out-outline"
          />
        </View>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
