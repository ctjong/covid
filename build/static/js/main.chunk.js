(this.webpackJsonpcovid19=this.webpackJsonpcovid19||[]).push([[0],{167:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(10),s=a.n(c);a(67),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i,o,u=a(2),l=a.n(u),h=a(35),m=a(9),f=a(3),b=a(23),d=a(24),v=a(59),p=a(60),w=(a(69),"nytimes"),y="stateCases",T="stateDeaths",k="countyCases",x=(i={},Object(f.a)(i,y,{title:"Number of cases in the US by states",buttonText:"Number of cases in the US by states",srcLink:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",srcText:"New York Times",chartLabel:"number of cases by states",color:"54, 162, 235",timeClass:"nytimes-time",timeline:!1}),Object(f.a)(i,T,{title:"Number of deaths in the US by states",buttonText:"Number of deaths in the US by states",srcLink:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",srcText:"New York Times",chartLabel:"number of deaths by states",color:"255, 206, 86",timeClass:"nytimes-time",timeline:!1}),Object(f.a)(i,k,{title:"Number of cases in the US by counties (only showing the top 100)",buttonText:"Number of cases in the US by counties",srcLink:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",srcText:"New York Times",chartLabel:"number of cases by counties",color:"255, 99, 132",timeClass:"nytimes-time",timeline:!1}),i),g=[{dataSource:w,args:{tableClass:"svelte-1k3kd4i",targetTabNames:[y,T]}},{dataSource:w,args:{tableClass:"svelte-ffcf53",targetTabNames:[k]}}],S=(o={},Object(f.a)(o,y,(function(e){return{name:e[0].innerText,value:parseInt(e[1].innerText.replace(/,/,""))}})),Object(f.a)(o,T,(function(e){return{name:e[0].innerText,value:parseInt(e[2].innerText.replace(/,/,""))}})),Object(f.a)(o,k,(function(e){return{name:e[0].innerText+"/"+e[1].innerText,value:parseInt(e[2].innerText.replace(/,/,""))}})),o),C=function(){function e(){Object(b.a)(this,e)}return Object(d.a)(e,[{key:"retrieveData",value:function(e){var t=this,a={};return e.targetTabNames.forEach((function(e){a[e]={updateTime:document.querySelector(".css-wcxsge").innerHTML.replace("\x3c!-- --\x3e",""),records:[{time:"default",entries:[]}]}})),new Promise((function(n){t._loadSourceTable(e.tableClass).then((function(){t._parseSourceTable(a,e.tableClass,e.targetTabNames).then((function(){n(a)}))}))}))}},{key:"_loadSourceTable",value:function(e){return new Promise((function(t){var a=setInterval((function(){var n=document.querySelector("button.".concat(e));n&&(clearInterval(a),n.click(),t())}),1e3)}))}},{key:"_parseSourceTable",value:function(e,t,a){return new Promise((function(n){var r=setInterval((function(){var c=document.querySelectorAll("tbody tr.".concat(t));c.length>10&&(clearInterval(r),c.forEach((function(t){a.forEach((function(a){var n=S[a](t.querySelectorAll("td"));e[a].records[0].entries.push(n)}))})),n())}),1e3)}))}}]),e}(),O=a(52),j=a(54),E=a.n(j),N=a(182),I=function(e){Object(p.a)(a,e);var t=Object(v.a)(a);function a(e){var n;return Object(b.a)(this,a),(n=t.call(this,e)).searchInputRef=void 0,n.parsers=Object(f.a)({},w,new C),n.loadAllData(),n.searchInputRef=r.a.createRef(),n.state={allData:null,allCharts:{},activeTabName:Object.keys(x)[0],searchKeyword:null},n}return Object(d.a)(a,[{key:"loadAllData",value:function(){var e=this,t=0,a={};new Promise((function(n){g.forEach((function(r){t++,e.parsers[r.dataSource].retrieveData(r.args).then(function(){var e=Object(m.a)(l.a.mark((function e(r){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(h.a)({},a,{},r),--t<=0&&n();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))})).then(Object(m.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.setState({allData:a});case 2:return t.next=4,e.updateTab(e.state.activeTabName);case 4:case"end":return t.stop()}}),t)}))))}},{key:"updateTab",value:function(){var e=Object(m.a)(l.a.mark((function e(t){var a,n,r,c,s,i,o,u=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(h.a)({},this.state.allCharts),n=this.state.allData[t],c=(r=x[t]).timeline?n.records[0]:n.records[n.records.length-1],(s=this.state.searchKeyword?c.entries.filter((function(e){return e.name.toLowerCase().indexOf(u.state.searchKeyword)>=0})):c.entries).sort((function(e,t){return t.value-e.value})),i=s.reduce((function(e,t){return e+t.value}),0),document.getElementById("".concat(t,"-total")).innerHTML="Total: ".concat(i),o=s.slice(0,100),a[t]={labels:o.map((function(e){return e.name})),datasets:[{label:r.chartLabel,data:o.map((function(e){return e.value})),backgroundColor:"rgba(".concat(r.color,", 0.2)"),borderColor:"rgba(".concat(r.color,", 1)"),borderWidth:1}]},e.next=12,this.setState({allCharts:a});case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setActiveTab",value:function(){var e=Object(m.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.searchInputRef.current.value="",e.next=3,this.setState({searchKeyword:"",activeTabName:t});case 3:return e.next=5,this.updateTab(this.state.activeTabName);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"applySearch",value:function(){var e=Object(m.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.searchInputRef.current,this.state.allData){e.next=4;break}return t.value="",e.abrupt("return");case 4:return a=t.value.trim().toLowerCase(),e.next=7,this.setState({searchKeyword:a});case 7:return e.next=9,this.updateTab(this.state.activeTabName);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"clearSearch",value:function(){var e=Object(m.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.searchInputRef.current.value="",e.next=4,this.setState({searchKeyword:""});case 4:return e.next=6,this.updateTab(this.state.activeTabName);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getChartHeight",value:function(){return window.innerWidth<500?3*window.innerWidth:window.innerWidth<750?2*window.innerWidth:window.innerWidth<1e3?window.innerWidth:window.innerWidth<1250?.5*window.innerWidth:.25*window.innerWidth}},{key:"render",value:function(){var e=this;if(!this.state.activeTabName||!this.state.allData)return null;var t=this.state.activeTabName,a=x[t],n=this.state.allCharts[t];return r.a.createElement("div",{className:"app"},r.a.createElement("div",null,Object.keys(x).map((function(t){return r.a.createElement(N.a,{key:t,variant:"contained",color:"primary",onClick:function(){return e.setActiveTab(t)}},x[t].buttonText)}))),r.a.createElement("div",{id:"search",style:{marginTop:"20px"}},r.a.createElement("input",{type:"text",id:"search-text",ref:this.searchInputRef}),r.a.createElement("button",{type:"button",onClick:function(){return e.applySearch()}},"Search"),r.a.createElement("button",{type:"button",onClick:function(){return e.clearSearch()}},"Clear")),r.a.createElement("div",null,r.a.createElement("h2",null,a.title),r.a.createElement("div",null,"Source: ",r.a.createElement("a",{target:"_blank",href:a.srcLink},a.srcText)),r.a.createElement("div",null,this.state.allData[t].updateTime),r.a.createElement("div",{id:"".concat(t,"-total")}),n?r.a.createElement(O.a,{data:this.state.allCharts[t],options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]},plugins:{datalabels:{anchor:"end",align:"end"}}},plugins:[E.a],height:this.getChartHeight()}):null))}}]),a}(r.a.Component);s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(I,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},62:function(e,t,a){e.exports=a(167)},67:function(e,t,a){},69:function(e,t,a){}},[[62,1,2]]]);
//# sourceMappingURL=main.chunk.js.map