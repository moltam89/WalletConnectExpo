import QRCode from 'react-native-qrcode-svg';

import { View } from 'react-native';

export default function QR({ value, size, logoURI}) {


    if (!logoURI) {
        return (
            <View
                style={{ flex: 1, alignItems:"center", justifyContent:"center"}}>
                <QRCode
                    value={value}
                    size={size}
                    logoBackgroundColor="lightgray"
                />
            </View>    
    );
    }

    return (
        <View
            style={{ flex: 1, alignItems:"center", justifyContent:"center"}}>

            <QRCode
                value={value}
                size={size}
                logo={{uri: logoURI}}
                logoBackgroundColor="lightgray"
            />
        </View>
    );
}

