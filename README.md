# QuickStartStarCatcher

official was updated at 16 May 2017.
 - https://github.com/cocos-creator/tutorial-first-game/blob/master/polished_project_ts/assets/scripts/Game.ts

so I rewrite by TypeScript with CocosCreator 2.0. following change list.

# changed from 1.9 to 2.0
* cc.random0To1() -> Math.random() 
* cc.randomMinus1To1() -> (Math.random() - 0.5) * 2
* decorator defined by object with type. @property({type: cc.AudioClip})
* key event handler. (event: cc.Event.EventKeyboard)
* cc.KEY.a -> cc.macro.KEY.a
* cc.pDistance(a, b) -> a.sub(b).mag()
* cc.p -> cc.v2


## removed or deprecated list
- https://github.com/cocos-creator/engine/blob/next/cocos2d/deprecated.js

## Quick Start：Make your first game
- http://cocos2d-x.org/docs/creator/manual/en/getting-started/quick-start.html