import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapScreen({ route: { params } }) {
    const { uri, latitude, longitude } = params;
    return (
        <View style={{ flex: 1 }}>
            <Text>{params.uri}</Text>
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >
                    <MapView.Marker
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude
                        }}
                    >
                        <View style={{flex:1}}>
                            <Image source={{ uri }} style={{
                                width: 100,
                                height: 100,
                            }} />
                            <Image source={require('../assets/icon.png')} style={{
                                width: 55,
                                height: 55,
                                alignSelf: "center",
                            }} />
                        </View>
                    </MapView.Marker>
                </MapView>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
})
