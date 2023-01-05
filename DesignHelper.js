import AsyncStorage from '@react-native-async-storage/async-storage';

const { setItem, getItem } = require('./Storage');

const ICON_ID_PREFIX = "ICON_ID_";
const DEFAULT_DESIGN_APPLIED = "DEFAULT_DESIGN_APPLIED";

const applyDefaultDesign = async () => {
    const defaultDesignMap = getDefaultDesignMap();

    defaultDesignMap.forEach((value, key) => {
        storeConfig(key, value);
    })
}

const initDefaultDesign = async () => {
    const defaultDesignApplied = await getItem(DEFAULT_DESIGN_APPLIED);

    if (defaultDesignApplied === "true") {
        return;
    }

    applyDefaultDesign();

    setItem(DEFAULT_DESIGN_APPLIED, "true");
}

const storeConfig = async(storageKey, storageObject) => {
    await setItem(storageKey, JSON.stringify(storageObject));
}

const getDefaultDesignMap = () => {
    /*
    {
      "ICON_ID_0" => Object {
        "backgroundColor": "#f26321",
        "iconColor": "#ed1c23",
        "iconId": 0,
      },
      "ICON_ID_1" => Object {
        "backgroundColor": "#1632e5",
        "iconColor": "#ed1c23",
        "iconId": 1,
      },
      "ICON_ID_2" => Object {
        "backgroundColor": "#242c99",
        "iconColor": "#c64c43",
        "iconId": 2,
      },
    }
    */

    const defaultDesignMap = new Map();

    const iconDesign_0 = {bc:"#242c99", ic:"#ed1c23"};
    const iconDesign_1 = {bc:"#242c99", ic:"#ed1c23"};
    const iconDesign_2 = {bc:"#242c99", ic:"#ed1c23"};
    const iconDesign_3 = {bc:"#242c99", ic:"#ed1c23"};

    [iconDesign_0, iconDesign_1, iconDesign_2, iconDesign_3].forEach((element, index) => {
        defaultDesignMap.set(ICON_ID_PREFIX + index, element);
    })

    defaultDesignMap.set(ICON_ID_PREFIX + "X",  {bc:"#FFFFFF", ic:"#000000"})

    //console.log("defaultDesignMap", defaultDesignMap);

    return defaultDesignMap;
}

const getStoredConfig = async (storageKey) => {
    return JSON.parse(await getItem(storageKey));
}

const getAllStoredConfig = async () => {
    const asyncStorageKeys = await AsyncStorage.getAllKeys();

    const designStorageKeys = asyncStorageKeys.filter(
        (key) => {
            return key.startsWith(ICON_ID_PREFIX);
        }
    );

    return (await AsyncStorage.multiGet(designStorageKeys));
}

const applySharableConfigObject = (sharableConfigObject) => {
    Object.keys(sharableConfigObject).forEach((storageKey) => {
        const valueObject = sharableConfigObject[storageKey];

        storeConfig(storageKey, valueObject);
    })
    
}

const getSharableConfigObject = async () => {
    const allStoredConfig = await getAllStoredConfig();

    const sharableConfigObject = {}

    allStoredConfig.forEach((configArray) => {
        const key = configArray[0];
        const valueObject = JSON.parse(configArray[1]);

        sharableConfigObject[key] = valueObject;
    })

    console.log("sharableConfigObject", sharableConfigObject);

    return sharableConfigObject;
}



module.exports = {
    applyDefaultDesign, initDefaultDesign, getAllStoredConfig, getDefaultDesignMap, storeConfig, getStoredConfig, getSharableConfigObject, applySharableConfigObject,
    ICON_ID_PREFIX
}

