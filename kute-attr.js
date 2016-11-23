/* KUTE.js - The Light Tweening Engine
 * package - Attributes Plugin
 * desc - enables animation for any numeric presentation attribute
 * by dnp_theme
 * Licensed under MIT-License
 */

(function (root,factory) {
  if (typeof define === 'function' && define.amd) {
    define(['kute.js'], factory);
  } else if(typeof module == 'object' && typeof require == 'function') {
    module.exports = factory(require('kute.js'));
  } else if ( typeof root.KUTE !== 'undefined' ) {
    factory(root.KUTE);
  } else {
    throw new Error("Attributes Plugin require KUTE.js.");
  }
}(this, function (KUTE) {
  'use strict';

  var g = typeof global !== 'undefined' ? global : window, K = KUTE, DOM = g.dom, prepareStart = K.prepareStart, parseProperty = K.parseProperty,
    unit = g._unit, number = g._number, color = g._color,
    getCurrentValue = function(e,a){ return e.getAttribute(a); }, // get current attribute value
    svgColors = ['fill','stroke','stop-color'], trueColor = K.truC, trueDimension = K.truD, atts,
    replaceUppercase = function(a) {
      return a.replace(/[A-Z]/g, "-$&").toLowerCase();
    }; 
  
  prepareStart['attr'] = function(el,p,v){
    var attsStartValues = {};
    for (var a in v){
      var attribute = replaceUppercase(a).replace(/_+[a-z]+/,''),
        currentValue = getCurrentValue(el,attribute); // get the value for 'fill-opacity' not fillOpacity
      attsStartValues[attribute] = svgColors.indexOf(replaceUppercase(a)) !== -1 ? (currentValue || 'rgba(0,0,0,0)') : (currentValue || (/opacity/i.test(a) ? 1 : 0));
    }
    return attsStartValues;
  };
  
  // process attributes object K.pp.attr(t[x]) 
  // and also register their render functions
  parseProperty['attr'] = function(a,o,l){
    if (!('attr' in DOM)) {
      DOM.attr = function(l,p,a,b,v) {
        for ( var o in b ){
          DOM.attributes[o](l,o,a[o],b[o],v);
        }
      }
      atts = DOM.attributes = {}
    }

    var ats = {};
    for ( var p in o ) {
      var prop = replaceUppercase(p), cv = getCurrentValue(l,prop.replace(/_+[a-z]+/,''));
      if ( svgColors.indexOf(prop) === -1 && (/(%|[a-z]+)$/.test(o[p]) || /(%|[a-z]+)$/.test(cv)) ) {
        var u = trueDimension(cv).u || trueDimension(o[p]).u, s = /%/.test(u) ? '_percent' : '_'+u;
        if (!(prop+s in atts)) {
          atts[prop+s] = function(l,p,a,b,v) {
            l.setAttribute(p.replace(s,''), unit(a.v,b.v,b.u,v) );
          }
        }
        ats[prop+s] = trueDimension(o[p]);       
      } else if ( svgColors.indexOf(prop) > -1 ) {
        if (!(prop in atts)) {
          atts[prop] = function(l,u,a,b,v) {
            l.setAttribute(u, color(a,b,v,o.keepHex));
          }
        }
        ats[prop] = trueColor(o[p]);
      } else {
        if (!(prop in atts)) {
          atts[prop] = function(l,o,a,b,v) {
            l.setAttribute(o, number(a,b,v));
          }
        }
        ats[prop] = parseFloat(o[p]);     
      }
    }
    return ats;
  }

}));