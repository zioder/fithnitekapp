import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Image, View, Text } from 'react-native';
import RideDetails from '@/components/ui/RideDetails'; // Correct path with forward slashes

const PublishedRides = () => {
    const rides = [
        { name: "Aziz Mosbeh", price: "25", dateTime: "19/11 at 8:15 AM", from: "Tunis", to: "Sfax", description: "Comfy seats" },
        { name: "Aloulou Ali", price: "20", dateTime: "20/11 at 9:00 AM", from: "Tunis", to: "Sousse", description: "Good music and AC" },
        { name: "Meriem Ahmed", price: "30", dateTime: "21/11 at 6:00 PM", from: "Ariana", to: "Nabeul", description: "Fast and safe ride" },
        { name: "Sarra Saroura", price: "40", dateTime: "21/11 at 9:00 PM", from: "Ariana", to: "Nabeul", description: "No babies" },
    ];

    const colors = [
        'rgba(250, 100, 100, 0.3)', // Red
        'rgba(255, 217, 61, 0.25)',  // Yellow
        'rgba(107, 203, 119, 0.3)', // Green
        'rgba(61, 122, 200, 0.3)'   // Blue
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.findRideText}>Find a ride !</Text>
                </View>
                {rides.map((ride, index) => (
                    <RideDetails
                        key={index}
                        name={ride.name}
                        price={ride.price}
                        dateTime={ride.dateTime}
                        from={ride.from}
                        to={ride.to}
                        description={ride.description}
                        style={{
                            backgroundColor: colors[index % colors.length],
                            borderWidth: 1,
                            borderColor: '#000', // Black border
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
});

export default PublishedRides;
