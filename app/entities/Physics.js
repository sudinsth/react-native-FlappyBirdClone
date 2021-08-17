import Matter from 'matter-js';
import {getPipeSizePos} from '../utils/random';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Physics = (entities, {touches, time, dispatch}) => {
  let engine = entities.physics.engine;

  touches
    .filter(t => t.type === 'press')
    .forEach(t => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -5,
      });
    });

  Matter.Engine.update(engine, time.delta);

  for (let index = 1; index <= 2; index++) {
    //detect collision with bird
    if (
      entities[`ObstacleTop${index}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${index}`].point
    ) {
      entities[`ObstacleTop${index}`].point = true;
      dispatch({type: 'new_point'});
    }

    //obstacles out of the screen
    if (entities[`ObstacleTop${index}`].body.bounds.max.x <= 0) {
      const pipeSizePos = getPipeSizePos(windowWidth * 0.9);
      Matter.Body.setPosition(
        entities[`ObstacleTop${index}`].body,
        pipeSizePos.pipeTop.pos,
      );
      Matter.Body.setPosition(
        entities[`ObstacleBtm${index}`].body,
        pipeSizePos.pipeBtm.pos,
      );

      entities[`ObstacleTop${index}`].point = false;
    }

    Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x: -3, y: 0});
    Matter.Body.translate(entities[`ObstacleBtm${index}`].body, {x: -3, y: 0});
  }

  Matter.Events.on(engine, 'collisionStart', event => {
    dispatch({type: 'game_over'});
  });

  return entities;
};

export default Physics;
