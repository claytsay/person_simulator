(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},17:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(7),c=n.n(o),l=(n(14),n(1)),s=n(2),i=n(4),u=n(3),m=n(5),p=(n(16),new XMLHttpRequest),d="http://127.1.0.0",h=function(e){return r.a.createElement("div",{className:"TextCard "+e.type},r.a.createElement("div",{className:"Name"},r.a.createElement("b",null,e.name)),r.a.createElement("div",{className:"Content"},e.content.map(function(e){return r.a.createElement("p",{className:"Text"},e)})))},f=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={cards:[],names:[],text:""},n.handleSubmit=function(e){e.preventDefault(),n.state.cards.push({name:"User",type:"Client",content:[n.state.text]}),document.getElementById("ChatForm").reset(),function(e,t,n){p.onload=n,p.open(e,d),p.send(JSON.stringify(t))}("POST",{name:"Nick Carraway",text:n.state.text},function(){var e=JSON.parse(p.responseText);n.state.cards.push({name:e.name,type:"Server",content:e.result}),n.setState(n.state)})},n.handleChange=function(e){n.setState({text:e.target.value})},n}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"ChatBox"},r.a.createElement("div",{className:"TextCardList"},this.state.cards.slice(-6).map(function(e){return r.a.createElement(h,e)})),r.a.createElement("form",{id:"ChatForm",onSubmit:this.handleSubmit},r.a.createElement("input",{type:"text",value:this.state.text,onChange:this.handleChange,required:!0}),r.a.createElement("select",null,r.a.createElement("option",null,"Lolololol"),r.a.createElement("option",null,"Hehehehehe"),r.a.createElement("option",null,"santehuoteu")),r.a.createElement("button",{type:"submit"},"Send")))}}]),t}(a.Component);n(17);var E=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"person_simulator"),r.a.createElement("p",null,"An app designed to simulate people.")),r.a.createElement(f,null))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,n){e.exports=n(19)}},[[8,2,1]]]);
//# sourceMappingURL=main.bc337ed7.chunk.js.map