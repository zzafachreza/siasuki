import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils/colors';
import ZavalabsScanner from 'react-native-zavalabs-scanner'
export default function BottomNavigator({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ backgroundColor: colors.white, flexDirection: 'row', alignItems: 'center' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName = 'home';
        let Newlabel = '';

        if (label === 'Home') {
          iconName = 'home-outline';
          Newlabel = 'Home';
        } else if (label === 'Account') {
          iconName = 'person-outline';
          Newlabel = 'Akun';
        } else if (label === 'Laporan') {
          iconName = 'grid-outline';
        } else if (label === 'Scan') {
          iconName = 'qr-code-outline';
          Newlabel = 'Scan';
        } else if (label === 'History') {
          iconName = 'file-tray-stacked-outline';
          Newlabel = 'History';
        } else if (label === 'Whatsapp') {
          iconName = 'call-outline';
          Newlabel = 'Contact';
        }

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={
              label === 'Scan'
                ? () => {
                  ZavalabsScanner.showBarcodeReader(result => {

                    if (result == null) {
                      console.log('barcode : tidak ada');
                    } else {
                      console.log('barcode : ', result);
                      navigation.navigate('Show', {
                        key: parseInt(result)
                      })
                    }

                  });
                }
                : onPress
            }
            onLongPress={onLongPress}
            style={label == 'Scan' ? styles.boxScan : styles.box}>
            <View
              style={{
                color: isFocused ? colors.primary : '#919095',
                paddingBottom: 0,
                fontSize: 12,
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}>
              <View
                style={{
                  width: 50,
                  bottom: 0,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name={isFocused ? iconName.replace('-outline', '') : iconName}
                  type="ionicon"
                  size={windowWidth / 20}
                  color={isFocused ? colors.primary : colors.primary}
                />

                {label !== 'Scan' && <Text
                  style={{
                    fontSize: windowWidth / 45,
                    color: isFocused ? colors.primary : colors.primary,
                  }}>
                  {Newlabel}
                </Text>}
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: iconName => ({
    // paddingTop: 5,
    // paddingBottom: 5,
    // fontSize: 12,
    // justifyContent: 'center',
    // alignItems: 'center',
    // textAlign: 'center',
  }),
  box: { flex: 1, },
  boxScan: {
    backgroundColor: colors.secondary,
    borderRadius: 30,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
  }
});
