import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { codes } from "../constants/CountryCodes";

const CountryCodeModal = ({ isVisible, onClose, onSelect }) => {
    const [searchText, setSearchText] = useState('');

    const renderCountryItem = ({ item }) => {
        const imageUrl = `https://country-code-au6g.vercel.app/${item.code}.svg`;
        return (
            <TouchableOpacity style={styles.countryItem} onPress={() => onSelect(item)}>
                <SvgUri width={24} height={24} uri={imageUrl} resizeMode="contain" />
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.dialCode}>{item.dial_code}</Text>
            </TouchableOpacity>
        );
    };

    const filteredCountries = codes.filter(country =>
        country.name.toLowerCase().includes(searchText.toLowerCase()) ||
        country.dial_code.includes(searchText)
    );

    return (
        <Modal visible={isVisible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign name="arrowleft" size={24} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Select Your Country</Text>
                </View>
                <TextInput
                    style={styles.searchCountryInput}
                    placeholder="Enter Country Name"
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholderTextColor={"#8f8f8f"}
                />
                <FlatList
                    data={filteredCountries}
                    renderItem={renderCountryItem}
                    keyExtractor={(item) => item.code}
                />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
    },
    searchCountryInput: {
        height: 48,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        marginBottom: 10,
        marginHorizontal: 20,
        color: "#000"
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    countryName: {
        flex: 1,
        fontSize: 16,
        marginLeft: 10,
    },
    dialCode: {
        fontSize: 16,
        color: 'gray',
    },
});
export default CountryCodeModal