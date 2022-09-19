import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { urlAPI } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { fonts, windowWidth } from '../../utils/fonts';

export default function Show({ navigation, route }) {
    const [barang, setBarang] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.post(urlAPI + '/get_barang.php', {
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

    return (
        <>
            {!loading &&
                <ScrollView showsVerticalScrollIndicator={false} style={{
                    flex: 1,
                    backgroundColor: colors.white
                }}>

                    <Image style={{
                        height: 250,
                        resizeMode: 'contain',
                        width: '100%'
                    }} source={{
                        uri: barang.image
                    }} />

                    <View style={{
                        padding: 10,
                        alignItems: 'flex-end'
                    }}>
                        <Text style={{
                            padding: 10,
                            backgroundColor: colors.secondary,
                            borderRadius: 10,
                            width: 100,
                            textAlign: 'center',
                            fontFamily: fonts.primary[400],
                            fontSize: windowWidth / 20,
                        }}>{barang.nama_kategori}</Text>
                    </View>

                    <MyList label='Kode' value={barang.kode_barang} />
                    <MyList label='Nama' value={barang.nama_barang} />
                    <MyList label='Harga' value={new Intl.NumberFormat().format(barang.harga_barang)} />
                    <MyList label='Kondisi' value={barang.kondisi} />
                    <MyList label='Kegunaan' value={barang.fungsi} />
                    <MyList label='jumlah' value={barang.jumlah} />
                    <MyList label='Asal Barang' value={barang.lokasi} />
                    <MyList label='Tanggal & Bukti Kwitansi' value={barang.tanggal_kwitansi} />
                    <Image style={{
                        height: 250,
                        resizeMode: 'contain',
                        width: '100%'
                    }} source={{
                        uri: barang.image2
                    }} />
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