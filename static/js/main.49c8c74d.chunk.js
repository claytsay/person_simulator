(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(7),c=n.n(o),l=(n(14),n(1)),s=n(2),i=n(4),u=n(3),m=n(5),p=(n(16),function(e){return r.a.createElement("div",{className:"TextCard "+e.type},r.a.createElement("div",{className:"Name"},r.a.createElement("b",null,e.name)),r.a.createElement("div",{className:"Content"},r.a.createElement("ul",null,e.content.map(function(e){return r.a.createElement("li",null,e)}))))}),d=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={cards:[{name:"Boberto",type:"Client",content:["1 banana,","2 banana,","3 banana!"]},{name:"Roberto",type:"Server",content:["I really like bananas."]}],text:""},n.handleSubmit=function(e){e.preventDefault();var t=new XMLHttpRequest,a={name:"Nick Carraway",text:n.state.text};t.onload=function(){var e=JSON.parse(t.responseText);n.props.cards.push({name:e.name,type:"Server",content:e.result}),console.log(t.response)},t.open("POST","http://127.1.0.0"),t.send(JSON.stringify(a))},n.handleChange=function(e){n.setState({text:e.target.value})},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"ChatBox"},r.a.createElement("div",{className:"TextCardList"},this.props.cards.reverse().map(function(e){return r.a.createElement(p,e)})),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",value:this.state.text,onChange:this.handleChange,required:!0}),r.a.createElement("button",{type:"submit"},"Send")))}}]),t}(a.Component),h=(n(17),function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"person_simulator"),r.a.createElement("p",null,"An app designed to simulate people.")),r.a.createElement(d,null))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(19)}},[[8,2,1]]]);
//# sourceMappingURL=main.49c8c74d.chunk.js.map