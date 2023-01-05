import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PressableIcon({ config }) {
    return (
    	<>
    		<Pressable
            style={{flex:0.2, backgroundColor:"rgb(250,250,250)", borderRadius: 20}}
            onPress={() => {
            	if (config.param) {
            		config.onPressAction(config.param)
            	}
            	else {
					config.onPressAction()
            	}
            	
            }}>

	            <View style={{ flex:1, alignItems:"center", justifyContent:"center"}}>
	                <Text style={{fontSize: config.fontSize}}>
	                    {config.text}
	                </Text>

	                <Ionicons
	                    name={config.iconName}
	                    size={config.iconSize}
	                    color={"rgb(24,144,255)"}
	                />
	            </View>
        	</Pressable>
        </>
    );
}

