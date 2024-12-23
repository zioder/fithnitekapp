import React, { useEffect,useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, View, Text, ActivityIndicator } from 'react-native';
import RideDetails from '@/components/ui/RideDetails'; // Correct path with forward slashes
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { useLocalSearchParams } from 'expo-router';
const PublishedRides = () => {
    const params = useLocalSearchParams();
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);
    

    const colors = [
        'rgba(250, 100, 100, 0.3)', // Red
        'rgba(255, 217, 61, 0.25)',  // Yellow
        'rgba(107, 203, 119, 0.3)', // Green
        'rgba(61, 122, 200, 0.3)'   // Blue
    ];


    useEffect(() => {
        const fetchRides = async () => {
            const db = getFirestore();
            try {
                // Create query
                let q = collection(db, 'rides');
                
                // Add filters if parameters exist
                if (params.from) {
                    q = query(q, where('origin', '==', params.from));
                }
                if (params.to) {
                    q = query(q, where('destination', '==', params.to));
                }
                if (params.date) {
                    q = query(q, where('date', '==', params.date));
                }
                if (params.seats) {
                    q = query(q, where('seats_available', '>=', parseInt(params.seats)));
                }
                if (params.userId){
                    q = query(q, where('driver_id', '!=', params.userId));
                }

                const querySnapshot = await getDocs(q);
                const fetchedRides = [];
                querySnapshot.forEach((doc) => {
                    fetchedRides.push({ id: doc.id, ...doc.data() });
                });
                
                setRides(fetchedRides);
                console.log('Fetched rides:', fetchedRides);
            } catch (error) {
                console.error('Error fetching rides:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRides();
    }, [params]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FF5A5F" />
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.findRideText}>Available Rides</Text>
                    {rides.length === 0 && (
                        <Text style={styles.noRidesText}>No rides found matching your criteria</Text>
                    )}
                </View>
                {rides.map((ride, index) => (
                    <RideDetails
                        personal={false}
                        key={ride.id}
                        name={ride.driver_name || 'Unknown Driver'}
                        date={ride.date}
                        time={ride.time}
                        from={ride.origin}
                        to={ride.destination}
                        description={ride.description || 'No description provided'}
                        seats={ride.seats_available}
                        style={{
                            backgroundColor: colors[index % colors.length],
                            borderWidth: 1,
                            borderColor: '#000',
                        }}
                    />
                ))}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
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
        marginTop: 20,
        textAlign: 'center',
    }
});

export default PublishedRides;
