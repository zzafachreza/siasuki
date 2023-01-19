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
        axios.post(urlAPI + '/get_inventaris', {
            key: route.params.label
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
                    <MyList label='Label' value={barang.label} />
                    <MyList label='Nama barang' value={barang.nama_peralatan} />
                    <MyList label='Merek' value={barang.merek} />

                    <MyList label='Unit' value={barang.nama_unit} />
                    <MyList label='Kampus' value={barang.kampus} />
                    <MyList label='Gedung' value={barang.gedung} />
                    <MyList label='Lantai' value={barang.lantai} />
                    <MyList label='Fakultas' value={barang.nama_fakultas} />
                    <MyList label='Kelompok Aktiva' value={barang.nama_kelompok} />
                    <MyList label='Nomor ruangan' value={barang.nomor_ruangan} />
                    <MyList label='Nama ruangan' value={barang.nama_ruangan} />
                    <MyList label='Tipe ruangan' value={barang.tipe} />


                    <MyList label='Jumlah' value={barang.jumlah} />
                    <MyList label='Harga perolehan' value={new Intl.NumberFormat().format(barang.harga_perolehan)} />
                    <MyList label='Nilai Residu' value={new Intl.NumberFormat().format(barang.nilai_residu)} />
                    <MyList label='Penyusutan' value={new Intl.NumberFormat().format((barang.harga_perolehan - barang.nilai_residu) / barang.umur_ekonomis)} />

                    <MyList label='Keterangan' value={barang.keterangan} />

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