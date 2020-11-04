import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapScreen({ route: { params } }) {
    const { uri, latitude, longitude } = params;
    return (
        <View style={{ flex: 1 }}>
            <Text>{params.uri}</Text>
            <View style={styles.container}>
                {/* Google maps are used to enable the user to find out where is the location of the photo */}
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
                        {/* Two images are used, one to display the marker on the map, and second to display the photo that the user has choosen */}
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
