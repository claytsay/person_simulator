(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},17:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},18:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(7),o=a.n(s),c=(a(15),a(8)),i=a(1),l=a(2),u=a(4),m=a(3),p=a(5);a(17);function h(e,t,a,n){var r=new XMLHttpRequest;r.onload=function(){n(r.responseText)},r.open(t,e),r.send(JSON.stringify(a))}var d=h,v=function(e){return r.a.createElement("div",{className:"TextCard "+e.type},r.a.createElement("div",{className:"Name"},r.a.createElement("b",null,e.name)),r.a.createElement("div",{className:"Content"},e.content.map(function(e){return r.a.createElement("p",{className:"Text"},e)})))},f=function(e){function t(){var e,a;Object(i.a)(this,t);for(var n=arguments.length,r=new Array(n),s=0;s<n;s++)r[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={cards:[],names:[],name:"",text:""},a.handleSubmit=function(e){e.preventDefault(),a.state.cards.push({name:"User",type:"Client",content:[a.state.text]}),a.setState({text:""});var t={name:a.state.name,text:a.state.text};d(a.props.url,"POST",t,function(e){var t=JSON.parse(e);a.state.cards.push({name:t.name,type:"Server",content:t.result}),a.setState(a.state)})},a.handleNameChange=function(e){a.setState({name:e.target.value})},a.handleTextChange=function(e){a.setState({text:e.target.value})},a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"ChatBox"},r.a.createElement("div",{className:"TextCardList"},this.state.cards.slice(-6).map(function(e){return r.a.createElement(v,e)})),r.a.createElement("form",{id:"ChatForm",onSubmit:this.handleSubmit},r.a.createElement("select",{type:"text",value:this.state.name,onChange:this.handleNameChange,required:!0},this.props.names.map(function(e){return r.a.createElement("option",{value:e},e)})),r.a.createElement("input",{type:"text",value:this.state.text,onChange:this.handleTextChange,required:!0}),r.a.createElement("button",{type:"submit"},"Send")))}}]),t}(n.Component),E=(a(18),function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(u.a)(this,Object(m.a)(t).call(this,e))).props.names=[],a.props.url="http://127.1.0.0",h(a.props.url,"GET","",function(e){var t;(t=a.props.names).push.apply(t,Object(c.a)(JSON.parse(e)))}),a}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"person_simulator"),r.a.createElement("p",null,"An app designed to simulate people.")),r.a.createElement(f,{names:this.props.names,url:this.props.url}))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a(20)}},[[9,2,1]]]);
//# sourceMappingURL=main.ee3461c7.chunk.js.map