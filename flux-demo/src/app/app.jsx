require("root/css/page.css");

var React = require('react');

var HelloComponent = React.createClass({
  render:function(){
    return (
      <div>
        <div className="logo"></div>
        <h1>使用Webpack打包React</h1>
        <p>React很好用</p>
        <p>webpack棒棒的</p>
        <p>react-hot-loader实现热插拔是很好的</p>
        <img src={require("../images/react.png")} alt=""/>
      </div>
    );
  }
});

module.exports = HelloComponent;