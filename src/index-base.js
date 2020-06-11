import {version as Version} from './../package.json'
import Objects from './objects/ObjectsBase.js'
import Util from './objects/Util.js'
import Easing from './easing/easing-base.js'
import Internals from './core/Internals.js'
import Render from './core/Render.js'
import Selector from './util/selector.js'
import Interpolate from './objects/Interpolate.js'

import Animation from './animation/animationBase.js'

// TweenConstructor
import TweenBase from './tween/tweenBase.js'
// Interface only fromTo
import fromTo from './interface/fromTo.js'

import {baseTransformOps} from './components/transformFunctions.js'
import {baseBoxModelOps} from './components/boxModel.js'
import {baseOpacityOps} from './components/opacityProperty.js'
// import {baseCrossBrowserMoveOps} from './components/crossBrowserMove.js'

const BaseTransform = new Animation(baseTransformOps)
const BaseBoxModel = new Animation(baseBoxModelOps)
const BaseOpacity = new Animation(baseOpacityOps)
// const BaseCrossBrowserMove = new Animation(baseCrossBrowserMoveOps)
// support for kute-base.js ends here

export default {
  Animation,
  Components: {
    BaseTransform,
    BaseBoxModel,
    BaseScroll,
    BaseOpacity,
    // BaseCrossBrowserMove
  },

  TweenBase,
  fromTo, 

  Objects,
  Easing,
  Util,
  Render,
  Interpolate,
  Internals,
  Selector,
  Version
}