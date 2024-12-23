import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, View, Text } from 'react-native';
import RideDetails from '@/components/ui/RideDetails'; // Correct path with forward slashes
import { Button } from 'react-native';
import { collection, getDocs, getFirestore, query, where , onSnapshot} from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';


const PublishedRides = () => {
    const router = useRouter();

    const handleEditRide = (ride: { [x: string]: any; id: any; origin?: any; destination?: any; date_time?: any; description?: any; seats_available?: any; }) => {
        console.log('Editing ride:', ride);
        router.push({
            pathname: '/(pages)/PublishAride',
            params: {
            isEditing: 'true',
            rideId: ride.id,
            origin: ride.origin,
            destination: ride.destination,
            dateTime: ride.date_time,
            description: ride.description || "",
            seats: ride.seats_available
            }
        });
    };

    const [rides, setRides] = useState<{ id: string; [key: string]: any }[]>([]);
    const [mode, setMode] = useState('Driver');
    const db = getFirestore();
    let unsubscribe = null; // Listener cleanup

    const fetchRides = async () => {
        const user = auth.currentUser;
        if (!user) return;

        // Clear any existing snapshot listeners
        if (unsubscribe) {
            unsubscribe();
            unsubscribe = null;
        }

        try {
            if (mode === 'Driver') {
                // Query rides where the current user is the driver
                const ridesQuery = query(
                    collection(db, 'rides'),
                    where('driver_id', '==', user.uid)
                );

                // Real-time updates with onSnapshot
                unsubscribe = onSnapshot(ridesQuery, (querySnapshot) => {
                    const fetchedRides = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setRides(fetchedRides);
                });
            } else {
                // Clear rides and stop listening in passenger mode
                setRides([]);
            }
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    // Effect to handle data fetching and cleanup
    useEffect(() => {
        fetchRides();

        // Cleanup listener on unmount
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [mode]);

    // useEffect(() => {
    //     fetchRides();
    // }, [mode]);

    // useEffect(() => {
    //     fetchRides();
    // }, []);
    const colors = [
        'rgba(250, 100, 100, 0.3)', // Red
        'rgba(255, 217, 61, 0.25)',  // Yellow
        'rgba(107, 203, 119, 0.3)', // Green
        'rgba(61, 122, 200, 0.3)'   // Blue
    ];
    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'Driver' ? 'Passenger' : 'Driver'));
    };
    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        })}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                    />
                    

                    

                   

                    
                    <Text style={styles.findRideText}>{mode} Mode</Text>
                    <Button title={`Switch to ${mode === 'Driver' ? 'Passenger' : 'Driver'}`} onPress={toggleMode} />
                    <Text style={styles.findRideText}>My Rides</Text>
                </View>
                {rides.length > 0 ? (
                    rides.map((ride, index) => (
                        <RideDetails
                            key={ride.id}
                            name={auth.currentUser?.displayName || "User"}
                            date={ride.date}
                            time={ride.time}
                            from={ride.origin}
                            to={ride.destination}
                            description={ride.description || "No description provided"}
                            style={{
                                backgroundColor: colors[index % colors.length],
                                borderWidth: 1,
                                borderColor: '#000',
                            }}
                            personal={mode === 'Driver'}
                            seats={ride.seats_available}
                            onEdit={() => handleEditRide(ride)}
                        />
                    ))
                ) : (
                    <Text style={styles.noRidesText}>
                        No rides found in {mode} mode
                    </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingBottom: 15,
        alignItems: 'center',
    },
    logoContainer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    logo: {
        width: 600,
        height: 200,
        marginTop: 6,
        resizeMode: 'contain',
    },
    findRideText: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        marginTop: 3,
    },
    noRidesText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default PublishedRides;