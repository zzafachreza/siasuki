import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { urlAPI, urlFull } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';

export default function Show2({ navigation, route }) {
    const [barang, setBarang] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.post(urlAPI + '/get_barang2.php', {
            key: route.params.key
        }).then(res => {
            console.warn(res.data);
            setBarang(res.data);
            setLoading(false)
        })
    }, [])


    const MyList = ({ label, value }) => {
        return (
            <View style={{
                marginVertical: 5,
                marginHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: colors.border
            }}>
                <Text style={{
                    color: colors.black,
                    fontFamily: fonts.primary[600],
                    fontSize: windowWidth / 25,
                }}>{label}</Text>
                <Text style={{
                    color: colors.black,
                    fontFamily: fonts.primary[400],
                    fontSize: windowWidth / 25,
                }}>{value}</Text>
            </View>
        )
    }

    const MyText = ({ label, value }) => {
        return (

            <Text style={{
                marginHorizontal: 2,
                backgroundColor: colors.primary,
                borderRadius: 3,
                width: 15,
                textAlign: 'center',
                color: colors.white,
                fontFamily: fonts.primary[600],
                fontSize: windowWidth / 25,
            }}>{value}</Text>

        )
    }

    return (
        <>
            {!loading &&
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    flex: 1,
                    backgroundColor: colors.white
                }}>

                    {barang.foto_komponen !== '' && <Image source={{
                        uri: urlFull + barang.foto_komponen
                    }} style={{
                        alignSelf: 'center',
                        resizeMode: 'contain',
                        width: windowWidth,
                        height: 250,
                        borderRadius: 10,

                    }} />}


                    {barang.foto_komponen === '' && <Image source={require('../../assets/noimage.png')} style={{
                        alignSelf: 'center',
                        resizeMode: 'contain',
                        width: windowWidth,
                        height: 250,
                    }} />}

                    <MyList label='Nama' value={barang.nama} />
                    <MyList label='Spek' value={barang.spek} />
                    <MyList label='Harga' value={new Intl.NumberFormat().format(barang.harga)} />

                </ScrollView>}
            {loading && <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}><ActivityIndicator size="large" color={colors.primary} /></View>}
        </>

    )
}

const styles = StyleSheet.create({})