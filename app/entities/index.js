import Matter from 'matter-js';
import Bird from '../components/Bird/Bird';
import Floor from '../components/Floor/Floor';
import Obstacle from '../components/Obstacle/Obstacle';

import {Dimensions} from 'react-native';
import {getPipeSizePos} from '../utils/random';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default restart => {
  let engine = Matter.Engine.create({enableSleeping: false});

  let world = engine.world;

  world.gravity.y = 0.5;

  const pipeSizePosA = getPipeSizePos();
  const pipeSizePosB = getPipeSizePos(windowWidth * 0.9);
  return {
    physics: {engine, world},
    Bird: Bird(world, 'blue', {x: 50, y: 300}, {height: 40, width: 40}),

    ObstacleTop1: Obstacle(
      world,
      'ObstacleTop1',
      'red',
      pipeSizePosA.pipeTop.pos,
      pipeSizePosA.pipeTop.size,
    ),
    ObstacleBtm1: Obstacle(
      world,
      'ObstacleBtm1',
      'blue',
      pipeSizePosA.pipeBtm.pos,
      pipeSizePosA.pipeBtm.size,
    ),
    ObstacleTop2: Obstacle(
      world,
      'ObstacleTop2',
      'red',
      pipeSizePosB.pipeTop.pos,
      pipeSizePosB.pipeTop.size,
    ),
    ObstacleBtm2: Obstacle(
      world,
      'ObstacleBtm2',
      'blue',
      pipeSizePosB.pipeBtm.pos,
      pipeSizePosB.pipeBtm.size,
    ),

    Floor: Floor(
      world,
      'green',
      {x: windowWidth / 2, y: windowHeight},
      {height: 50, width: windowWidth},
    ),
  };
};
