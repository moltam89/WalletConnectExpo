import { View } from 'react-native';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';

import IconsView from "./IconsView";
import TopBar from "./TopBar";

export default function SafeApp({ accountHelper }) {
    const frame = useSafeAreaFrame();
    const insets = useSafeAreaInsets();
    
    const width = frame.width;
    const height = frame.height;

    const safeWidth = width - insets.left - insets.right;
    const safeHeight = height - insets.top - insets.bottom;

    const iconSize = safeWidth / 4;
    const minTopBarHeight = iconSize / 4;

    let rows = Math.floor(safeHeight / iconSize);
    let topBarHeight = safeHeight - rows * iconSize;

    if (topBarHeight < minTopBarHeight) {
        topBarHeight += iconSize;
        rows -= 1;
    }

    const iconsViewHeight = safeHeight - topBarHeight;

    const frameConstants = {topBarHeight:topBarHeight, iconSize:iconSize, rows:rows}

    return (
        <>
            <View style={{ height: topBarHeight, width: safeWidth }}>
                <TopBar
                    frameConstants={frameConstants}
                    accountHelper={accountHelper}
                />
            </View>
            <View style={{ height: iconsViewHeight, width: safeWidth }}>
                 <IconsView
                    frameConstants={frameConstants}
                    accountHelper={accountHelper}
                />
            </View>
        </>
    );
}

