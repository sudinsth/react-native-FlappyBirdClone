import React from 'react';
import {View, StyleSheet, Text, Keyboard} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const googleApiKey = 'AIzaSyB6Sk1zvQ12OZJLaFmk4JTlaRSYD9F7UfY';

const Mapview = () => {
  const [mapCoordinate, setMapCoordinate] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: mapCoordinate.latitude,
          longitude: mapCoordinate.longitude,
          latitudeDelta: 0.025,
          longitudeDelta: 0.0121,
        }}
        onPress={e => {
          // console.log(e.nativeEvent.coordinate);
          setMapCoordinate(e.nativeEvent.coordinate);
          Keyboard.dismiss();
        }}>
        <Marker
          draggable
          coordinate={mapCoordinate}
          onDragEnd={e => setMapCoordinate(e.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export {Mapview};
