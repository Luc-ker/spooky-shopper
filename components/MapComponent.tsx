import { Text, View, TextInput, Button } from "react-native";
import { Canvas, Path, Skia, DashPathEffect } from "@shopify/react-native-skia";
import {
    useSharedValue,
    withTiming,
    withRepeat,
    Easing
} from 'react-native-reanimated';  
import { useEffect } from "react";


type Vec2 = {
    x: number;
    y: number
}

function translateMapCoordinatesToScreen(x: number, y: number, imageWidth: number, imageHeight: number, canvasWidth: number, canvasHeight: number): Vec2  {
    return {x: x/imageWidth * canvasWidth, y: y/imageHeight * canvasHeight}
}

export default function MapComponent() {
    const offset = useSharedValue(0);

    const path = Skia.Path.Make();
    path.moveTo(0, 0);
    path.lineTo(400, 0)
    path.lineTo(400, 400)
    path.lineTo(0, 400)
    path.close();

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.linear }),
            -1,
            false
        );
    }, [])
     
    return (
        <Canvas style={{ width: 400, height: 400 }}>
            <Path
                path={path}
                style={"stroke"}
                strokeWidth={9}
                color="gray"
                start={offset} // use this to show the direction the path is going in
            >
            </Path>
        </Canvas>
    );
}
