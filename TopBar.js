import React, { useState, useEffect } from "react";
import { Image, Pressable, Text, View } from 'react-native';

import ColorPickerSkeleton from "./ColorPickerSkeleton";
import ColorPickerStyled from "./ColorPickerStyled";
import ModalSkeleton from "./ModalSkeleton";

const ADDRESS_SLICE = 6;
const ICON_PERCENTAGE = 0.45;
const FONT_PERCENTAGE = 0.8;

const { storeConfig, ICON_ID_PREFIX, getStoredConfig } = require('./DesignHelper');

export default function TopBar({ frameConstants, accountHelper }) {
    const [color, setColor] = useState();

    const [longPressAddress, setLongPressAddress] = useState(false);
    const [colorAddress, setColorAddress] = useState();

    const storageKey = ICON_ID_PREFIX + "X"; 

    useEffect(() => {
        if (!color && !colorAddress) {
            return;
        }

        const storageObject = {bc:color, ic:colorAddress}
        storeConfig(storageKey, storageObject);
    },[color, colorAddress]);

    useEffect(() => {
        async function handleStoredConfig() {
            const storedConfig = await getStoredConfig(storageKey);

            console.log("storedConfig",storageKey, storedConfig);

            if (storedConfig) {
                setColor(storedConfig.bc);
                setColorAddress(storedConfig.ic);
            }
        }

        handleStoredConfig();
    }, []);

    const colorPickerAddressContent = (<> 
       <ColorPickerStyled
           color={colorAddress}
           setColor={setColorAddress}
           frameConstants={frameConstants}
       />
    </>);
    const handleLongPressAddress = () => {
        setLongPressAddress(true);
    }

    const punkSize = frameConstants.topBarHeight * ICON_PERCENTAGE;
    const fontSize = punkSize * FONT_PERCENTAGE;

    const content = (<> 
       <View
           style={{ flex: 1, flexDirection: "row", alignItems:"center", justifyContent:"center", borderWidth: 0 }}
           borderColor={"red"} borderStyle={"solid"} 
       >
           <Pressable
               onLongPress={handleLongPressAddress}
           >
               <Text style={{fontSize: fontSize, color:colorAddress}}>
                   {true && accountHelper.getWallet().address.slice(0, ADDRESS_SLICE)}
               </Text>
           </Pressable>

            <Pressable style={{ paddingBottom: punkSize * 0.18 }}>
                <Image
                    style={{ width: punkSize, height: punkSize }}
                    source={{
                      uri: `https://www.larvalabs.com/public/images/cryptopunks/punk${accountHelper.getPunkIndex()}.png`
                    }}
                />
            </Pressable>
       </View>
    </>);

    return (
       <>
           {longPressAddress && <ModalSkeleton content={colorPickerAddressContent} frameConstants={frameConstants} onCloseFunction={setLongPressAddress}/>}
           <ColorPickerSkeleton
               color={color}
               setColor={setColor}
               frameConstants={frameConstants}
               content={content}
               borderRadius={30} 
           />
       </>
    );
}

