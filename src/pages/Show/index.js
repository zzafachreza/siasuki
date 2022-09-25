import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { urlAPI, urlFull } from '../../utils/localStorage';
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

                    {barang.foto_barang !== '' && <Image source={{
                        uri: urlFull + barang.foto_barang
                    }} style={{
                        alignSelf: 'center',
                        resizeMode: 'contain',
                        width: windowWidth,
                        height: 250,
                        borderRadius: 10,

                    }} />}


                    {barang.foto_barang === '' && <Image source={require('../../assets/noimage.png')} style={{
                        alignSelf: 'center',
                        resizeMode: 'contain',
                        width: windowWidth,
                        height: 250,
                    }} />}

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

                    <MyList label='Kampus' value={barang.kampus} />
                    <MyList label='Gedung' value={barang.gedung} />
                    <MyList label='Lantai' value={barang.lantai} />
                    <MyList label='Fakultas' value={barang.fakultas} />
                    <MyList label='Prodi' value={barang.prodi} />
                    <MyList label='Nama ruangan' value={barang.nama_ruangan} />
                    <MyList label='Kode ruangan' value={barang.kode_ruangan} />
                    <MyList label='Tipe ruangan' value={barang.tipe_ruangan} />
                    <MyList label='Luas ruangan' value={barang.luas_ruangan} />
                    <Text style={{
                        left: 10,
                        fontFamily: fonts.primary[600],
                        fontSize: windowWidth / 25,
                    }}>Nomor Aktiva</Text>
                    <View style={{
                        paddingHorizontal: 5,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <MyText label='Ak1' value={barang.ak1} />
                        <MyText label='Ak2' value={barang.ak2} />
                        <MyText label='Ak3' value={barang.ak3} />
                        <MyText label='Ak4' value={barang.ak4} />
                        <MyText label='Ak5' value={barang.ak5} />
                        <MyText label='Ak6' value={barang.ak6} />
                        <MyText label='Ak7' value={barang.ak7} />
                        <MyText label='Ak8' value={barang.ak8} />
                        <MyText label='Ak9' value={barang.ak9} />
                        <MyText label='Ak10' value={barang.ak10} />
                        <MyText label='Ak11' value={barang.ak11} />
                        <MyText label='Ak12' value={barang.ak12} />
                        <MyText label='Ak13' value={barang.ak13} />
                        <MyText label='Ak14' value={barang.ak14} />
                        <MyText label='Ak15' value={barang.ak15} />
                        <MyText label='Ak16' value={barang.ak16} />
                        <MyText label='Ak17' value={barang.ak17} />
                        <MyText label='Ak18' value={barang.ak18} />
                        <MyText label='Ak19' value={barang.ak19} />
                        <MyText label='Ak20' value={barang.ak20} />
                    </View>
                    <MyList label='Nama barang' value={barang.nama_barang} />
                    <MyList label='Merek' value={barang.merek} />
                    <MyList label='Unit' value={barang.unit} />
                    <MyList label='Harga perolehan' value={barang.harga_perolehan} />
                    <MyList label='Total perolehan' value={barang.total_perolehan} />
                    <MyList label='Akumulasi penyusutan' value={barang.akumulasi_penyusutan} />
                    <MyList label='Nilai buku' value={barang.nilai_buku} />
                    <MyList label='Penyusutan' value={barang.penyusutan} />
                    <MyList label='Catatan' value={barang.catatan} />
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