(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,t,a){},16:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},17:function(e,t,a){},19:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),s=a.n(c),o=(a(14),a(1)),i=a(2),l=a(4),m=a(3),u=a(5);a(16);function d(e,t,a,n){var r=new XMLHttpRequest;r.onload=function(){n(r.responseText)},r.open(t,e),r.send(JSON.stringify(a))}var p=d,h="http://127.1.0.0",v=function(e){return r.a.createElement("div",{className:"TextCard "+e.type},r.a.createElement("div",{className:"Name"},r.a.createElement("b",null,e.name)),r.a.createElement("div",{className:"Content"},e.content.map(function(e){return r.a.createElement("p",{className:"Text"},e)})))},f=function(e){function t(){var e,a;Object(o.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={cards:[],names:[],name:"",text:""},a.handleSubmit=function(e){e.preventDefault(),a.state.cards.push({name:"User",type:"Client",content:[a.state.text]}),document.getElementById("ChatForm").reset();var t={name:"Nick Carraway",text:a.state.text};p(h,"POST",t,function(e){var t=JSON.parse(e);a.state.cards.push({name:t.name,type:"Server",content:t.result}),a.setState(a.state)})},a.handleNameChange=function(e){a.setState({name:e.target.value})},a.handleTextChange=function(e){a.setState({text:e.target.value})},a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"ChatBox"},r.a.createElement("div",{className:"TextCardList"},this.state.cards.slice(-6).map(function(e){return r.a.createElement(v,e)})),r.a.createElement("form",{id:"ChatForm",onSubmit:this.handleSubmit},r.a.createElement("select",{type:"text",value:this.state.name,onChange:this.handleNameChange,required:!0},this.props.names.map(function(t){return r.a.createElement("option",{value:e.state.name},t)})),r.a.createElement("input",{type:"text",value:this.state.text,onChange:this.handleTextChange,required:!0}),r.a.createElement("button",{type:"submit"},"Send")))}}]),t}(n.Component),E=(a(17),function(e){function t(e){var a;return Object(o.a)(this,t),a=Object(l.a)(this,Object(m.a)(t).call(this,e)),d(),a}return Object(u.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"person_simulator"),r.a.createElement("p",null,"An app designed to simulate people.")),r.a.createElement(f,null))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,t,a){e.exports=a(19)}},[[8,2,1]]]);
//# sourceMappingURL=main.581cd99d.chunk.js.map