import React, {useState, useRef} from 'react';
import { Dimensions, StyleSheet, Text, View, StatusBar, Alert, TouchableOpacity, Image} from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Bird from '../components/Bird';
import Wall from '../components/Wall.js';
import Floor from '../components/Floor.js'
import Physics from '../Physics.js';
import Constants from '../constants.js';
import Images from '../assets/Images.js';
import Orientation from 'react-native-orientation';
export const randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export const generatePipes = () => {
    let topPipeHeight = randomBetween(100, (Constants.MAX_HEIGHT / 2) - 100);
    let bottomPipeHeight = Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE;
    let sizes = [topPipeHeight, bottomPipeHeight]
    if (Math.random() < 0.5) {
        sizes = sizes.reverse();
    }
    return sizes;
}


export default function GameScreen({navigation}) {
   // Orientation.lockToLandscape();
    const [state, setState] = useState({running: false, score: 0})
  /*  this.state = {
        running: true,
        score: 0
    }; */

  //  let gameEngine = null;
    const [gameEngine, setGameEngine] = useState(null);

   const setupWorld = () => {
        let engine = Matter.Engine.create({ enableSleeping: false });
        let world = engine.world;
        world.gravity.y = 0.0;

        let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT / 2, Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT);
        bird.restitution = 20;
        let floor1 = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT - 25, Constants.MAX_WIDTH + 4, 50, { isStatic: true });
        // let ceiling = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, 25, Constants.MAX_WIDTH, 50, { isStatic: true });
        let floor2 = Matter.Bodies.rectangle(Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2), Constants.MAX_HEIGHT - 25, Constants.MAX_WIDTH + 4, 50, { isStatic: true })
        let [pipe1Height, pipe2Height] = generatePipes();

        //  let pipe1 = Matter.Bodies.rectangle( Constants.MAX_WIDTH - (Constants.PIPE_WIDTH / 2), pipe1Height / 2, Constants.PIPE_WIDTH, pipe1Height, { isStatic: true });
        //  let pipe2 = Matter.Bodies.rectangle( Constants.MAX_WIDTH - (Constants.PIPE_WIDTH / 2), Constants.MAX_HEIGHT - (pipe2Height / 2), Constants.PIPE_WIDTH, pipe2Height, { isStatic: true });

        // let [pipe3Height, pipe4Height] = generatePipes();

        //  let pipe3 = Matter.Bodies.rectangle( Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2), pipe3Height / 2, Constants.PIPE_WIDTH, pipe3Height, { isStatic: true });
        //  let pipe4 = Matter.Bodies.rectangle( Constants.MAX_WIDTH * 2 - (Constants.PIPE_WIDTH / 2), Constants.MAX_HEIGHT - (pipe4Height / 2), Constants.PIPE_WIDTH, pipe4Height, { isStatic: true });

        Matter.World.add(world, [bird, floor1]) //ceiling, pipe1, pipe2, pipe3, pipe4]);
        Matter.Events.on(engine, 'collisionStart', (event) => {
            var pairs = event.pairs;

            gameEngine.dispatch({ type: "game-over" });
            //navigation.navigate('GameOverScreen')

        });

        return {
            physics: { engine: engine, world: world },
            floor1: { body: floor1, renderer: Floor },
            floor2: { body: floor2, renderer: Floor },
            //ceiling: { body: ceiling, size: [Constants.MAX_WIDTH, 50], color: "green", renderer: Wall },
            bird: { body: bird, pose: 1, renderer: Bird },
            //pipe1: { body: pipe1, size: [Constants.PIPE_WIDTH, pipe1Height], color: "green", renderer: Wall },
            // pipe2: { body: pipe2, size: [Constants.PIPE_WIDTH, pipe2Height], color: "green", renderer: Wall },
            // pipe3: { body: pipe3, size: [Constants.PIPE_WIDTH, pipe3Height], color: "green", renderer: Wall },
            // pipe4: { body: pipe4, size: [Constants.PIPE_WIDTH, pipe4Height], color: "green", renderer: Wall }
        }
    }
    let entities = setupWorld();
   const onEvent = (e) => {
        if (e.type === "game-over") {
            //Alert.alert("Game Over");
            setState({...state, running: false});
            navigation.navigate("GameOverScreen");
        }
        else if(e.type === "score"){
            setState({...state,
                score:state.score + 1
            })
        }
    }

   const reset = () => {
        gameEngine.swap(setupWorld());
        setState({
            running: true, score: 0
        });
    }
    return(
        <View style={styles.container}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
        <GameEngine
            ref={(ref)=>{setGameEngine(ref)}}
            style={styles.gameContainer}
            systems={[Physics]}
            running={state.running}
            onEvent={onEvent}
            entities={entities}>
            <StatusBar hidden={true} />
        </GameEngine>
        <Text style={styles.score}>{state.score}</Text>
        {!state.running && <TouchableOpacity style={styles.fullScreenButton} onPress={reset}>
            <View style={styles.fullScreen}>
                <Text style={styles.gameOverText}>Game Over</Text>
            </View>
        </TouchableOpacity>}
    </View>
    )
  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    gameContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    gameOverText: {
        color: 'white',
        fontSize: 48
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullScreenButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT
    },
    score: {
        color: 'white',
        fontSize: 72,
      //  fontFamily: '04b_19',
        position: 'absolute',
        top: 50,
        left: Constants.MAX_WIDTH / 2 - 24,
        textShadowColor: '#222222',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    }
})
