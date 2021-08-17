/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GameEngine} from 'react-native-game-engine';

import {globalStyles} from './app/globals/styles';
import entities from './app/entities';
import Physics from './app/entities/Physics';

const App = () => {
  const [running, setRunning] = React.useState(false);
  const [gameEngine, setGameEngine] = React.useState(null);
  const [gameScore, setGameScore] = React.useState(0);

  React.useEffect(() => {
    setRunning(false);
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={styles.gameScore}>{gameScore}</Text>
      <GameEngine
        ref={ref => {
          setGameEngine(ref);
        }}
        style={styles.gameEngine}
        entities={entities()}
        systems={[Physics]}
        running={running}
        onEvent={e => {
          switch (e.type) {
            case 'game_over':
              setRunning(false);
              gameEngine.stop();
              break;
            case 'new_point':
              setGameScore(gameScore + 1);
              break;
          }
        }}>
        <StatusBar style="auto" hidden />
      </GameEngine>

      {!running ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'black',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
            onPress={() => {
              setGameScore(0);
              setRunning(true);
              gameEngine.swap(entities());
            }}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 30}}>
              START
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gameEngine: {
    ...StyleSheet.absoluteFillObject,
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
  },
  gameScore: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
