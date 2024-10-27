import { View, TextInput, Button } from "react-native";
import { Text, Canvas, Path, Skia, DashPathEffect, useImage, Image, Circle, Group, useFont } from "@shopify/react-native-skia";
import {
    useSharedValue,
    withTiming,
    withRepeat,
    Easing
} from 'react-native-reanimated';  
import { useEffect, useState } from "react";


type Vec2 = {
    x: number;
    y: number
}

function translateMapCoordinatesToScreen(x: number, y: number, imageWidth: number, imageHeight: number, canvasWidth: number, canvasHeight: number): Vec2  {
    return {x: x/imageWidth * canvasWidth, y: canvasHeight - (y/imageHeight * canvasHeight)}
}


export default function MapComponent(props: any) {
    const offset = useSharedValue(0);

    const image = useImage(require("../assets/images/tempMap.png"))

    let path = Skia.Path.Make();

    const font = useFont(require("../assets/fonts/SpaceMono-Regular.ttf"), 15);

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.linear }),
            -1,
            true
        );

        path.reset();
        props.points.forEach((element: any, index: number) => {
            let translatedCoordinates: Vec2 = translateMapCoordinatesToScreen(element[1], element[2], 900, 900, 400, 400)

            if (index == 0) {
                path.moveTo(translatedCoordinates.x, translatedCoordinates.y)  
            } else {
                path.lineTo(translatedCoordinates.x, translatedCoordinates.y)
            }
        })
    }, [])
     
    return (
        <Canvas style={{ width: 400, height: 400 }}>
            <Image image={image} fit="fill" x={0} y={0} width={400} height={400} />


            {
                props.points.map((element: any, index: number) => {
                    let translatedCoordinates: Vec2 = translateMapCoordinatesToScreen(element[1], element[2], 900, 900, 400, 400)
                    return (
                        <Group key={element[0]} >
                            <Circle cx={translatedCoordinates.x} cy={translatedCoordinates.y} color="red" r={8} />
                            <Text x={translatedCoordinates.x - 5} y={translatedCoordinates.y + 5} text={`${index}`} color={'white'} font={font} />
                        </Group>
                    )
                })
            }
        </Canvas>
    );
}

/*
            {
                <Path
                path={path}
                style={"stroke"}
                strokeWidth={9}
                color="red"
                start={offset} />
            }
*/
