(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(7),o=n.n(c),s=(n(14),n(1)),l=n(2),i=n(4),u=n(3),m=n(5),d=(n(16),function(e){return r.a.createElement("div",{className:"TextCard "+e.type},r.a.createElement("div",{className:"Name"},r.a.createElement("b",null,e.name)),r.a.createElement("div",{className:"Content"},r.a.createElement("ul",null,e.content.map(function(e){return r.a.createElement("li",null,e)}))))}),p=function(e){function t(){var e,n;Object(s.a)(this,t);for(var a=arguments.length,r=new Array(a),c=0;c<a;c++)r[c]=arguments[c];return(n=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={cards:[],text:""},n.handleSubmit=function(e){e.preventDefault(),n.state.cards.push({name:"User",type:"Client",content:[n.state.text]}),document.getElementById("ChatForm").reset();var t=new XMLHttpRequest,a={name:"Nick Carraway",text:n.state.text};t.onload=function(){var e=JSON.parse(t.responseText);n.state.cards.push({name:e.name,type:"Server",content:e.result}),n.setState(n.state)},t.open("POST","http://127.1.0.0"),t.send(JSON.stringify(a))},n.handleChange=function(e){n.setState({text:e.target.value})},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"ChatBox"},r.a.createElement("div",{className:"TextCardList"},this.state.cards.slice(-6).map(function(e){return r.a.createElement(d,e)})),r.a.createElement("form",{id:"ChatForm",onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",value:this.state.text,onChange:this.handleChange,required:!0}),r.a.createElement("button",{type:"submit"},"Send")))}}]),t}(a.Component),h=(n(17),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"person_simulator"),r.a.createElement("p",null,"An app designed to simulate people.")),r.a.createElement(p,null))}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(19)}},[[8,2,1]]]);
//# sourceMappingURL=main.dbafed73.chunk.js.map