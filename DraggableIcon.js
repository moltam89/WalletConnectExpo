import React, { useState, useEffect } from "react";
import { Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import Draggable from 'react-native-draggable';

import ModalSkeleton from "./ModalSkeleton";
import ColorPickerStyled from "./ColorPickerStyled";

import ColorPickerSkeleton from "./ColorPickerSkeleton";

const PERCENTAGE = 0.5;

const { storeConfig, ICON_ID_PREFIX, getStoredConfig } = require('./DesignHelper');

export default function DraggableIcon({ x, y, config, frameConstants, sizeMultiplier, iconId}) {
    const [backgroundColor, setBackgroundColor] = useState();
    const [iconColor, setIconColor] = useState();

    const [longPress, setLongPress] = useState(false);
    const [longPressIcon, setLongPressIcon] = useState(false);

    const storageKey = ICON_ID_PREFIX + iconId; 

    useEffect(() => {
        if (!backgroundColor && !iconColor) {
            return;
        }

        const storageObject = {bc:backgroundColor, ic:iconColor}
        storeConfig(storageKey, storageObject);
    },[backgroundColor, iconColor]);

    useEffect(() => {
        async function handleStoredConfig() {
            const storedConfig = await getStoredConfig(storageKey);

            if (storedConfig) {
                setBackgroundColor(storedConfig.bc);
                setIconColor(storedConfig.ic);
            }
        }

        handleStoredConfig();
    }, []);

    const colorPickerContent = (<> 
       <ColorPickerStyled
           color={backgroundColor}
           setColor={setBackgroundColor}
           frameConstants={frameConstants}
       />
    </>);
    const colorPickerContentIcon =(<> 
        <ColorPickerStyled
           color={iconColor}
           setColor={setIconColor}
           frameConstants={frameConstants}
       />
    </>);
    const handlePress = () => {
        if (config.onPressFunction) {
            config.onPressFunction(true);
        }
    }
    const handleLongPress = () => {
        setLongPress(true);
    }
    const handleLongPressIcon = () => {
        setLongPressIcon(true);
    }

    const iconSize = frameConstants.iconSize;
    const iconSizeMultiplied = sizeMultiplier ? sizeMultiplier * iconSize : iconSize;

    return (
       <>
          {longPress && <ModalSkeleton content={colorPickerContent} frameConstants={frameConstants} onCloseFunction={setLongPress}/>}
          {longPressIcon && <ModalSkeleton content={colorPickerContentIcon} frameConstants={frameConstants} onCloseFunction={setLongPressIcon}/>}
          {!longPress && !longPressIcon &&
              <Draggable x={x} y={y}>
                 <Pressable
                    style = {{
                        height: iconSizeMultiplied,
                        width: iconSizeMultiplied,
                        backgroundColor: backgroundColor,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: iconSizeMultiplied / 6
                      }}

                    onPress={handlePress}
                    onLongPress={handleLongPress}
                  >
                        <Pressable
                            onPress={handlePress}
                            onLongPress={handleLongPressIcon}
                        >  
                                {config.materialicons && <MaterialIcons
                                     name={config.name}
                                     size={(iconSizeMultiplied) * PERCENTAGE}
                                     color={iconColor}
                                 />
                                }

                                {config.iconicons && <Ionicons
                                     name={config.name}
                                     size={(iconSizeMultiplied) * PERCENTAGE}
                                     color={iconColor}
                                 />
                                }
                        </Pressable>
                  </Pressable>
              </Draggable>
          }
       </>
    );

}