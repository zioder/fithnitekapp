import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type RideDetailsProps = {
    name: string;
    date: string;
    time : string ; 
    from: string;
    to: string;
    description: string;
    style?: object; 
    personal : boolean;
    seats : number;
    onEdit?: () => void;
};

function RideDetails({ name, date,time, from, to, description, style , personal,seats,onEdit }: RideDetailsProps) {
    return (
        <View style={[styles.card, style]}>
            {!personal && <View style={styles.row}>
                <Image source={require('@/assets/images/avatar.png')} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>}
            <View style={styles.details}>
                <Text style={styles.detailText}>Date & time: <Text style={styles.value}>{date} {time}</Text></Text>
                <Text style={styles.detailText}>From To: <Text style={styles.value}>{from} &gt; {to}</Text></Text>
                <Text style={styles.detailText}>Description: <Text style={styles.value}>{description}</Text></Text>
                <Text style={styles.detailText}>Seats available <Text style={styles.value}>{seats}</Text></Text>
            </View>
            {personal && <TouchableOpacity 
                style={styles.editButton}
                onPress={onEdit}>
                <Text style={styles.editButtonText}>Edit Ride</Text>
            </TouchableOpacity>}

            
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFD7D7',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        width: 400,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ddd',
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: '#000',
        marginTop: 8,
    },
    details: {
        marginTop: 5,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    value: {
        color: '#333',
        fontWeight: '600',
    },
    // Add to StyleSheet:
    editButton: {
        backgroundColor: '#FF6B6B',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    editButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default RideDetails;
