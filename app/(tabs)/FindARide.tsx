import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';

export default function SearchRide() {
    const [seats, setSeats] = useState(1); // State for seat count

    // Increment seats
    const incrementSeats = () => setSeats((prev) => prev + 1);

    // Decrement seats, ensuring it doesn't go below 0
    const decrementSeats = () => setSeats((prev) => Math.max(prev - 1, 0));

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton}>
                <Image
                    source={require('@/assets/images/backbtn.png')}
                    style={styles.backButtonImage}
                />
            </TouchableOpacity>

            {/* Title */}
            <Text style={styles.title}>Find a Ride</Text>
            <Text style={styles.sectionTitle}>Where are you going?</Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="From"
                    placeholderTextColor="#B0B0B0"
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="To"
                    placeholderTextColor="#B0B0B0"
                />
            </View>

            {/* When Section */}
            <Text style={styles.sectionTitle}>When?</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Pick a date"
                    placeholderTextColor="#B0B0B0"
                />
            </View>

            {/* Seats Needed */}
            <Text style={styles.sectionTitle}>Seats Needed</Text>
            <View style={styles.seatsContainer}>
                {/* Decrement Button */}
                <TouchableOpacity onPress={decrementSeats} style={styles.seatButton}>
                    <Image
                        source={require('@/assets/images/minus.png')} // Replace with your minus image
                        style={styles.seatIcon}
                    />
                </TouchableOpacity>

                {/* Seat Count */}
                <Text style={styles.seatCount}>{seats}</Text>

                {/* Increment Button */}
                <TouchableOpacity onPress={incrementSeats} style={styles.seatButton}>
                    <Image
                        source={require('@/assets/images/plus.png')} // Replace with your plus image
                        style={styles.seatIcon}
                    />
                </TouchableOpacity>
            </View>

            {/* Search Button */}
            <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>

        
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    backButton: {
        marginBottom: 20,
    },
    backButtonImage: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
        elevation: 1,
    },
    input: {
        height: 50,
        fontSize: 16,
        paddingHorizontal: 15,
        color: '#333333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    seatsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#F6F6F6',
        borderRadius: 8,
    },
    seatButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seatIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    seatCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        flex: 1,
    },
    searchButton: {
        marginTop: 20,
        height: 50,
        backgroundColor: '#EC4D37',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    searchButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#F6F6F6',
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        marginTop: 20,
    },
    footerButton: {
        alignItems: 'center',
    },
    footerIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    footerText: {
        fontSize: 12,
        color: '#B0B0B0',
        marginTop: 5,
    },
    activeIcon: {
        tintColor: '#EC4D37',
    },
    activeText: {
        color: '#EC4D37',
    },
});
