import React from 'react';
import  {View, Image} from 'react-native';
import Images from './assets/Images';

function Floor(props) {
    const width = props.body.bounds.max.x - props.body.bounds.min.x;
        const height = props.body.bounds.max.y - props.body.bounds.min.y;
        const x = props.body.position.x - width / 2;
        const y = props.body.position.y - height / 2;

        const imageIterations = Math.ceil(width / height);

    return (
        <View
        style={{
            position: 'absolute',
            left: x,
            top: y,
            width: width,
            height: height,
            overflow: 'hidden',
            flexDirection: 'row'
        }}>
        {Array.apply(null, Array(imageIterations)).map((el, idx) => {
            return <Image style={{ width: height, height: height }} key={idx} source={Images.floor} resizeMode="stretch" />
        })}
    </View>
    )
}

export default Floor
