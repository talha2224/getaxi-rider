import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import userImg from '../../assets/images/home/user.png';
import BottomNavbar from '../../components/BottomNavbar';
import { useTheme } from '../../hooks/themeContext';

const chatData = [
    { id: '1', name: 'Alice', lastMessage: 'Hey, how are you?', time: '5 mins ago' },
    { id: '2', name: 'Bob', lastMessage: 'See you tomorrow!', time: '1 hour ago' },
    { id: '3', name: 'Charlie', lastMessage: 'Thanks for the info.', time: '2 hours ago' },
    { id: '4', name: 'David', lastMessage: 'What are you up to?', time: 'Yesterday' },
    { id: '5', name: 'Eve', lastMessage: 'Sounds good!', time: 'Yesterday' },
    { id: '6', name: 'Frank', lastMessage: 'Talk to you later.', time: '2 days ago' },
    { id: '7', name: 'Grace', lastMessage: 'Did you get my email?', time: '3 days ago' },
    { id: '8', name: 'Henry', lastMessage: 'Let\'s grab coffee sometime.', time: 'Last week' },
    { id: '9', name: 'Ivy', lastMessage: 'How was your weekend?', time: 'Last week' },
    { id: '10', name: 'Jack', lastMessage: 'Just finished the report.', time: '2 weeks ago' },
];

const Chats = () => {
    const { isDarkTheme } = useTheme();

    const backgroundColor = isDarkTheme ? '#0F172A' : '#fff';
    const textColor = isDarkTheme ? '#fff' : '#000';
    const subTextColor = isDarkTheme ? '#ccc' : '#666';
    const timeColor = isDarkTheme ? '#aaa' : '#999';
    const borderColor = isDarkTheme ? '#1E293B' : '#eee';
    const iconColor = isDarkTheme ? '#fff' : 'black';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {/* Header */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, marginTop: 40 }}>
                <Text style={{ fontSize: 24, color: textColor }}>Inbox</Text>
                <AntDesign name="search1" size={24} color={iconColor} />
            </View>

            {/* Chat List */}
            <ScrollView>
                {chatData.map((chat) => (
                    <TouchableOpacity
                        onPress={() => router.push("/home/msg")}
                        key={chat.id}
                        style={[styles.chatItem, { borderBottomColor: borderColor }]}
                    >
                        <Image source={userImg} style={styles.userImage} />
                        <View style={styles.chatInfo}>
                            <Text style={[styles.name, { color: textColor }]}>{chat.name}</Text>
                            <Text style={[styles.lastMessage, { color: subTextColor }]}>{chat.lastMessage}</Text>
                        </View>
                        <Text style={[styles.time, { color: timeColor }]}>{chat.time}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Bottom Nav */}
            <BottomNavbar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chatItem: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    userImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    chatInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    lastMessage: {
        fontSize: 14,
    },
    time: {
        fontSize: 12,
    },
});

export default Chats;
