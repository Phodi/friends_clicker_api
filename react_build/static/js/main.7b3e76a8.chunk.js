(this.webpackJsonpweb_game=this.webpackJsonpweb_game||[]).push([[0],{62:function(e,t,a){e.exports=a(96)},67:function(e,t,a){},76:function(e,t,a){},77:function(e,t,a){},95:function(e,t,a){},96:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(32),o=a(18),l=a(6),c=a(7),i=a(8),u=a(9),m=a(19),d=(a(67),a(68),a(59)),p=a(54),g=a(30),h=a.n(g),E=a(38),b=a(60),v=a(28),f=a(39),k=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).login=Object(E.a)(h.a.mark((function e(){var t,a,s,r,o,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.props.session.axios,a=n.state.credentials,s=a.email,r=a.password,n.setState({processing:!0}),o=null,e.prev=4,e.next=7,t.post("/users/me/login",{email:s,password:r});case 7:if(!(o=e.sent).data.token){e.next=13;break}return e.next=11,t.get("/users/me",{headers:{Authorization:o.data.token}});case 11:l=e.sent,n.props.setSession({user:l.data.user,credentials:n.state.credentials,token:o.data.token,loggedIn:!0});case 13:e.next=19;break;case 15:e.prev=15,e.t0=e.catch(4),o=e.t0,console.log("error :",e.t0);case 19:return e.prev=19,o.data.error&&console.log("error :",o.data.error),o.data.msg&&console.log("msg :",o.data.msg),n.setState({processing:!1}),e.finish(19);case 24:case"end":return e.stop()}}),e,null,[[4,15,19,24]])}))),n.logout=Object(E.a)(h.a.mark((function e(){var t,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.props.session.axios,n.setState({processing:!0}),a=null,e.prev=3,e.next=6,t.get("/users/me/logout");case 6:(a=e.sent).data.token&&n.props.setSession({loggedIn:!1}),e.next=14;break;case 10:e.prev=10,e.t0=e.catch(3),a=e.t0,console.log("error :",e.t0);case 14:return e.prev=14,a.data.error&&console.log("error :",a.data.error),a.data.msg&&console.log("msg :",a.data.msg),n.setState({processing:!1}),e.finish(14);case 19:case"end":return e.stop()}}),e,null,[[3,10,14,19]])}))),n.fieldChanged=function(e){n.setState({credentials:Object.assign(n.state.credentials,Object(p.a)({},e.target.name,e.target.value))})},n.state={processing:!1,credentials:{email:"",password:""}},n}return Object(c.a)(a,[{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){return this.state.processing?s.a.createElement("div",null,this.props.session.loggedIn?"Logging out":"Logging in"):this.props.session.loggedIn?s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col"},this.props.session.user.name),s.a.createElement("div",{className:"col"},s.a.createElement(f.a,{onClick:this.logout},"Logout"))):s.a.createElement(b.a,{inline:!0},s.a.createElement(v.a,{name:"email",type:"email",placeholder:"email",className:"mr-sm-2",onChange:this.fieldChanged}),s.a.createElement(v.a,{name:"password",type:"password",placeholder:"password",className:"mr-sm-2",onChange:this.fieldChanged}),s.a.createElement(f.a,{variant:"outline-info",onClick:this.login},"Login"))}}]),a}(n.Component),w=a(42),y=a(61),O=a(25),j=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement(w.a,{sticky:"top"},s.a.createElement(w.a.Brand,{href:"#home"},s.a.createElement("img",{src:"img/logo.jpg"})),s.a.createElement(y.a,{className:"mr-auto"},s.a.createElement(O.a,null,s.a.createElement(o.b,{to:"/"},"HOME")),s.a.createElement(O.a,null,s.a.createElement(o.b,{to:"/play"},"PLAY")),s.a.createElement(O.a,null,s.a.createElement(o.b,{to:"#"},"SCOREBOARD")),s.a.createElement(O.a,null,s.a.createElement(o.b,{to:"/about"},"OUR TEAM"))),s.a.createElement(k,{session:this.props.session,setSession:this.props.setSession}))}}]),a}(n.Component),S=a(22),N=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={},n}return Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{id:"slider"},s.a.createElement(S.a,null,s.a.createElement(S.a.Item,null,s.a.createElement("img",{className:"d-block w-100",src:"./img/banner1.jpg",alt:"How To Make Friend"}),s.a.createElement(S.a.Caption,null,s.a.createElement("h5",null,"How To Make Friend"))),s.a.createElement(S.a.Item,null,s.a.createElement("img",{className:"d-block w-100",src:"./img/banner2.jpg",alt:"How To Make Best Friend"}),s.a.createElement(S.a.Caption,null,s.a.createElement("h5",null,"How To Make Best Friend"))),s.a.createElement(S.a.Item,null,s.a.createElement("img",{className:"d-block w-100",src:"./img/banner3.jpg",alt:"How To Make Boy Friend"}),s.a.createElement(S.a.Caption,null,s.a.createElement("h5",null,"How To Make Boy Friend")))))}}]),a}(n.Component),x=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={},n}return Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement("section",{id:"about"},s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"row"},s.a.createElement("div",{className:"col-md-6"},s.a.createElement("h2",null,"About Us"),s.a.createElement("div",{className:"about-content"},"These scars long have yearned for your tender caress To bind our fortunes, damn what the stars own Rend my heart open, then your love profess A winding, weaving fate to which we both atone"),s.a.createElement("button",{type:"button",className:"btn btn-primary"},"Read more>>")),s.a.createElement("div",{className:"col-md-6"},s.a.createElement("p",null,"Easy To Play"),s.a.createElement("div",{className:"progress"},s.a.createElement("div",{className:"progress-bar",style:{width:"80%"}},"\u2665 \u2665 \u2665 \u2665")),s.a.createElement("p",null,"Do Not Always Online"),s.a.createElement("div",{className:"progress"},s.a.createElement("div",{className:"progress-bar",style:{width:"60%"}},"\u2665 \u2665 \u2665")),s.a.createElement("p",null,"Keep Your Score Forever"),s.a.createElement("div",{className:"progress"},s.a.createElement("div",{className:"progress-bar",style:{width:"100%"}},"\u2665 \u2665 \u2665 \u2665 \u2665"))))))}}]),a}(n.Component),C=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{style:{width:"100%"}},s.a.createElement(N,null),s.a.createElement(x,null))}}]),a}(n.Component),T=(a(76),function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).showStates=function(){console.log("Hello World!"),console.log("message is "+n.state.message),console.log("luckyNumber is "+n.state.luckyNumber)},n.editStates=function(){n.setState({message:"KUY",luckyNumber:69})},n.addExp=function(){n.state.exp+=1,n.calcLevel(),n.drawText()},n.calcLevel=function(){n.state.exp>=100&&(n.state.level=parseInt(n.state.exp/100)),n.drawText()},n.drawText=function(){var e=document.getElementById("myCanvas").getContext("2d");e.clearRect(0,0,900,500),e.font="30px Arial",e.fillText("EXP :",10,50),e.fillText(n.state.exp,90,50),e.fillText("Lv.",150,50),e.fillText(n.state.level,190,50)},n.state={message:"SATAN",luckyNumber:666,exp:0,level:1},n}return Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("body",null,s.a.createElement("div",{id:"canvas-container"},s.a.createElement("canvas",{id:"myCanvas",width:"900",height:"500"}))),s.a.createElement("button",{onClick:this.showStates},"Run showStates()")," ",s.a.createElement("button",{onClick:this.editStates},"Run editStates()"),s.a.createElement("button",{onClick:this.addExp},"AddExp()"))}}]),a}(n.Component)),A=(a(77),function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).showStates=function(){console.log("Hello World!"),console.log("message is "+n.state.message),console.log("luckyNumber is "+n.state.luckyNumber)},n.editStates=function(){n.setState({message:"KUY",luckyNumber:69})},n.state={message:"SATAN",luckyNumber:666},n}return Object(c.a)(a,[{key:"render",value:function(){return s.a.createElement("div",null,"Hello World!",s.a.createElement("button",{onClick:this.showStates},"Run showStates()")," ",s.a.createElement("button",{onClick:this.editStates},"Run editStates()"))}}]),a}(n.Component)),R=a(58),H=a.n(R),I=function(e){Object(u.a)(a,e);var t=Object(i.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).setSession=function(e){n.setState({session:Object.assign(n.state.session,e)}),n.state.session.axios.defaults.headers.common.Authorization=n.state.session.token},n.state={session:{axios:H.a.create({baseURL:"https://cpe-clicker-api.herokuapp.com/api",validateStatus:function(e){return e<500}}),loggedIn:!1,credentials:{email:"",password:""},token:"",user:{_id:"",name:"",emai:"",stats:{}}}},n}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return s.a.createElement(m.c,null,s.a.createElement(d.a,{fluid:!0,className:"m-0 p-0"},s.a.createElement(j,{session:this.state.session,setSession:this.setSession}),s.a.createElement("div",{className:"content"},s.a.createElement(m.a,{exact:!0,path:"/",render:function(){return s.a.createElement(C,{session:e.state.session,setSession:e.setSession})}}),s.a.createElement(m.a,{exact:!0,path:"/play",render:function(){return s.a.createElement(T,{session:e.state.session,setSession:e.setSession})}}),s.a.createElement(m.a,{exact:!0,path:"/about",render:function(){return s.a.createElement(A,{session:e.state.session,setSession:e.setSession})}}))))}}]),a}(n.Component);a(95);Object(r.render)(s.a.createElement(o.a,null,s.a.createElement(I,null)),document.querySelector("#root"))}},[[62,1,2]]]);
//# sourceMappingURL=main.7b3e76a8.chunk.js.map