import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity , Text} from 'react-native';
import { useRouter } from 'expo-router';
import RideDetailsCard from '@/components/ui/ride/RideDetailsCard';
import MapViewDirections from 'react-native-maps-directions';

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyAeL0NOt9Z0u3wdU451MynINYppACDdcJY';


export default function trackRide() {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}  >
        <Text style={styles.backText}> {"<"} Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>
         Your ride is on the way!
      </Text>
      </View>
    
      <View style={styles.mapWrapper}>
          <MapView style={styles.map}>
          <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
  />

          </MapView>
      </View>
      <RideDetailsCard
  duration="1hr 22min"
  eta="E.T.A"
  carModel="KIA Rio"
  referenceNumber="197 تونس 2352"
  driverName="John Doe"
  rating={4.8}
  trips={50}
  onCall={() => console.log('Calling...')}
  onMessage={() => console.log('Messaging...')}
  onCancel={() => console.log('Cancelling ride...')}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection:"column",
    alignItems:"center",
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 30 , 
    fontFamily:"Poppins",
    width:"100%",
    
    
  },
  map: {
    width: '100%',
    height: '100%',

  },
  backText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
    fontFamily:"Poppins",

  },
  header :{
    display:"flex",
    justifyContent:"center",
    flexDirection:"column",
    alignItems:"center",
    marginBottom: 20, 
    width:"100%" 

  },
  headerText:{
    fontFamily:"Poppins",
    color:'red',
    fontSize:20


  },
  backButton:{
    width:"20%",
    alignSelf:"flex-start"
  },

  mapWrapper:{
    width:"100%",
    height:"50%",
    borderRadius:10,
    overflow:"hidden",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }
});
