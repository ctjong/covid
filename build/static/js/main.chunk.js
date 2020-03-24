(this.webpackJsonpcovid19=this.webpackJsonpcovid19||[]).push([[0],{155:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(46),s=a.n(c);a(57),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i,o,u=a(29),l=a(2),h=a.n(l),b=a(8),f=a(3),m=a(18),p=a(19),v=a(50),d=a(51),y=(a(59),"number of cases"),w="number of deaths",T="nytimes",x="stateCases",k="stateDeaths",S="countyCases",g=(i={},Object(f.a)(i,x,{title:"Number of cases in the US by states",buttonText:"Number of cases in the US by states",buttonClass:"btn-primary",srcLink:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",srcText:"New York Times",chartLabel:y,color:"54, 162, 235",timeClass:"nytimes-time"}),Object(f.a)(i,k,{title:"Number of deaths in the US by states",buttonText:"Number of deaths in the US by states",buttonClass:"btn-warning",srcLink:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",srcText:"New York Times",chartLabel:w,color:"255, 206, 86",timeClass:"nytimes-time"}),Object(f.a)(i,S,{title:"Number of cases in the US by counties (only showing the top 100)",buttonText:"Number of cases in the US by counties",buttonClass:"btn-danger",srcLink:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",srcText:"New York Times",chartLabel:y,color:"255, 99, 132",timeClass:"nytimes-time"}),i),C=[{dataSource:T,args:{tableClass:"svelte-1k3kd4i",targetTabNames:[x,k]}},{dataSource:T,args:{tableClass:"svelte-ffcf53",targetTabNames:[S]}}],O=(o={},Object(f.a)(o,x,(function(e){return{name:e[0].innerText,value:parseInt(e[1].innerText.replace(/,/,""))}})),Object(f.a)(o,k,(function(e){return{name:e[0].innerText,value:parseInt(e[2].innerText.replace(/,/,""))}})),Object(f.a)(o,S,(function(e){return{name:e[0].innerText+"/"+e[1].innerText,value:parseInt(e[2].innerText.replace(/,/,""))}})),o),j=function(){function e(){Object(m.a)(this,e)}return Object(p.a)(e,[{key:"retrieveData",value:function(e){var t=this,a={};return e.targetTabNames.forEach((function(e){a[e]={updateTime:document.querySelector(".css-wcxsge").innerHTML.replace("\x3c!-- --\x3e",""),entries:[]}})),new Promise((function(n){t._loadSourceTable(e.tableClass).then((function(){t._parseSourceTable(a,e.tableClass,e.targetTabNames).then((function(){n(a)}))}))}))}},{key:"_loadSourceTable",value:function(e){return new Promise((function(t){var a=setInterval((function(){var n=document.querySelector("button.".concat(e));n&&(clearInterval(a),n.click(),t())}),1e3)}))}},{key:"_parseSourceTable",value:function(e,t,a){return new Promise((function(n){var r=setInterval((function(){var c=document.querySelectorAll("tbody tr.".concat(t));c.length>10&&(clearInterval(r),c.forEach((function(t){a.forEach((function(a){var n=O[a](t.querySelectorAll("td"));e[a].entries.push(n)}))})),n())}),1e3)}))}}]),e}(),E=a(47),N=a(49),I=a.n(N),L=function(e){Object(d.a)(a,e);var t=Object(v.a)(a);function a(e){var n;return Object(m.a)(this,a),(n=t.call(this,e)).searchInputRef=void 0,n.parsers=Object(f.a)({},T,new j),n.loadAllData(),n.searchInputRef=r.a.createRef(),n.state={allData:null,allCharts:{},activeTabName:Object.keys(g)[0],searchKeyword:null},n}return Object(p.a)(a,[{key:"loadAllData",value:function(){var e=this,t=0,a=[];new Promise((function(n){C.forEach((function(r){t++,e.parsers[r.dataSource].retrieveData(r.args).then(function(){var e=Object(b.a)(h.a.mark((function e(r){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.push(r),--t<=0&&n();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))})).then(Object(b.a)(h.a.mark((function t(){var n;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n={},a.forEach((function(e){return n=Object(u.a)({},n,{},e)})),t.next=4,e.setState({allData:n});case 4:return t.next=6,e.updateTab(e.state.activeTabName);case 6:case"end":return t.stop()}}),t)}))))}},{key:"updateTab",value:function(){var e=Object(b.a)(h.a.mark((function e(t){var a,n,r,c,s,i=this;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(u.a)({},this.state.allCharts),n=this.state.allData[t],(r=this.state.searchKeyword?n.entries.filter((function(e){return e.name.toLowerCase().indexOf(i.state.searchKeyword)>=0})):n.entries).sort((function(e,t){return t.value-e.value})),c=r.reduce((function(e,t){return e+t.value}),0),document.getElementById("".concat(t,"-total")).innerHTML="Total: ".concat(c),s=r.slice(0,100),a[t]={labels:s.map((function(e){return e.name})),datasets:[{label:g[t].chartLabel,data:s.map((function(e){return e.value})),backgroundColor:"rgba(".concat(g[t].color,", 0.2)"),borderColor:"rgba(".concat(g[t].color,", 1)"),borderWidth:1}]},e.next=10,this.setState({allCharts:a});case 10:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setActiveTab",value:function(){var e=Object(b.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.searchInputRef.current.text="",e.next=3,this.setState({searchKeyword:"",activeTabName:t});case 3:return e.next=5,this.updateTab(this.state.activeTabName);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"applySearch",value:function(){var e=Object(b.a)(h.a.mark((function e(){var t,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.searchInputRef.current,this.state.allData){e.next=4;break}return t.value="",e.abrupt("return");case 4:return a=t.value.trim().toLowerCase(),e.next=7,this.setState({searchKeyword:a});case 7:return e.next=9,this.updateTab(this.state.activeTabName);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"clearSearch",value:function(){var e=Object(b.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.searchInputRef.current.value="",e.next=4,this.setState({searchKeyword:""});case 4:return e.next=6,this.updateTab(this.state.activeTabName);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;if(!this.state.activeTabName||!this.state.allData)return null;var t=this.state.activeTabName,a=g[t],n=this.state.allCharts[t];return r.a.createElement("div",{className:"app"},r.a.createElement("div",null,Object.keys(g).map((function(t){return r.a.createElement("button",{key:t,type:"button",className:"btn ".concat(g[t].buttonClass),onClick:function(){return e.setActiveTab(t)}},g[t].buttonText)}))),r.a.createElement("div",{id:"search",style:{marginTop:"20px"}},r.a.createElement("input",{type:"text",id:"search-text",ref:this.searchInputRef}),r.a.createElement("button",{type:"button",onClick:function(){return e.applySearch()}},"Search"),r.a.createElement("button",{type:"button",onClick:function(){return e.clearSearch()}},"Clear")),r.a.createElement("div",null,r.a.createElement("h2",null,a.title),r.a.createElement("div",null,"Source: ",r.a.createElement("a",{target:"_blank",href:a.srcLink},a.srcText)),r.a.createElement("div",null,this.state.allData[t].updateTime),r.a.createElement("div",{id:"".concat(t,"-total")}),n?r.a.createElement(E.a,{data:this.state.allCharts[t],width:1500,height:2e3,options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]},plugins:{datalabels:{anchor:"end",align:"end"}}},plugins:[I.a]}):null))}}]),a}(r.a.Component);s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},52:function(e,t,a){e.exports=a(155)},57:function(e,t,a){},59:function(e,t,a){}},[[52,1,2]]]);
//# sourceMappingURL=main.chunk.js.map