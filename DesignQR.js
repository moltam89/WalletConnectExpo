import QRCode from 'react-native-qrcode-svg';

export default function DesignQR({ value, size}) {
    return (
        <QRCode
            value={value}
            size={size}
            logoBackgroundColor="pink"
        />
    );
}

