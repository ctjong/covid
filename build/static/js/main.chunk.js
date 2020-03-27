(this.webpackJsonpcovid19=this.webpackJsonpcovid19||[]).push([[0],{178:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(31),s=a.n(c);a(78),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i,o,u=a(5),l=a.n(u),h=a(22),d=a(7),f=a(4),b=a(15),m=a(16),p=a(69),v=a(70),y=(a(80),"nytimes"),w="johnhopkins",x="stateCases",k="stateDeaths",g="countyCases",T="countryCases",j="countryDeaths",E="countryRecovereds",O=(i={},Object(f.a)(i,x,{title:"Number of cases in the US by state",buttonText:"US cases by state",srcLink:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",srcText:"New York Times",chartLabel:"number of cases by state",color:"54, 162, 235",timeline:!1}),Object(f.a)(i,k,{title:"Number of deaths in the US by state",buttonText:"US deaths by state",srcLink:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",srcText:"New York Times",chartLabel:"number of deaths by state",color:"255, 206, 86",timeline:!1}),Object(f.a)(i,g,{title:"Number of cases in the US by county (top 100)",buttonText:"US cases by county",srcLink:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",srcText:"New York Times",chartLabel:"number of cases by county",color:"255, 99, 132",timeline:!1}),Object(f.a)(i,T,{title:"Number of cases in the world by country",buttonText:"Cases by country",srcLink:"https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",srcText:"John Hopkins",chartLabel:"number of cases by country",color:"75, 192, 192",timeline:!0}),Object(f.a)(i,j,{title:"Number of deaths in the world by country",buttonText:"Deaths by country",srcLink:"https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",srcText:"John Hopkins",chartLabel:"number of deaths by country",color:"153, 102, 255",timeline:!0}),Object(f.a)(i,E,{title:"Number of recovered people in the world by country",buttonText:"Recovered people by country",srcLink:"https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",srcText:"John Hopkins",chartLabel:"number of recovered people by country",color:"255, 159, 64",timeline:!0}),i),S=[{dataSource:y,args:{tableClass:"svelte-1k3kd4i",targetTabNames:[x,k]}},{dataSource:y,args:{tableClass:"svelte-ffcf53",targetTabNames:[g]}},{dataSource:w,args:{targetTabNames:[T,j,E]}}],N=(o={},Object(f.a)(o,x,(function(e){return{name:e[0].innerText,value:parseInt(e[1].innerText.replace(/,/,""))}})),Object(f.a)(o,k,(function(e){return{name:e[0].innerText,value:parseInt(e[2].innerText.replace(/,/,""))}})),Object(f.a)(o,g,(function(e){return{name:e[0].innerText+"/"+e[1].innerText,value:parseInt(e[2].innerText.replace(/,/,""))}})),o),D=function(){function e(){Object(b.a)(this,e)}return Object(m.a)(e,[{key:"retrieveData",value:function(e){var t=this,a={};return e.targetTabNames.forEach((function(e){a[e]={updateTime:document.querySelector(".css-wcxsge").innerHTML.replace("\x3c!-- --\x3e",""),records:[{date:"default",entries:[]}]}})),new Promise((function(n){t._loadSourceTable(e.tableClass).then((function(){t._parseSourceTable(a,e.tableClass,e.targetTabNames).then((function(){n(a)}))}))}))}},{key:"_loadSourceTable",value:function(e){return new Promise((function(t){var a=setInterval((function(){var n=document.querySelector("button.".concat(e));n&&(clearInterval(a),n.click(),t())}),1e3)}))}},{key:"_parseSourceTable",value:function(e,t,a){return new Promise((function(n){var r=setInterval((function(){var c=document.querySelectorAll("tbody tr.".concat(t));c.length>10&&(clearInterval(r),c.forEach((function(t){a.forEach((function(a){var n=N[a](t.querySelectorAll("td"));e[a].records[0].entries.push(n)}))})),n())}),1e3)}))}}]),e}(),C=a(62),I=a(64),R=a.n(I),L=a(189),_=a(191),W=function(){function e(){Object(b.a)(this,e)}return Object(m.a)(e,[{key:"retrieveData",value:function(e){var t=this;return new Promise(function(){var e=Object(d.a)(l.a.mark((function e(a){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:fetch("https://pomber.github.io/covid19/timeseries.json").then((function(e){return e.json()})).then((function(e){return a(t._parseData(e))}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"_parseData",value:function(e){var t,a=this,n="Last updated: ".concat(this._getDateString(new Date)),r=(t={},Object(f.a)(t,T,{updateTime:n,records:[]}),Object(f.a)(t,j,{updateTime:n,records:[]}),Object(f.a)(t,E,{updateTime:n,records:[]}),t),c={};return Object.keys(e).forEach((function(t){e[t].forEach((function(e){c[e.date]||(c[e.date]=[]),c[e.date].push(Object(h.a)({},e,{country:t}))}))})),Object.keys(c).forEach((function(e){a._parseRecordsByDate(r,c,e,T,"confirmed"),a._parseRecordsByDate(r,c,e,j,"deaths"),a._parseRecordsByDate(r,c,e,E,"recovered")})),r}},{key:"_parseRecordsByDate",value:function(e,t,a,n,r){var c=t[a].map((function(e){return{name:e.country,value:e[r]}})).filter((function(e){return e.value||0===e.value}));c.length>0&&e[n].records.push({date:a,entries:c})}},{key:"_getDateString",value:function(e){return"".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate())}}]),e}(),A=function(e){Object(v.a)(a,e);var t=Object(p.a)(a);function a(e){var n,c;return Object(b.a)(this,a),(c=t.call(this,e)).searchInputRef=void 0,c.parsers=(n={},Object(f.a)(n,y,new D),Object(f.a)(n,w,new W),n),c.loadAllData(),c.searchInputRef=r.a.createRef(),c.state={allData:null,allCharts:{},activeTabName:Object.keys(O)[0],activeRecordIndex:-1,searchKeyword:null},c}return Object(m.a)(a,[{key:"loadAllData",value:function(){var e=this,t=0,a={};new Promise((function(n){S.forEach((function(r){t++,e.parsers[r.dataSource].retrieveData(r.args).then(function(){var e=Object(d.a)(l.a.mark((function e(r){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(h.a)({},a,{},r),--t<=0&&n();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))})).then(Object(d.a)(l.a.mark((function t(){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.setState({allData:a});case 2:return t.next=4,e.updateTab(e.state.activeTabName);case 4:case"end":return t.stop()}}),t)}))))}},{key:"updateTab",value:function(){var e=Object(d.a)(l.a.mark((function e(t){var a,n,r,c,s,i,o,u,d=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=Object(h.a)({},this.state.allCharts),n=this.state.allData[t],!(r=O[t]).timeline){e.next=12;break}if(!((s=this.state.activeRecordIndex)<0||s>=n.records.length)){e.next=9;break}return e.next=8,this.setState({activeRecordIndex:n.records.length-1});case 8:s=this.state.activeRecordIndex;case 9:c=n.records[s],e.next=13;break;case 12:c=n.records[n.records.length-1];case 13:return(i=this.state.searchKeyword?c.entries.filter((function(e){return e.name.toLowerCase().indexOf(d.state.searchKeyword)>=0})):c.entries).sort((function(e,t){return t.value-e.value})),o=i.reduce((function(e,t){return e+t.value}),0),document.getElementById("".concat(t,"-total")).innerHTML="Total: ".concat(o),u=i.slice(0,100),a[t]={labels:u.map((function(e){return e.name})),datasets:[{label:r.chartLabel,data:u.map((function(e){return e.value})),backgroundColor:"rgba(".concat(r.color,", 0.2)"),borderColor:"rgba(".concat(r.color,", 1)"),borderWidth:1}]},e.next=21,this.setState({allCharts:a});case 21:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"setActiveTab",value:function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.searchInputRef.current.value="",e.next=3,this.setState({searchKeyword:"",activeRecordIndex:-1,activeTabName:t});case 3:return e.next=5,this.updateTab(this.state.activeTabName);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"applySearch",value:function(){var e=Object(d.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.searchInputRef.current,this.state.allData){e.next=4;break}return t.value="",e.abrupt("return");case 4:return a=t.value.trim().toLowerCase(),e.next=7,this.setState({searchKeyword:a});case 7:return e.next=9,this.updateTab(this.state.activeTabName);case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"clearSearch",value:function(){var e=Object(d.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.searchInputRef.current.value="",e.next=4,this.setState({searchKeyword:""});case 4:return e.next=6,this.updateTab(this.state.activeTabName);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getChartHeight",value:function(){return window.innerWidth<500?3*window.innerWidth:window.innerWidth<750?2*window.innerWidth:window.innerWidth<1e3?window.innerWidth:window.innerWidth<1250?.5*window.innerWidth:.25*window.innerWidth}},{key:"handleDateChange",value:function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setState({activeRecordIndex:t});case 2:return e.next=4,this.updateTab(this.state.activeTabName);case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleSearchKeyPress",value:function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==t.key){e.next=3;break}return e.next=3,this.applySearch();case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;if(!this.state.activeTabName||!this.state.allData)return r.a.createElement("div",{className:"loading"},r.a.createElement(L.a,null),r.a.createElement("div",null,"Please wait"));var t=this.state.activeTabName,a=O[t],n=this.state.allCharts[t],c=this.state.allData[t],s=this.state.activeRecordIndex;return r.a.createElement("div",{className:"app"},r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"title-container"},r.a.createElement("h2",null,a.title),r.a.createElement("div",null,"Source: ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:a.srcLink},a.srcText)),r.a.createElement("div",null,c.updateTime),r.a.createElement("div",{id:"".concat(t,"-total")}),r.a.createElement("div",{className:"search"},r.a.createElement("input",{type:"text",id:"search-text",ref:this.searchInputRef,onKeyPress:function(t){return e.handleSearchKeyPress(t)}}),r.a.createElement("button",{type:"button",onClick:function(){return e.applySearch()}},"Search"),r.a.createElement("button",{type:"button",onClick:function(){return e.clearSearch()}},"Clear"))),r.a.createElement("div",{className:"chart-links"},r.a.createElement("div",null,r.a.createElement("label",null,"Available charts:")),Object.keys(O).map((function(a){var n=O[a];return a===t?r.a.createElement("div",null,n.buttonText):r.a.createElement("div",null,r.a.createElement("a",{href:"#",onClick:function(){return e.setActiveTab(a)}},n.buttonText))})))),r.a.createElement("div",{className:"chart-controls"},!a.timeline||s<0||s>=c.records.length?null:r.a.createElement("div",{className:"slider-container"},r.a.createElement(_.a,{className:"date-slider",defaultValue:c.records.length-1,valueLabelFormat:function(e){return c.records[e].date},valueLabelDisplay:"off",step:1,min:c.records.length-31,max:c.records.length-1,onChange:function(t,a){return e.handleDateChange(a)}}),r.a.createElement("div",null,"Date: ",c.records[s].date)),n?r.a.createElement(C.a,{data:this.state.allCharts[t],options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]},plugins:{datalabels:{anchor:"end",align:"end"}},legend:{display:!1}},plugins:[R.a],height:this.getChartHeight()}):null),r.a.createElement("div",{className:"footer"},r.a.createElement("div",null,"\xa9\xa0",(new Date).getFullYear(),"\xa0",r.a.createElement("a",{href:"http://www.ctjong.com",target:"_blank"},"Christopher Tjong"),". All Rights Reserved.")))}}]),a}(r.a.Component);s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},73:function(e,t,a){e.exports=a(178)},78:function(e,t,a){},80:function(e,t,a){}},[[73,1,2]]]);
//# sourceMappingURL=main.chunk.js.map