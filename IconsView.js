import Draggable from 'react-native-draggable';

import React, { useState } from "react";
import { View } from 'react-native';

import SettingsModal from "./SettingsModal";
import DraggableIcon from "./DraggableIcon";
import ModalSkeleton from "./ModalSkeleton";
import WalletSecrets from "./WalletSecrets";
import QR from "./QR";
import Settings from "./Settings";
import ScannerOnly from "./ScannerOnly";

const ADDRESS_SLICE = 6;
const ICON_PERCENTAGE = 0.45;
const FONT_PERCENTAGE = 0.2;

const { applySharableConfigObject, getAllStoredConfig } = require('./DesignHelper');

export default function IconsView({ accountHelper, frameConstants }) {
    const topBarViewHeight = frameConstants.topBarHeight;
    const iconSize = frameConstants.iconSize;
    const rows = frameConstants.rows;

    const [qrPushed, setQrPushed] = useState(false);
    const [walletPushed, setWalletPushed] = useState(false);
    const [settingsPushed, setSettingsPushed] = useState(false);
    const [scannerPushed, setScannerPushed] = useState(false);

    const WalletSecretsContent = (<> 
        <WalletSecrets frameConstants={frameConstants} accountHelper={accountHelper}/>
    </>);

    const QRContent = (<> 
        <QR
            value={accountHelper.getWallet()?.address}
            size={iconSize * 3}
        />
    </>);

    const SettingsContent = (<> 
        <Settings
            frameConstants={frameConstants}
            onCloseFunction={setSettingsPushed}
        />
    </>);

    const scannerAction = async(scannedText) => {
        
        
        const sharableConfigObject = JSON.parse(scannedText);

        await applySharableConfigObject(sharableConfigObject);

        const allStoredConfig = await getAllStoredConfig();

        setScannerPushed(false);
    }

    const ScannerContent =  (<> 
        <ScannerOnly
            barCodeScanAction={scannerAction}
        />
    </>);

    return (
        <View style={{ flex: 1,  borderWidth: 0}} borderColor={"blue"} borderStyle={"solid"} >
            {qrPushed && <ModalSkeleton content={QRContent} onCloseFunction={setQrPushed} frameConstants={frameConstants} />}
            {walletPushed && <ModalSkeleton content={WalletSecretsContent} onCloseFunction={setWalletPushed} frameConstants={frameConstants}/>}
            {scannerPushed && <ModalSkeleton content={ScannerContent} onCloseFunction={setScannerPushed} frameConstants={frameConstants}/>}
            {settingsPushed && <ModalSkeleton content={SettingsContent} onCloseFunction={setSettingsPushed} frameConstants={frameConstants}/>}
            {!qrPushed && !walletPushed && !settingsPushed &&  !scannerPushed &&
                <View>
                    <DraggableIcon
                        x={0} y={0}
                        config={{name:"wallet-outline", onPressFunction:setWalletPushed, backgroundColor:"#aad7ff", iconColor:"#d11cd5", iconicons:true}}
                        frameConstants={frameConstants}
                        iconId={0}
                    />
                    <DraggableIcon
                        x={3 * iconSize} y={0}
                        config={{name:"qr-code-outline", onPressFunction:setQrPushed, backgroundColor:"#aad7ff", iconColor:"#d11cd5", iconicons:true}}
                        frameConstants={frameConstants}
                        iconId={1}
                    />

                    <DraggableIcon
                        x={2 * iconSize} y={rows * iconSize - iconSize * 2}
                        config={{name:"ios-scan", onPressFunction:setScannerPushed, backgroundColor:"#aad7ff", iconColor:"#d11cd5", iconicons:true}}
                        sizeMultiplier={2}
                        frameConstants={frameConstants}
                        iconId={2}
                    />

                    <DraggableIcon
                        x={0} y={rows * iconSize - iconSize}
                        config={{name:"settings-outline", onPressFunction:setSettingsPushed, backgroundColor:"#FFFFFF", iconColor:"#d11cd5", iconicons:true}}
                        frameConstants={frameConstants}
                        iconId={3}
                    />
                </View>
            }
        </View>
    );
}

    