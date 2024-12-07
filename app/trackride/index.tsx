import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity , Text} from 'react-native';
import { useRouter } from 'expo-router';
import RideDetailsCard from '@/components/ui/ride/RideDetailsCard';



export default function trackRide() {

  const router = useRouter();


  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={()=>{router.push("/")}} >
        <Text style={styles.backText}> {"<"} Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>
         Your ride is on the way!
      </Text>
      </View>
    
      <View style={styles.mapWrapper}>
          <MapView 
          style={styles.map} 
          mapType='mutedStandard'
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}
          rotateEnabled={true}
          scrollDuringRotateOrZoomEnabled={true}
          initialRegion={{
            latitude:39.09,
            longitude:-123.7,
            latitudeDelta:0.092,
            longitudeDelta:0.045 
          }}

          />
          


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
