import { Text, View, TextInput, Button } from "react-native";
import { Canvas, Path, Skia, DashPathEffect, useImage, Image, Circle } from "@shopify/react-native-skia";
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

    const [pObject, setPObject] = useState<any>()

    let path = Skia.Path.Make();

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(1, { duration: 3000, easing: Easing.linear }),
            -1,
            false
        );

        path = Skia.Path.Make()
        props.points.forEach((element: any) => {
            let translatedCoordinates: Vec2 = translateMapCoordinatesToScreen(element[1], element[2], 900, 900, 400, 400)
            path.moveTo(translatedCoordinates.x, translatedCoordinates.y)
        })
        setPObject(path)
    }, [])
     
    return (
        <Canvas style={{ width: 400, height: 400 }}>
            <Image image={image} fit="fill" x={0} y={0} width={400} height={400} />
            {
                props.points.map((element: any) => {
                    let translatedCoordinates: Vec2 = translateMapCoordinatesToScreen(element[1], element[2], 900, 900, 400, 400)
                    console.log(translatedCoordinates)
                    return (<Circle key={element.name} cx={translatedCoordinates.x} cy={translatedCoordinates.y} color="red" r={5} />)
                })
            }

            {pObject === null ? (<Circle cx={0} cy={0} color="lightblue" r={360} />) : (
                <Path
                path={pObject}
                style={"stroke"}
                strokeWidth={9}
                color="red"
                start={offset} />)
            }
        </Canvas>
    );
}
