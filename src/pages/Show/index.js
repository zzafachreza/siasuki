import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { urlAPI, urlFull } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';

export default function Show({ navigation, route }) {
    console.log(route.params)
    const [barang, setBarang] = useState({
        gambar: '',

    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.post(urlAPI + 'get_aset', {
            key: route.params.kode_qr
        }).then(res => {
            console.warn(res.data);
            setBarang(res.data[0]);
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

                    <Image source={{
                        uri: urlFull + barang.gambar
                    }} style={{
                        width: windowWidth,
                        height: windowWidth
                    }} />
                    <MyList label='Kode QR' value={barang.kode_qr} />
                    <MyList label='Nama barang' value={barang.nama_aset} />

                    <MyList label='Kategori' value={barang.nama_kategori} />

                    <MyList label='Lokasi' value={barang.nama_lokasi} />

                    <MyList label='Umur' value={barang.umur} />


                    <MyList label='Harga perolehan' value={new Intl.NumberFormat().format(barang.harga)} />
                    <MyList label='Nilai Residu' value={new Intl.NumberFormat().format(barang.harga_residu)} />
                    <MyList label='Penyusutan' value={new Intl.NumberFormat().format((barang.harga - barang.harga_residu) / barang.umur)} />


                    <MyList label='Status' value={barang.status} />

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