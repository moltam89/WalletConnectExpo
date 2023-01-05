import AsyncStorage from '@react-native-async-storage/async-storage';

getItem = async (key) => {
    return (await AsyncStorage.getItem(key));
}

setItem = async (key, value) => {
    await AsyncStorage.setItem(key, value);
}

module.exports = {
    getItem, setItem
}