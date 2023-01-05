import { Button, Pressable, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";

import PressableIcon from "./PressableIcon";
import ModalSkeleton from "./ModalSkeleton";
import QR from "./QR";

const { getAllStoredConfig, applyDefaultDesign, getSharableConfigObject, storeConfig, applySharableConfigObject } = require('./DesignHelper');

export default function Settings({ frameConstants, onCloseFunction }) {
    let iconSize = frameConstants.iconSize;

    const [qrPushed, setQrPushed] = useState(false);
    const [qrValue, setQrValue] = useState(false);

    const fontSize = iconSize / 4;
    iconSize /= 3;

    if (qrPushed) {
        const content = (<> 
            <QR
                value={qrValue}
                size={iconSize * 3 * 3}
            />
        </>);

        return (
            <>
                <ModalSkeleton
                    content={content}
                    frameConstants={frameConstants}
                    onCloseFunction={onCloseFunction}
                />
            </>
        );
    }

    const handleResetPushed = (color) => {
        applyDefaultDesign();
        onCloseFunction(false);
    }

    const handleQRPushed = async() => {
        const sharableConfigObject = await getSharableConfigObject();

        setQrValue(JSON.stringify(sharableConfigObject));
        setQrPushed(true);
    }

	return (
        <>
            <View style={{ flex:0.9}}>
                <View style={{ flex:0.1}}/>

                <PressableIcon
                    config={{onPressAction:handleResetPushed, param:null, text:"Reset design", iconName:"ios-arrow-redo-outline", iconSize:iconSize, fontSize:fontSize}}
                />

                <View style={{ flex:0.1}}/>

                <PressableIcon
                    config={{onPressAction:handleQRPushed, param:true, text:"Share design", iconName:"qr-code-outline", iconSize:iconSize, fontSize:fontSize}}
                />

            </View>
        </>
    );
}

