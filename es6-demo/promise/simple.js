let promise = new Promise(function(resolve,reject){
  console.log('Promise process immediately');
  //resolve('resolve promise');
  reject('reject promise');
});

promise.then(function(value){
  console.log(value);
},function(value){
  console.log(value);
});

promise.then(function(value){
  console.log(value);
},function(value){
  console.log(value);
});

