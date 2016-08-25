var classNames = require("classnames");


console.log(classNames("foo","bar"));
console.log(classNames("foo",{"bar":true}));
console.log(classNames({"foo":false},{"bar":true}));
console.log(classNames(null,false,0,"",1,true))