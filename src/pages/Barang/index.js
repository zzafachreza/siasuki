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
  const [tmp, setTmp] = useState([]);
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
    axios.post(urlAPI + 'inventaris').then(res => {
      console.log(res.data)
      setLoading(false)
      setData(res.data);
      setTmp(res.data);
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Show', item)} style={{
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
            color: colors.primary,
            fontFamily: fonts.secondary[400],
          }}>
          {item.label}
        </Text>
        <Text
          style={{
            marginVertical: 2,
            fontSize: windowWidth / 30,
            color: colors.black,
            fontFamily: fonts.secondary[600],
          }}>
          {item.nama_peralatan}
        </Text>
        <Text
          style={{
            marginVertical: 2,
            fontSize: windowWidth / 30,
            color: colors.textSecondary,
            fontFamily: fonts.secondary[400],
          }}>
          {item.kode_inventaris}
        </Text>
      </View>
      <View>
        <Text style={{
          backgroundColor: item.status == 'Mutation' ? colors.warning : colors.primary,
          height: 20,
          paddingHorizontal: 10,
          paddingTop: 2,
          borderRadius: 10,
          fontSize: windowWidth / 30,
          textAlign: 'center',
          color: colors.white
        }}>{item.status}</Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: windowWidth / 25,
            color: colors.black,
            fontFamily: fonts.secondary[400],
          }}>
          Rp. {item.penyusutan}
        </Text>
      </View>
      <View style={{
        padding: 10,
      }}>

        <Icon color={colors.border} type='ionicon' name='chevron-forward-outline' />

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
        <TextInput autoFocus autoCapitalize='none'
          onChangeText={x => {


            const filtered = tmp.filter(i => i.label.toLowerCase().indexOf(x.toLowerCase()) > -1);
            console.log(filtered);
            setData(filtered);


          }}
          keyboardType='number-pad'
          placeholderTextColor={colors.textPrimary}
          placeholder='Masukan label inventaris' style={{
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
