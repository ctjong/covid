(this.webpackJsonpcovid19=this.webpackJsonpcovid19||[]).push([[0],{184:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(19),s=a.n(c);a(85),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var o,i,u=a(5),l=a(6),h=a.n(l),d=a(16),m=a(10),f=a(20),v=a(21),b=a(74),p=a(75),y=(a(87),"bar"),g="line",w="linear",k="logarithmic",x="nytimes",E="johnhopkins",C="countryCases",j="countryDeaths",D="countryRecovereds",S="stateCases",T="stateDeaths",O="countyCases",N="countyDeaths",R=(o={},Object(u.a)(o,C,{title:"Number of cases in the world by country",buttonText:"Cases by country",sources:[{link:"https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",text:"John Hopkins"},{link:"https://www.worldometers.info/coronavirus/",text:"Worldometer"}],chartLabel:"number of cases by country",timeline:!0}),Object(u.a)(o,j,{title:"Number of deaths in the world by country",buttonText:"Deaths by country",sources:[{link:"https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",text:"John Hopkins"}],chartLabel:"number of deaths by country",timeline:!0}),Object(u.a)(o,D,{title:"Number of recovered cases in the world by country",buttonText:"Recovered cases by country",sources:[{link:"https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6",text:"John Hopkins"}],chartLabel:"number of recovered cases by country",timeline:!0}),Object(u.a)(o,S,{title:"Number of cases in the US by state",buttonText:"US cases by state",sources:[{link:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",text:"New York Times"}],chartLabel:"number of cases by state",timeline:!0}),Object(u.a)(o,T,{title:"Number of deaths in the US by state",buttonText:"US deaths by state",sources:[{link:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",text:"New York Times"}],chartLabel:"number of cases by state",timeline:!0}),Object(u.a)(o,O,{title:"Number of cases in the US by county (top 100)",buttonText:"US cases by county",sources:[{link:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",text:"New York Times"}],chartLabel:"number of cases by county",timeline:!0}),Object(u.a)(o,N,{title:"Number of deaths in the US by county (top 100)",buttonText:"US deaths by county",sources:[{link:"https://www.nytimes.com/interactive/2020/us/coronavirus-us-cases.html",text:"New York Times"}],chartLabel:"number of cases by county",timeline:!0}),o),A=[{dataSource:E,args:{}},{dataSource:x,args:{}}],_=function(){function e(){Object(f.a)(this,e),this.retrievalPromise=void 0}return Object(v.a)(e,[{key:"retrieveData",value:function(e){var t=this;return this.retrievalPromise||(this.retrievalPromise=fetch("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv").then((function(e){return e.text()})).then((function(e){return t._parseData(t._csvToJson(e))}))),this.retrievalPromise}},{key:"_csvToJson",value:function(e){var t=e.split("\n"),a=t.shift().split(","),r=[];return t.forEach((function(e){var t={},n=e.split(",");a.forEach((function(e,a){t[e]="cases"===e||"deaths"===e?parseInt(n[a]):n[a]})),r.push(t)})),r}},{key:"_parseData",value:function(e){var t,a=this,r=(t={},Object(u.a)(t,S,{records:[]}),Object(u.a)(t,T,{records:[]}),Object(u.a)(t,O,{records:[]}),Object(u.a)(t,N,{records:[]}),t),n={},c={};return e.forEach((function(e){if(c[e.date]||(c[e.date]={}),c[e.date][e.state]){var t=c[e.date][e.state];c[e.date][e.state]={cases:t.cases+e.cases,deaths:t.deaths+e.deaths}}else c[e.date][e.state]=Object(d.a)({},e);n[e.date]||(n[e.date]={}),n[e.date]["".concat(e.state,"/").concat(e.county)]=Object(d.a)({},e)})),Object.keys(n).forEach((function(e){a._parseRecordsByDate(r,c,e,S,(function(e){return e.cases})),a._parseRecordsByDate(r,c,e,T,(function(e){return e.deaths})),a._parseRecordsByDate(r,n,e,O,(function(e){return e.cases})),a._parseRecordsByDate(r,n,e,N,(function(e){return e.deaths}))})),r}},{key:"_parseRecordsByDate",value:function(e,t,a,r,n){var c=Object.keys(t[a]).map((function(e){return{name:e,value:n(t[a][e])}})).filter((function(e){return e.value||0===e.value}));c.length>0&&e[r].records.push({date:a,entries:c})}},{key:"_getDateString",value:function(e){return"".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate())}}]),e}(),P=a(50),I=a(69),L=a.n(I),M=a(199),W=a(202),B={USA:"US","S. Korea":"Korea, South"},K=function(){function e(){Object(f.a)(this,e),this.retrievalPromise=void 0}return Object(v.a)(e,[{key:"retrieveData",value:function(e){var t=this;return this.retrievalPromise||(this.retrievalPromise=new Promise(function(){var e=Object(m.a)(h.a.mark((function e(a){var r,n;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://pomber.github.io/covid19/timeseries.json").then((function(e){return e.json()})).then((function(e){return t._parseData(e)}));case 2:return r=e.sent,e.next=5,fetch("https://covid19-server.chrismichael.now.sh/api/v1/AllReports").then((function(e){return e.json()})).then((function(e){return t._mergeWomData(r,e)}));case 5:n=e.sent,a(n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())),this.retrievalPromise}},{key:"_parseData",value:function(e){var t,a=this,r=(t={},Object(u.a)(t,C,{records:[]}),Object(u.a)(t,j,{records:[]}),Object(u.a)(t,D,{records:[]}),t),n={};return Object.keys(e).forEach((function(t){e[t].forEach((function(e){n[e.date]||(n[e.date]=[]),n[e.date].push(Object(d.a)({country:t},e))}))})),Object.keys(n).forEach((function(e){a._parseRecordsByDate(r,n,e,C,(function(e){return e.confirmed})),a._parseRecordsByDate(r,n,e,j,(function(e){return e.deaths})),a._parseRecordsByDate(r,n,e,D,(function(e){return e.recovered}))})),r}},{key:"_parseRecordsByDate",value:function(e,t,a,r,n){var c=t[a].map((function(e){return{name:e.country,value:n(e)}})).filter((function(e){return e.value||0===e.value}));c.length>0&&e[r].records.push({date:a,entries:c})}},{key:"_mergeWomData",value:function(e,t){var a=t.reports[0].table[0].filter((function(e){return"Total:"!==e.Country}));return this._mergeWomEntries(e,a,"countryCases",(function(e){return e.TotalCases})),this._mergeWomEntries(e,a,"countryDeaths",(function(e){return e.TotalDeaths})),this._mergeWomEntries(e,a,"countryRecovereds",(function(e){return e.TotalRecovered})),e}},{key:"_mergeWomEntries",value:function(e,t,a,r){var n=this._getDateString(new Date);e[a].records[e[a].records.length-1].date===n&&e[a].records.splice(e[a].records.length-1,1),e[a].records.push({date:n,entries:t.filter((function(e){return!!r(e)})).map((function(e){return{name:B[e.Country]||e.Country,value:parseInt(r(e).replace(/,/,""))}}))})}},{key:"_getDateString",value:function(e){return"".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate())}}]),e}(),U=a(15),F=a(203),J=a(201),Y=function(e){Object(p.a)(a,e);var t=Object(b.a)(a);function a(e){var r;return Object(f.a)(this,a),(r=t.call(this,e)).searchInputRef=void 0,r.colors={},r.loadAllData(),r.searchInputRef=n.a.createRef(),U.Chart.defaults.global.defaultFontSize=14,r.state={allData:null,allCharts:{},activeTabName:r.getTabNameToSetAsActive(),barChartRecordIndex:-1,searchKeyword:null,activeChart:y,lineChartScale:w},window.onpopstate=function(){r.setActiveTab(r.getTabNameToSetAsActive(),!1)},r}return Object(v.a)(a,[{key:"loadAllData",value:function(){var e=this,t=0,r={};new Promise((function(e){A.forEach((function(n){t++,a.parsers[n.dataSource].retrieveData(n.args).then(function(){var a=Object(m.a)(h.a.mark((function a(n){return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:r=Object(d.a)({},r,{},n),--t<=0&&e();case 3:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}())}))})).then(Object(m.a)(h.a.mark((function t(){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.setStateAsync({allData:r});case 2:return t.next=4,e.updateActiveTabData();case 4:case"end":return t.stop()}}),t)}))))}},{key:"getFilteredEntries",value:function(e){var t=this,a=this.state,r=a.allData[a.activeTabName].records[e],n=this.state.searchKeyword?r.entries.filter((function(e){return e.name.toLowerCase().indexOf(t.state.searchKeyword)>=0})):r.entries;return n.sort((function(e,t){return t.value-e.value})),n.forEach((function(e){t.colors[e.name]||(t.colors[e.name]=t.getRandomColor())})),n}},{key:"updateActiveTabData",value:function(){var e=Object(m.a)(h.a.mark((function e(){var t,a,r,n,c,s,o,i,l,m,f,v,b,p,y,g,w,k,x=this;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.state,a=t.allCharts,r=t.activeTabName,n=t.allData,c=n[r],s=R[r],!((o=this.state.barChartRecordIndex)<0||o>=c.records.length)){e.next=8;break}return e.next=7,this.setStateAsync({barChartRecordIndex:c.records.length-1});case 7:o=this.state.barChartRecordIndex;case 8:return i=this.getFilteredEntries(o),l=i.reduce((function(e,t){return e+t.value||0}),0),m=i.slice(0,100),f={labels:m.map((function(e){return e.name})),datasets:[{label:s.chartLabel,data:m.map((function(e){return e.value})),backgroundColor:m.map((function(e){return"rgba(".concat(x.colors[e.name],", 0.2)")})),borderColor:m.map((function(e){return"rgba(".concat(x.colors[e.name],", 1)")})),borderWidth:1}]},v=this.getFilteredEntries(c.records.length-1),b=v.slice(0,10),p=c.records.slice(c.records.length-30,c.records.length),y=p.map((function(e){return e.date})),g=b.map((function(e){return{name:e.name,values:p.map((function(t){return(t.entries.find((function(t){return t.name===e.name}))||{}).value}))}})),w={labels:y,datasets:g.map((function(e){return{label:e.name,data:e.values,backgroundColor:["rgba(".concat(x.colors[e.name],", 0.2)")],borderColor:["rgba(".concat(x.colors[e.name],", 1)")],borderWidth:1}}))},k={labels:y,datasets:g.map((function(e){return{label:e.name,data:e.values.map((function(e){return Math.log10(e)})),backgroundColor:["rgba(".concat(x.colors[e.name],", 0.2)")],borderColor:["rgba(".concat(x.colors[e.name],", 1)")],borderWidth:1}}))},e.next=21,this.setStateAsync({allCharts:Object(d.a)({},a,Object(u.a)({},r,{barTotal:l,barConfig:f,lineConfig:w,logLineConfig:k}))});case 21:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"setActiveTab",value:function(){var e=Object(m.a)(h.a.mark((function e(t,a){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.searchInputRef.current.value="",e.next=3,this.setStateAsync({searchKeyword:"",barChartRecordIndex:-1,activeTabName:t});case 3:return e.next=5,this.updateActiveTabData();case 5:a&&window.history.pushState(null,window.document.title,"?".concat("chart","=").concat(t));case 6:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"applySearch",value:function(){var e=Object(m.a)(h.a.mark((function e(){var t,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.searchInputRef.current,this.state.allData){e.next=4;break}return t.value="",e.abrupt("return");case 4:return a=t.value.trim().toLowerCase(),e.next=7,this.setStateAsync({searchKeyword:a});case 7:return e.next=9,this.updateActiveTabData();case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"clearSearch",value:function(){var e=Object(m.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.searchInputRef.current.value="",e.next=4,this.setStateAsync({searchKeyword:""});case 4:return e.next=6,this.updateActiveTabData();case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"handleDateChange",value:function(){var e=Object(m.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.setStateAsync({barChartRecordIndex:t});case 2:return e.next=4,this.updateActiveTabData();case 4:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleSearchKeyPress",value:function(){var e=Object(m.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("Enter"!==t.key){e.next=3;break}return e.next=3,this.applySearch();case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getQueryParam",value:function(e){var t=window.location.href,a=new RegExp("[?&]"+e+"=([^&#]*)","i").exec(t);return a?a[1]:null}},{key:"setStateAsync",value:function(e){var t=this;return new Promise((function(a){return t.setState(e,a)}))}},{key:"getTabNameToSetAsActive",value:function(){return this.getQueryParam("chart")||Object.keys(R)[0]}},{key:"getRandomColor",value:function(){var e=Math.floor(Math.random()*Math.floor(255)),t=Math.floor(Math.random()*Math.floor(255)),a=Math.floor(Math.random()*Math.floor(255));return"".concat(e,",").concat(t,",").concat(a)}},{key:"handleChartTypeChange",value:function(e){this.setState({activeChart:e})}},{key:"handleScaleChange",value:function(e){this.setState({lineChartScale:e})}},{key:"render",value:function(){var e=this,t=this.state,a=t.activeTabName,r=t.allData,c=t.allCharts,s=t.barChartRecordIndex,o=t.activeChart,i=t.lineChartScale;if(!a||!r||!c[a])return n.a.createElement("div",{className:"loading"},n.a.createElement(M.a,null),n.a.createElement("div",null,"Please wait"));var u=R[a],l=r[a],h=c[a],d=h.barTotal,m=h.barConfig,f=h.lineConfig,v=30*m.labels.length+50,b=s>=0&&s<l.records.length;return n.a.createElement("div",{className:"app"},n.a.createElement("div",{className:"header"},n.a.createElement("div",{className:"title-container"},n.a.createElement("h2",null,u.title),n.a.createElement("div",null,"Sources: ",u.sources.map((function(e,t){return n.a.createElement("span",{key:t},"\xa0(",n.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:e.link},e.text),")")}))),n.a.createElement("div",{className:"search"},n.a.createElement("input",{type:"text",id:"search-text",ref:this.searchInputRef,onKeyPress:function(t){return e.handleSearchKeyPress(t)}}),n.a.createElement("button",{type:"button",onClick:function(){return e.applySearch()}},"Search"),n.a.createElement("button",{type:"button",onClick:function(){return e.clearSearch()}},"Clear"))),n.a.createElement("div",{className:"chart-links"},n.a.createElement("div",null,n.a.createElement("label",null,"Available charts:")),Object.keys(R).map((function(t){var r=R[t];return t===a?n.a.createElement("div",{key:t},r.buttonText):n.a.createElement("div",{key:t},n.a.createElement("a",{onClick:function(){return e.setActiveTab(t,!0)}},r.buttonText))})))),n.a.createElement("div",{className:"chart-container ".concat(o,"-active")},n.a.createElement("div",{className:"chart-selector"},n.a.createElement(F.a,{size:"small",value:o,exclusive:!0,onChange:function(t,a){return e.handleChartTypeChange(a)}},n.a.createElement(J.a,{value:y},"Top 100"),n.a.createElement(J.a,{value:g},"Top 10 trend"))),n.a.createElement("div",{className:"chart ".concat(g,"-chart")},n.a.createElement("div",{className:"scale-selector"},n.a.createElement(F.a,{size:"small",value:i,exclusive:!0,onChange:function(t,a){return e.handleScaleChange(a)}},n.a.createElement(J.a,{value:w},"Linear"),n.a.createElement(J.a,{value:k},"Logarithmic"))),n.a.createElement("div",{className:"chart-wrapper",style:{height:800}},n.a.createElement(P.b,{data:f,options:{maintainAspectRatio:!1,plugins:{datalabels:{display:!1}},scales:{yAxes:[{id:"y-axis",type:i===w?"linear":"logarithmic"}]}}}))),n.a.createElement("div",{className:"chart ".concat(y,"-chart")},b?n.a.createElement("div",{className:"slider-container"},n.a.createElement(W.a,{className:"date-slider",defaultValue:l.records.length-1,valueLabelFormat:function(e){return l.records[e].date},valueLabelDisplay:"off",step:1,min:l.records.length-31,max:l.records.length-1,onChange:function(t,a){return e.handleDateChange(a)}}),n.a.createElement("div",null,"Date: ",l.records[s].date)):null,n.a.createElement("div",null,"Total: ",d),n.a.createElement("div",{className:"chart-wrapper",style:{height:v}},n.a.createElement(P.a,{data:m,options:{scales:{yAxes:[{ticks:{beginAtZero:!0}}]},plugins:{datalabels:{anchor:"end",align:"end"}},legend:{display:!1},maintainAspectRatio:!1},plugins:[L.a]})))),n.a.createElement("div",{className:"footer"},n.a.createElement("div",null,"\xa9\xa0",(new Date).getFullYear(),"\xa0",n.a.createElement("a",{href:"http://www.ctjong.com",target:"_blank",rel:"noopener noreferrer"},"Christopher Tjong"),". All Rights Reserved.")))}}]),a}(n.a.Component);Y.parsers=(i={},Object(u.a)(i,x,new _),Object(u.a)(i,E,new K),i),s.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},80:function(e,t,a){e.exports=a(184)},85:function(e,t,a){},87:function(e,t,a){}},[[80,1,2]]]);
//# sourceMappingURL=main.chunk.js.map