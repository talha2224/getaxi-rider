import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import carImg from '../../assets/images/home/car2.png';
import userImg from '../../assets/images/home/user.png';
import { useTheme } from '../../hooks/themeContext';

const Msg = () => {
    const { isDarkTheme } = useTheme();
    const scrollViewRef = useRef(null);
    const [keyboardOpen, setKeyboardOpen] = useState(false);
    const textColor = isDarkTheme ? 'white' : 'black';
    const bubbleOutgoingBg = isDarkTheme ? '#1E3A8A' : '#DCF8C6';
    const bubbleIncomingBg = isDarkTheme ? '#334155' : '#f0f0f0';

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardOpen(true);
        });

        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardOpen(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);
    return (
        <SafeAreaView style={[{ flex: 1 }, { backgroundColor: isDarkTheme ? "#0F172A" : "#fff" }]}>
            <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'ios' ? -10 : -30} style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={[styles.container, { backgroundColor: isDarkTheme ? "#0F172A" : "#fff" }]}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <Ionicons name="chevron-back" size={24} color={textColor} />
                            <View style={styles.profile}>
                                <Image source={userImg} style={styles.profileImage} />
                                <View>
                                    <Text style={[styles.name, { color: textColor }]}>Abena Plait</Text>
                                    <Text style={[styles.onlineStatus, { color: "green" }]}>• Online</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Feather name="more-vertical" size={24} color={textColor} />
                        </TouchableOpacity>
                    </View>

                    {/* Messages */}
                    <ScrollView style={styles.messageArea} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
                        <Text style={[styles.dateSeparator, { color: isDarkTheme ? "#ccc" : "#777" }]}>Today...</Text>

                        {/* Outgoing */}
                        <View style={styles.outgoingMessage}>
                            <View style={[styles.outgoingBubble, { backgroundColor: bubbleOutgoingBg }]}>
                                <Text style={[styles.outgoingText, { color: textColor }]}>Hello?</Text>
                                <View style={styles.messageStatus}>
                                    <Text style={[styles.timestamp, { color: isDarkTheme ? "#aaa" : "#777" }]}>1:55 AM</Text>
                                    <MaterialIcons name="done-all" size={16} color={isDarkTheme ? "white" : "black"} />
                                </View>
                            </View>
                        </View>

                        {/* Incoming */}
                        <View style={styles.incomingMessage}>
                            <View style={[styles.incomingBubble, { backgroundColor: bubbleIncomingBg }]}>
                                <Text style={[styles.incomingText, { color: textColor }]}>
                                    How may I be of help Abena?
                                </Text>
                                <Text style={[styles.timestamp, { color: isDarkTheme ? "#aaa" : "#777" }]}>1:56 AM</Text>
                            </View>
                        </View>

                        {/* More Outgoing */}
                        <View style={styles.outgoingMessage}>
                            <View style={[styles.outgoingBubble, { backgroundColor: bubbleOutgoingBg }]}>
                                <Text style={[styles.outgoingText, { color: textColor }]}>
                                    I have booked your taxi, can you come pick me up right away?
                                </Text>
                                <View style={styles.messageStatus}>
                                    <Text style={[styles.timestamp, { color: isDarkTheme ? "#aaa" : "#777" }]}>1:57 AM</Text>
                                    <MaterialIcons name="done-all" size={16} color={isDarkTheme ? "white" : "black"} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.outgoingMessage}>
                            <View style={[styles.outgoingBubble, { backgroundColor: bubbleOutgoingBg }]}>
                                <Text style={[styles.outgoingText, { color: textColor }]}>Of course! I will send now</Text>
                                <View style={styles.messageStatus}>
                                    <Text style={[styles.timestamp, { color: isDarkTheme ? "#aaa" : "#777" }]}>1:59 AM</Text>
                                    <MaterialIcons name="done-all" size={16} color={isDarkTheme ? "white" : "black"} />
                                </View>
                            </View>
                        </View>

                        {/* Image Message */}
                        <View style={styles.outgoingMessage}>
                            <Image source={carImg} style={styles.sentImage} />
                        </View>
                    </ScrollView>

                    {/* Input Area */}
                    <View style={[styles.inputArea, { paddingBottom: keyboardOpen ? 50 : 0 }]}>
                        <TouchableOpacity>
                            <MaterialIcons name="mood" size={24} color={isDarkTheme ? "#aaa" : "#555"} />
                        </TouchableOpacity>
                        <TextInput style={[styles.input, { color: textColor, backgroundColor: isDarkTheme ? "#1E293B" : "#f0f0f0" }]} placeholder="Message..." placeholderTextColor={isDarkTheme ? "#888" : "#999"} />
                        <View style={styles.inputActions}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Feather name="camera" size={24} color={isDarkTheme ? "#aaa" : "#555"} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <MaterialIcons name="mic-none" size={24} color={isDarkTheme ? "#aaa" : "#555"} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.sendButton}>
                            <Ionicons name="send" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        justifyContent: 'space-between',
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    onlineStatus: {
        fontSize: 12,
    },
    messageArea: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    dateSeparator: {
        textAlign: 'center',
        marginVertical: 10,
    },
    outgoingMessage: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    outgoingBubble: {
        borderRadius: 10,
        padding: 8,
        maxWidth: '80%',
    },
    outgoingText: {
        fontSize: 16,
    },
    messageStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 3,
    },
    timestamp: {
        fontSize: 12,
        marginRight: 5,
    },
    incomingMessage: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    incomingBubble: {
        borderRadius: 10,
        padding: 8,
        maxWidth: '80%',
    },
    incomingText: {
        fontSize: 16,
    },
    inputArea: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingBottom: 0
    },
    input: {
        flex: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        height: 50,
    },
    inputActions: {
        flexDirection: 'row',
    },
    actionButton: {
        marginLeft: 10,
    },
    sendButton: {
        backgroundColor: '#25D366',
        borderRadius: 25,
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sentImage: {
        width: 100,
        height: 80,
        borderRadius: 8,
        marginTop: 5,
    },
});

export default Msg;
