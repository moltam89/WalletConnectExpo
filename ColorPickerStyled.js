import React from 'react';
import { Image, Text, View } from 'react-native';
import ColorPicker from "./ColorPicker";

export default function ColorPickerStyled({ color, setColor, frameConstants }) {
  const iconSize = frameConstants.iconSize;
  const palette = ['#000000','#FFFFFF','#ed1c24','#d11cd5','#1633e6','#00c85d','#ffde17','#f26522'];
  const swatchesSize = iconSize * 4 / palette.length * 0.8;

  return (
      <>
        <View style={{ flex:0.9 }}>
          <ColorPicker
              onColorChange={setColor}
              color={color}
              sliderSize={iconSize / 1 }
              gapSize={iconSize / 4}
              thumbSize={iconSize / 2.5}
              swatchesSize={swatchesSize}
              palette={palette}
              autoResetSlider={true}
          />
        </View> 
      </>
    );
}

