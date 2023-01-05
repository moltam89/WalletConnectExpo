import { Pressable, Text, View } from 'react-native';
import React, { useState, useEffect } from "react";

import ModalSkeleton from "./ModalSkeleton";
import ColorPickerStyled from "./ColorPickerStyled";

export default function ColorPickerSkeleton({ color, setColor, frameConstants, borderRadius, content }) {
    const [longPress, setLongPress] = useState(false);

     const colorPickerContent = (
       <ColorPickerStyled
           color={color}
           setColor={setColor}
           frameConstants={frameConstants}
       />
    );

    const handleLongPress = () => {
        setLongPress(true);
    }

    return (
       <>
           {longPress && <ModalSkeleton content={colorPickerContent} frameConstants={frameConstants} onCloseFunction={setLongPress}/>}

           <Pressable
               style={{flex: 1, backgroundColor:color, borderRadius: borderRadius ? borderRadius : 0}}
               onLongPress={handleLongPress}
           >
                {content}
               
           </Pressable>
       </>
    );
}

