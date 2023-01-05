import { Button, Pressable, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";

import WalletImport from "./WalletImport";
import WalletRevealKey from "./WalletRevealKey";

import AccountSelector from "./AccountSelector";
import PressableIcon from "./PressableIcon";

const { generateAndStoreWallet, storeWallet } = require('./WalletImportHelper');

export default function WalletSecrets({ accountHelper, frameConstants}) {
    let iconSize = frameConstants.iconSize;
    const fontSize = iconSize / 4;
    log("WalletSecrets")
    const [walletImport, setWalletImport] = useState();
    const [walletReveal, setWalletReveal] = useState();

    if (walletImport) {
        return (
            <>
                <WalletImport setWalletImport={setWalletImport} accountHelper={accountHelper} />
            </>
        );
    }

    if (walletReveal) {
        return (
            <>
                <AccountSelector accountHelper={accountHelper}/>
                <WalletRevealKey setWalletReveal={setWalletReveal} accountHelper={accountHelper} />
            </>
        );
    }

    iconSize /= 2;

	return (
        <>
            <View style={{ flex:0.1}} >
                <AccountSelector accountHelper={accountHelper}/>
            </View>

            <View style={{ flex:0.9}}>
                <View style={{ flex:0.1}}/>

                <PressableIcon
                    config={{onPressAction:setWalletReveal, param:true, text:"Reveal secret", iconName:"alert-circle-outline", iconSize:iconSize, fontSize:fontSize}}
                />

                <View style={{ flex:0.1}}/>

                <PressableIcon
                    config={{onPressAction:setWalletImport, param:true, text:"Import account", iconName:"arrow-up-circle-outline", iconSize:iconSize, fontSize:fontSize}}
                />

                <View style={{ flex:0.1}}/>

                <PressableIcon
                    config={{onPressAction:generateAndStoreWallet, param:accountHelper, text:"Generate account", iconName:"add-circle-outline", iconSize:iconSize, fontSize:fontSize}}
                />
            </View>
        </>
    );
}

