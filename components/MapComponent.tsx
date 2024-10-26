import { Text, View, TextInput, Button } from "react-native";
import { Canvas, Path, Skia, DashPathEffect } from "@shopify/react-native-skia";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
  } from 'react-native-reanimated';  
import { useEffect } from "react";

export default function MapComponent() {
    const offset = useSharedValue(0);

    const path = Skia.Path.Make();
    path.moveTo(128, 0);
    path.lineTo(168, 80);
    path.lineTo(256, 93);
    path.lineTo(192, 155);
    path.lineTo(207, 244);
    path.lineTo(128, 202);
    path.lineTo(49, 244);
    path.lineTo(64, 155);
    path.lineTo(0, 93);
    path.lineTo(88, 80);
    path.lineTo(128, 0);
    path.close();

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(1, { duration: 3000 }),
            -1,
            false
        );
    }, [])
     
    return (
        <Canvas style={{ width: 400, height: 600 }}>
            <Path
                path={path}
                style={"stroke"}
                strokeWidth={3}
                color="gray"
                start={offset} // use this to show the direction the path is going in
            >
            </Path>
        </Canvas>
    );
}
