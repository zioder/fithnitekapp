import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

type RideDetailsProps = {
    name: string;
    price: string;
    dateTime: string;
    from: string;
    to: string;
    description: string;
    style?: object; // Allow additional style props
};

function RideDetails({ name, price, dateTime, from, to, description, style }: RideDetailsProps) {
    return (
        <View style={[styles.card, style]}>
            <View style={styles.row}>
                <Image source={require('@/assets/images/avatar.png')} style={styles.avatar} />
                <View>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.price}>{price} DNT</Text>
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.detailText}>Date & time: <Text style={styles.value}>{dateTime}</Text></Text>
                <Text style={styles.detailText}>From To: <Text style={styles.value}>{from} &gt; {to}</Text></Text>
                <Text style={styles.detailText}>Description: <Text style={styles.value}>{description}</Text></Text>
            </View>
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
});

export default RideDetails;
