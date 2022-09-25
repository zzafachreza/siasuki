import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { storeData, getData, urlAPI, urlFull } from '../../utils/localStorage';
import axios from 'axios';
import { colors } from '../../utils/colors';
import { windowWidth, fonts } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { showMessage } from 'react-native-flash-message';
const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
export default function ({ navigation, route }) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [myKey, setMykey] = useState('');


  const key = route.params.key;

  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true);
  //   getDataBarang();
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  useEffect(() => {
    getDataBarang();
  }, []);

  const getDataBarang = (y) => {
    setLoading(true);
    axios.post(urlAPI + '/1data_barang.php', {
      key: route.params.key,
      key2: y,
      id_user: route.params.id_user
    }).then(res => {
      setMykey('');
      console.warn(res.data);
      setLoading(false);
      setData(res.data);
      if (res.data.length == 0) {
        showMessage({
          message: 'Maaf barang tidak ditemukan !',
          type: 'default'
        })
      }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Show', {
      key: item.id
    })} style={{
      flexDirection: 'row',
      marginVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors.border_list,
      paddingBottom: 10,
    }}>
      <View style={{
        flex: 1,
      }}>
        <Text
          style={{
            marginVertical: 2,
            fontSize: windowWidth / 30,
            color: colors.black,
            fontFamily: fonts.secondary[600],
          }}>
          {item.nama_barang}
        </Text>
        <Text
          style={{
            marginVertical: 2,
            fontSize: windowWidth / 30,
            color: colors.textSecondary,
            fontFamily: fonts.secondary[400],
          }}>
          {item.fakultas} / {item.prodi} / {item.kode_ruangan} - {item.nama_ruangan}
        </Text>
        <Text
          style={{
            marginVertical: 5,
            fontSize: windowWidth / 25,
            color: colors.black,
            fontFamily: fonts.secondary[600],
          }}>
          {new Intl.NumberFormat().format(item.harga_perolehan)}
        </Text>

      </View>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        {item.foto_barang !== '' && <Image source={{
          uri: urlFull + item.foto_barang
        }} style={{
          alignSelf: 'center',
          width: 80,
          height: 80,
          borderRadius: 10,

        }} />}


        {item.foto_barang === '' && <Image source={require('../../assets/noimage.png')} style={{
          alignSelf: 'center',
          width: 80,
          height: 80,
          borderRadius: 10,

        }} />}

      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView

      style={{
        flex: 1,
        padding: 10,
        backgroundColor: colors.background1,
      }}>
      <View style={{
        position: 'relative',
        padding: 5,
      }}>
        <TextInput autoFocus value={myKey} autoCapitalize='none' onSubmitEditing={(x) => {
          console.warn(x.nativeEvent.text);
          setMykey(x.nativeEvent.text);
          getDataBarang(x.nativeEvent.text);
        }}
          onChangeText={x => setMykey(x)}
          placeholderTextColor={colors.textPrimary}
          placeholder='Masukan kata kunci' style={{
            fontFamily: fonts.secondary[400],
            paddingLeft: 10,
            fontSize: windowWidth / 30,
            backgroundColor: colors.background6,
            borderRadius: 5,
          }} />
        <View style={{
          position: 'absolute',
          right: 10,
          top: 15,
        }}>
          <Icon type='ionicon' name='search-outline' color={colors.textPrimary} />
        </View>
      </View>
      {loading && <View style={{
        flex: 1,
        marginTop: '50%',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color={colors.primary} /></View>}
      {!loading && <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
