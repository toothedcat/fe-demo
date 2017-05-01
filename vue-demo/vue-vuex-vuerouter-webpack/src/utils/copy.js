'use strict';
var TypeUtils = require('./type.js');
var isObject = TypeUtils.isObject;
var isArray = TypeUtils.isArray;

var clone = function(obj){
    if(!obj && 'object' !== typeof obj){
        return obj;
    }
    if(obj.clone && 'function' === typeof obj.clone){
        return obj.clone();
    }
    let c = isArray(obj) ? [] : {};
    for(let prop in obj){
        let val = obj[prop];
        if(val && 'object' === typeof val){
            c[prop] = clone(val);
        }else{
            c[prop] = val;
        }
    }
    return c;
};

var apply = function(target,source,deep,copyExistProperty){
    var i,len,keys,key;
    if(!isObject(source) && !isArray(source)){
        return target;
    }
    if(isObject(source)) { keys = Object.keys(source);}
    if(isArray(source)) { keys = source;}
    for(i=0,len = keys.length;i<len;i++){
        key = keys[i];
        if(deep && (isObject(source[key]) || isArray(source[key]))){
            if(isObject(source[key]) && !isObject(target[key])){
                target[key] = {};
            }
            if(isArray(source[key]) && !isArray(target[key])){
                target[key] = [];
            }
            apply(target[key],source[key]);
        }else if(source[key] !== 'undefined'){
            if(!copyExistProperty && target[key]) {continue;}
            target[key] = source[key];
        }
    }
    return target;
};

var applyIf = function(target,source,deep){
    return apply(target,source,deep,false);
};

module.exports = {
    clone:clone,
    apply:apply,
    applyIf:applyIf
};