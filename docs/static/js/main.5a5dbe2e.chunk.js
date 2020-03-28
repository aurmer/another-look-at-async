(this["webpackJsonpanother-look-at-async"]=this["webpackJsonpanother-look-at-async"]||[]).push([[0],{37:function(e,t,n){e.exports=n(49)},43:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(0),u=n.n(a),r=n(8),l=n.n(r),c=(n(42),n(43),n(23)),i=n(14),o=n(34),s=n(35),d=n(51),p="STARTED",m=function(e){return{y:Math.floor(e/6),x:e%6}};function E(e,t,n){"COMPLETED"===e&&"width"===n.propertyName&&t.updateEventStatus(e,n._dispatchInstances.key),e===p&&t.updateEventStatus(e,n._dispatchInstances.key)}var v=Object(c.b)((function(e){return{showModal:e.get("editEventDialog").get("isOpen"),selectedEvent:e.get("selectedEvent"),events:e.get("events"),myTest:e.get("myTest"),showEventValidationAlert:e.get("editEventDialog").get("formIsInvalid"),logText:e.get("logText")}}),{openEventDialog:function(e){return{type:"OPEN_EVENT_DIA",payload:{evtId:e}}},onHideModal:function(){return{type:"CLOSE_EVENT_DIA"}},saveEvent:function(e,t,n){return{type:"SAVE_EVENT",payload:{evtType:e,evtSucceed:t,evtTime:n}}},updateEventStatus:function(e,t){return{type:"UPDATE_EVENT",payload:{id:t,status:e}}},initSequence:function(){return{type:"INIT_SEQUENCE"}},resetRun:function(){return{type:"RESET_STATUS"}},clearAll:function(){return{type:"CLEAR_ALL"}}})((function(e){var t=m(e.selectedEvent),n=t.y,a=t.x,r=null!==e.selectedEvent?e.events.get(e.selectedEvent):null,l=r?r.get("type"):"",c=r?r.get("willSucceed"):"",v=r?r.get("time"):"",f=e.logText.split("|newline|").map((function(e,t){return[e,u.a.createElement("br",{key:t})]})).flat();return u.a.createElement(u.a.Fragment,null,u.a.createElement("h1",null,"Async Events Visualizer"),u.a.createElement("h2",null,"(eventually game?)"),u.a.createElement("p",{key:1},"This version doesn't have everything implemented, but it gives you a sense of the direction I am headed in. For this demo, only make 'ajax' events. Make some Succeed:true and some false and will take X seconds to complete."),u.a.createElement("p",{key:2},'Click a + sign in a box to start, when you stack events vertically, they run one after another, when you line them up horizontally, they all run at the same time. Let me know what you think! "I see what this can do, and I could see using it as a teaching tool if it had _______."'),u.a.createElement("div",{className:"event-grid"},function(e){return e.events.map((function(t,n){var a=m(n),r=a.y,l=a.x,c=t.get("isClickable")?e.openEventDialog.bind(null,n):null,i=t.get("isClickable")?"event enabled":"event",o=null!==t.get("type")?"".concat(t.get("type"),",").concat(t.get("willSucceed")?"t":"f",",").concat(t.get("time"),"s"):null,s=null===t.get("type")&&t.get("isClickable")?"+":null,v=t.get("status")===p||"COMPLETED"===t.get("status"),f=v?{transition:"width ".concat(t.get("time"),"s linear")}:{},g=t.get("willSucceed")?"progress pass":"progress fail";return u.a.createElement("div",{key:n,onClick:c,className:i,onTransitionEnd:E.bind(null,"COMPLETED",e)},u.a.createElement(d.a,{in:v,className:g,timeout:100},u.a.createElement("div",{className:"test",style:f})),u.a.createElement("div",{className:"add-event"},s),u.a.createElement("div",{className:"event-info"},o),u.a.createElement("div",{className:"coord-box"},"[",r,",",l,"]"))}))}(e)),u.a.createElement("button",{className:"start control",onClick:e.initSequence},"Start"),u.a.createElement("button",{className:"reset control",onClick:e.resetRun},"Reset Run"),u.a.createElement("button",{className:"clear control",onClick:e.clearAll},"Clear All"),u.a.createElement("p",{className:"faux-console-desc"},"Here is the console which will log the events start and stop times."),u.a.createElement("div",{className:"faux-console"},f),u.a.createElement(i.a,{show:e.showModal,onHide:e.onHideModal,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0},u.a.createElement(i.a.Header,{closeButton:!0},u.a.createElement(i.a.Title,{id:"contained-modal-title-vcenter"},"Create/Edit Event [",n,"][",a,"]")),u.a.createElement(i.a.Body,null,u.a.createElement(s.a,{variant:"primary",show:e.showEventValidationAlert},"Every field is required."),u.a.createElement("p",null,"Type of Event:",u.a.createElement("select",{className:"event-input",id:"eventTypeSelect",defaultValue:l},u.a.createElement("option",{value:""}),u.a.createElement("option",{value:"ajax"},"ajax"),u.a.createElement("option",{value:"catch"},"catch")),"Will it succeed?",u.a.createElement("select",{className:"event-input",id:"eventSucceedSelect",defaultValue:c},u.a.createElement("option",{value:""}),u.a.createElement("option",{value:"true"},"true"),u.a.createElement("option",{value:"false"},"false"))),u.a.createElement("p",null,"How long will it take?",u.a.createElement("input",{className:"event-input",id:"eventTimeInput",placeholder:"Integer in seconds",defaultValue:v}))),u.a.createElement(i.a.Footer,null,u.a.createElement(o.a,{onClick:function(){return function(e){var t=document.getElementById("eventTypeSelect").value,n=document.getElementById("eventSucceedSelect").value,a=document.getElementById("eventTimeInput").value;e.saveEvent(t,n,a)}(e)}},"Save"))))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var f=n(18),g=n(17),y=Object(g.b)({editEventDialog:Object(g.b)({isOpen:!1,formIsInvalid:!1}),logText:"",selectedEvent:null,startTimestamp:null,events:Object(g.a)(Array(24)).map((function(e,t){return function(e){var t=Object(g.b)({isClickable:!1,type:null,data:null,time:null,willSucceed:null,status:"UNSTARTED"});if(0===e)return t.update("isClickable",(function(){return!0}));return t}(t)}))});function T(e){return e.map((function(t,n){var a=t.get("type"),u=n<6,r=!u&&null!==e.get(n-6).get("type"),l=0===n||u&&null!==e.get(n-1).get("type");return a||r||l?t.update("isClickable",(function(){return!0})):t.update("isClickable",(function(){return!1}))}))}function h(e,t,n){var a=m(e),u=a.y,r=a.x,l=t===p?"started":"completed";return"> The event [".concat(u,",").concat(r,"] has ").concat(l," at ").concat(function(e){return Math.floor(((new Date).getTime()-e)/1e3)}(n)," seconds.|newline|")}var S=Object(f.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0,n=t.payload;switch(t.type){case"OPEN_EVENT_DIA":return e.update("editEventDialog",(function(e){return e.update("isOpen",(function(){return!0}))})).update("selectedEvent",(function(){return n.evtId}));case"CLOSE_EVENT_DIA":return e.update("selectedEvent",(function(){return null})).update("editEventDialog",(function(e){return e.update("isOpen",(function(){return!1})).update("formIsInvalid",(function(){return!1}))}));case"SAVE_EVENT":var a=parseInt(n.evtTime);return""===n.evtType||""===n.evtSucceed||isNaN(a)?e.update("editEventDialog",(function(e){return e.update("formIsInvalid",(function(){return!0}))})):e.update("editEventDialog",(function(e){return e.update("isOpen",(function(){return!1}))})).update("selectedEvent",(function(){return null})).update("events",(function(t){return T(t.update(e.get("selectedEvent"),(function(e){return e.update("type",(function(){return n.evtType})).update("willSucceed",(function(){return"true"===n.evtSucceed})).update("time",(function(){return a}))})))}));case"UPDATE_EVENT":var u=t.payload,r=parseInt(u.id),l=r<18?r+6:null,c=function(t){return null!==t&&null!==e.get("events").get(t).get("type")};if("COMPLETED"===u.status){var i=e.update("events",(function(e){return e.update(u.id,(function(e){return e.update("status",(function(){return"COMPLETED"}))}))})).update("logText",(function(t){return t+h(r,"COMPLETED",e.get("startTimestamp"))}));return c(l)?i.update("events",(function(e){return e.update(l,(function(e){return e.update("status",(function(){return p}))}))})).update("logText",(function(t){return t+h(l,p,e.get("startTimestamp"))})):i}if(u.status===p)return e.update("events",(function(e){return e.update(u.id,(function(e){return e.update("status",(function(){return p}))}))})).update("logText",(function(t){return t+h(u.id,p,e.get("startTimestamp"))}));break;case"INIT_SEQUENCE":var o=e.update("events",(function(e){return e.map((function(e,t){return t<6&&null!==e.get("type")?e.update("status",(function(){return p})):e}))})).update("startTimestamp",(function(){return(new Date).getTime()}));return o.update("logText",(function(e){return o.get("events").map((function(t,n){return t.get("status")===p?e+h(n,p,o.get("startTimestamp")):e})).join("")}));case"RESET_STATUS":return e.update("events",(function(e){return e.map((function(e){return e.update("status",(function(){return"UNSTARTED"}))}))})).update("logText",(function(){return""})).update("startTimestamp",(function(){return null}));case"CLEAR_ALL":return y;default:return e}})),w=document.getElementById("root");l.a.render(u.a.createElement(c.a,{store:S},u.a.createElement(v,null)),w),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[37,1,2]]]);
//# sourceMappingURL=main.5a5dbe2e.chunk.js.map