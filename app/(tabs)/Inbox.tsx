import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from 'react-native';

export default function Inbox() {
    // Example data for the inbox
    const messages = [
        {
            id: '1',
            name: 'Zied Kallel',
            route: 'Tunis > Sfax',
            time: '11 minutes ago',
            image: require('@/assets/images/profile.png'), // Replace with the actual image
        },
        {
            id: '2',
            name: 'Ala Abdessayed',
            route: 'Tunis > Sfax',
            time: '32 minutes ago',
            image: require('@/assets/images/profile.png'), // Replace with the actual image
        },
    ];

    const renderMessage = ({ item }) => (
        <View style={styles.messageContainer}>
            {/* Profile Image */}
            <Image source={item.image} style={styles.profileImage} />

            {/* Message Details */}
            <View style={styles.messageDetails}>
                <Text style={styles.messageName}>{item.name}</Text>
                <Text style={styles.messageRoute}>{item.route}</Text>
                <Text style={styles.messageTime}>{item.time}</Text>
            </View>

            {/* Right Arrow */}
            <TouchableOpacity>
                <Image
                    source={require('@/assets/images/fleche.png')} // Replace with your right arrow image
                    style={styles.rightArrow}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image
                        source={require('@/assets/images/backbtn.png')} // Replace with your back button image
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Inbox</Text>
            </View>

            {/* Inbox List */}
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.inboxList}
            />

            {/* Footer Navigation */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton}>
                    <Image
                        source={require('@/assets/images/lista.png')} // Replace with your icon
                        style={styles.footerIcon}
                    />
                    <Text style={styles.footerText}>Your rides</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Image
                        source={require('@/assets/images/search.png')} // Replace with your icon
                        style={styles.footerIcon}
                    />
                    <Text style={styles.footerText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Image
                        source={require('@/assets/images/minus.png')} // Replace with your icon
                        style={styles.footerIcon}
                    />
                    <Text style={styles.footerText}>Publish</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Image
                        source={require('@/assets/images/inbox2.png')} // Replace with your icon
                        style={[styles.footerIcon, styles.activeIcon]} // Highlight for active page
                    />
                    <Text style={[styles.footerText, styles.activeText]}>Inbox</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Image
                        source={require('@/assets/images/profile.png')} // Replace with your icon
                        style={styles.footerIcon}
                    />
                    <Text style={styles.footerText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    backButton: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    inboxList: {
        paddingHorizontal: 20,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    profileImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 15,
    },
    messageDetails: {
        flex: 1,
    },
    messageName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
    },
    messageRoute: {
        fontSize: 14,
        color: '#666666',
    },
    messageTime: {
        fontSize: 12,
        color: '#999999',
    },
    rightArrow: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        tintColor: '#B0B0B0',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        backgroundColor: '#FFFFFF',
    },
    footerButton: {
        alignItems: 'center',
    },
    footerIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginBottom: 5,
    },
    footerText: {
        fontSize: 12,
        color: '#999999',
    },
    activeIcon: {
        tintColor: '#EC4D37',
    },
    activeText: {
        color: '#EC4D37',
    },
});
