(this.webpackJsonpglobetravel=this.webpackJsonpglobetravel||[]).push([[0],{121:function(e,t,n){},153:function(e,t,n){"use strict";n.r(t);var r=n(6),s=n(72),c=n.n(s),a=(n(121),n(10)),i=function(e,t){var n=Object(r.useState)((function(){try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(r){return console.log(r),t}})),s=Object(a.a)(n,2),c=s[0],i=s[1];return[c,function(t){try{var n=t instanceof Function?t(c):t;i(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(r){console.log(r)}}]},o=n(23),l=n(157),u=n(7),j=80,d=function(e,t,n){var r=4*n.width,s=parseInt((e+180)/360*n.width+.5),c=n.height-parseInt((t+90)/180*n.height-.5),a=parseInt(r*(c-1)+4*s)+3;return n.data[a]>90},b=function(e){var t=document.createElement("canvas").getContext("2d");return t.canvas.width=e.width,t.canvas.height=e.height,t.drawImage(e,0,0,e.width,e.height),t.getImageData(0,0,e.width,e.height)},f=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:j,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,s=(90-e)*Math.PI/180,c=(90-t)*Math.PI/180,a=n*(1+r);return{x:a*Math.sin(s)*Math.cos(c),y:a*Math.cos(s),z:a*Math.sin(s)*Math.sin(c)}},h=function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,s=f(e,t,n,r);return new u.Vector3(s.x,s.y,s.z)},x=(new Date).getTimezoneOffset()||0,m=[0,Math.PI*(x/720),0],g=n(2),O=function(){return Object(g.jsxs)("mesh",{rotation:m,children:[Object(g.jsx)("sphereBufferGeometry",{args:[j,32,32]}),Object(g.jsx)("meshBasicMaterial",{color:"#1F2937"})]})},v=n(15),y=n.n(v),p=n(21),C=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],s=t[1];return Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(y.a.mark((function e(){var t,n,r,c,a,i,o,l,u,j;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e,t){var n=new Image;n.addEventListener("load",(function(){return e(n)})),n.addEventListener("error",(function(e){return t(e)})),n.src="".concat("/globetravel","/images/map.png")}));case 2:t=e.sent,n=b(t),r=[],c=Math.PI/180,a=200,i=-90;case 8:if(!(i<=90)){e.next=23;break}o=25*Math.cos(Math.abs(i)*c)*Math.PI*2*2,l=0;case 11:if(!(l<o)){e.next=20;break}if(d(u=360*l/o-180,i,n)){e.next=15;break}return e.abrupt("continue",17);case 15:j=f(i,u),r.push(j.x,j.y,j.z);case 17:l++,e.next=11;break;case 20:i+=180/a,e.next=8;break;case 23:s(new Float32Array(r));case 24:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),Object(g.jsxs)("points",{rotation:m,children:[Object(g.jsx)("bufferGeometry",{attach:"geometry",children:n.length&&Object(g.jsx)("bufferAttribute",{attachObject:["attributes","position"],count:n.length/3,array:n,itemSize:3})}),Object(g.jsx)("pointsMaterial",{size:1.5,color:"#C7D2FE"})]})},N=function(e){var t=e.city,n=t.lat,s=t.lng,c=Object(r.useMemo)((function(){var e=h(n,s,j),t=h(n,s,85);return new u.CatmullRomCurve3([e,t])}),[n,s]),a=Object(r.useMemo)((function(){var e=f(n,s,85);return[e.x,e.y,e.z]}),[n,s]);return Object(g.jsxs)("mesh",{rotation:m,children:[Object(g.jsxs)("mesh",{children:[Object(g.jsx)("tubeBufferGeometry",{args:[c,44,.3,8]}),Object(g.jsx)("meshBasicMaterial",{color:"#FCD34D"})]}),Object(g.jsxs)("mesh",{position:a,children:[Object(g.jsx)("sphereBufferGeometry",{args:[.3,5,5]}),Object(g.jsx)("meshBasicMaterial",{color:"#FCD34D"})]})]})},w=n(40),k={trail:"#10B981",sail:"#06B6D4",bus:"#F472B6",car:"#F59E0B"},F=function(e){var t=e.travel,n=Object(r.useMemo)((function(){for(var e=t.start,n=t.end,r=h(e.lat,e.lng,80.3),s=h(n.lat,n.lng,80.3),c=[r],a=Object(w.a)([e.lng,e.lat],[n.lng,n.lat]),i=1;i<6;i++){var o=a(1/7*i);c.push(h(o[1],o[0],80.3))}return c.push(s),new u.CatmullRomCurve3(c)}),[t]);return Object(g.jsxs)("mesh",{rotation:m,children:[Object(g.jsx)("tubeBufferGeometry",{args:[n,44,.3,8]}),Object(g.jsx)("meshBasicMaterial",{color:k[t.type]})]})},I=function(e){var t=e.travel,n=Object(r.useMemo)((function(){var e=t.start,n=t.end,r=h(e.lat,e.lng,j),s=h(n.lat,n.lng,j),c=Object(w.a)([e.lng,e.lat],[n.lng,n.lat]),a=c(.25),i=c(.75),o=.5*r.distanceTo(s)+j,l=h(a[1],a[0],o),d=h(i[1],i[0],o);return new u.CubicBezierCurve3(r,l,d,s)}),[t]);return Object(g.jsxs)("mesh",{rotation:m,children:[Object(g.jsx)("tubeBufferGeometry",{args:[n,44,.3,8]}),Object(g.jsx)("meshBasicMaterial",{color:"#EF4444"})]})},S=function(e){var t=e.cities,n=e.travels,r=e.hideCities,s=e.hideTravels,c=e.hideFlights;return Object(g.jsxs)(o.a,{orthographic:!0,camera:{position:[0,0,200],zoom:3},children:[Object(g.jsx)(O,{}),Object(g.jsx)(C,{}),!r&&t.map((function(e){return Object(g.jsx)(N,{city:e},e.geonameId)})),n.map((function(e){return"flight"===e.type?!c&&Object(g.jsx)(I,{travel:e},e.id):!s&&Object(g.jsx)(F,{travel:e},e.id)})),Object(g.jsx)(l.a,{enablePan:!0,enableRotate:!0,autoRotate:!0})]})},M=n(13),T=n(9),B=n(77),R=n.n(B),E=n(78),H=n(46),D=n.n(H),z=n(79),A={ENG:"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f",SCT:"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f",WLS:"\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f"},G=Object.keys(A),P=function(e){return G.includes(e)?D()(A[e]):D()(Object(z.a)(e))},J=function(e){var t=e.onSelect,n=Object(r.useState)(""),s=Object(a.a)(n,2),c=s[0],i=s[1],o=Object(r.useState)([]),l=Object(a.a)(o,2),u=l[0],j=l[1],d=Object(r.useRef)();return Object(r.useEffect)((function(){return d.current.focus()}),[]),Object(r.useEffect)((function(){var e=function(){var e=Object(p.a)(y.a.mark((function e(){var t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R.a.get("https://secure.geonames.org/search",{params:{username:"lexcast",maxRows:5,q:c,type:"json"}});case 3:t=e.sent,j(t.data.geonames.map((function(e){return"GB"===e.countryCode&&G.includes(e.adminCode1)?Object(T.a)(Object(T.a)({},e),{},{countryCode:e.adminCode1}):e}))),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),j([]),console.error(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}();c?e():j([])}),[c]),Object(g.jsxs)("div",{className:"flex flex-col justify-center relative",children:[Object(g.jsx)(E.DebounceInput,{inputRef:d,minLength:2,value:c,debounceTimeout:300,placeholder:"Search any place...",className:"flex items-center h-10 px-3 rounded-full bg-gray-800 text-gray-300 focus:outline-none focus:ring",onChange:function(e){return i(e.target.value)}}),Array.isArray(u)&&u.length>0&&Object(g.jsx)("div",{className:"top-10 ring left-0 right-0 absolute mt-4 rounded-lg bg-gray-800 overflow-hidden text-sm",children:u.map((function(e){return Object(g.jsxs)("div",{onClick:function(){t(e),j([]),i(""),d.current.focus()},className:"cursor-pointer px-3 py-2 flex items-center hover:bg-gray-700",children:[e.countryCode&&Object(g.jsx)("span",{className:"mr-2",children:P(e.countryCode)}),Object(g.jsx)("span",{className:"flex-1",children:e.name}),e.adminName1&&Object(g.jsx)("span",{className:"ml-2 text-xs text-gray-400",children:e.adminName1})]},e.geonameId)}))})]})},L=n(16),W=n(12),_={flight:W.h,trail:W.l,sail:W.j,bus:W.c,car:W.d},U=function(e){var t=e.onFinish,n=Object(r.useState)(),s=Object(a.a)(n,2),c=s[0],i=s[1],o=Object(r.useState)(),l=Object(a.a)(o,2),u=l[0],j=l[1];return Object(g.jsxs)("div",{className:"flex flex-col justify-center",children:[!c&&Object(g.jsx)("div",{className:"flex items-center justify-around",children:Object.entries(_).map((function(e){var t=Object(a.a)(e,2),n=t[0],r=t[1];return Object(g.jsx)("div",{onClick:function(){return i(n)},className:"flex items-center justify-center rounded-full h-10 w-10 bg-gray-800 cursor-pointer hover:bg-gray-700",children:Object(g.jsx)(L.a,{icon:r})},n)}))}),!!c&&!u&&Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{className:"flex items-center mb-2",children:[Object(g.jsx)("div",{className:"text-xs mr-2 flex items-center justify-center rounded-full h-6 w-6 bg-gray-800",children:Object(g.jsx)(L.a,{icon:_[c]})}),"From:"]}),Object(g.jsx)(J,{onSelect:function(e){return j(e)}})]}),!!c&&!!u&&Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{className:"flex items-center mb-2",children:[Object(g.jsx)("div",{className:"mr-2 flex items-center justify-center rounded-full h-6 w-6 bg-gray-800",children:Object(g.jsx)(L.a,{icon:_[c]})}),Object(g.jsxs)("div",{className:"flex items-center mr-2",children:[u.countryCode&&Object(g.jsx)("span",{className:"mr-2",children:P(u.countryCode)}),Object(g.jsx)("span",{children:u.name})]}),"To:"]}),Object(g.jsx)(J,{onSelect:function(e){t(c,u,e),i(),j()}})]})]})},V={flight:W.h,trail:W.l,sail:W.j,bus:W.c,car:W.d},q=function(e){var t=e.travels,n=e.onRemove,r=e.hide,s=e.setHide,c=e.hideFlights,a=e.setHideFlights;return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("span",{className:"text-xs font-medium mb-1 mt-2 flex items-center justify-between",children:[Object(g.jsxs)("span",{children:["TRAVELS ",Object(g.jsxs)("span",{className:"text-gray-400",children:["(",t.length,")"]})]}),Object(g.jsxs)("div",{className:"flex items-center",children:[Object(g.jsx)("div",{onClick:function(){return a(!c)},className:"mx-2 flex items-center justify-center rounded-full h-6 w-6 bg-gray-800 cursor-pointer hover:bg-gray-700",children:Object(g.jsx)(L.a,{icon:c?W.i:W.h})}),Object(g.jsx)("div",{onClick:function(){return s(!r)},className:"flex items-center justify-center rounded-full h-6 w-6 bg-gray-800 cursor-pointer hover:bg-gray-700",children:Object(g.jsx)(L.a,{icon:r?W.g:W.f})})]})]}),Object(g.jsx)("div",{className:"text-xs max-h-24 bg-gray-800 rounded-lg overflow-y-auto",children:t.map((function(e){return Object(g.jsxs)("div",{className:"group cursor-pointer px-3 py-2 flex items-center hover:bg-gray-700",children:[Object(g.jsx)(L.a,{className:"text-xs mr-2 text-gray-400",icon:V[e.type]}),Object(g.jsx)("div",{className:"flex-1 flex items-center",children:["start","end"].map((function(t){return Object(g.jsxs)("div",{className:"flex items-center",children:[e[t].countryCode&&Object(g.jsx)("span",{className:"mr-2 flex-shrink-0",children:P(e[t].countryCode)}),Object(g.jsx)("span",{className:"flex-1",children:e[t].name}),"start"===t&&Object(g.jsx)(L.a,{className:"text-xs mx-2 text-gray-500",icon:W.a})]},t)}))}),Object(g.jsx)("span",{onClick:function(){return n(e)},className:"group-hover:visible invisible text-xs",children:Object(g.jsx)(L.a,{icon:W.k})})]},e.id)}))})]})},X=function(e){var t=e.cities,n=e.onRemove,r=e.setHide,s=e.hide;return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("span",{className:"text-xs font-medium mb-1 mt-2 flex items-center justify-between",children:[Object(g.jsxs)("span",{children:["CITIES ",Object(g.jsxs)("span",{className:"text-gray-400",children:["(",t.length,")"]})]}),Object(g.jsx)("div",{onClick:function(){return r(!s)},className:"flex items-center justify-center rounded-full h-6 w-6 bg-gray-800 cursor-pointer hover:bg-gray-700",children:Object(g.jsx)(L.a,{icon:s?W.g:W.f})})]}),Object(g.jsx)("div",{className:"text-xs max-h-24 bg-gray-800 rounded-lg overflow-y-auto",children:t.map((function(e){return Object(g.jsxs)("div",{className:"group px-3 py-2 flex items-center hover:bg-gray-700",children:[e.countryCode&&Object(g.jsx)("span",{className:"mr-2 flex-shrink-0",children:P(e.countryCode)}),Object(g.jsx)("span",{className:"flex-1",children:e.name}),Object(g.jsx)("span",{onClick:function(){return n(e)},className:"cursor-pointer group-hover:visible invisible text-xs",children:Object(g.jsx)(L.a,{icon:W.k})})]},e.geonameId)}))})]})},$=function(e){var t=e.countries;return Object(g.jsx)("div",{className:"flex flex-wrap mb-6",children:t.map((function(e){return Object(g.jsx)("div",{children:P(e)},e)}))})},K=function(e){var t=e.cities,n=e.travels,r=e.countries;return Object(g.jsx)("a",{title:"Export",className:"flex items-center justify-center focus:outline-none focus:ring w-8 h-8 rounded bg-gray-800 hover:bg-gray-700",href:"data:text/json;charset=utf-8,".concat(encodeURIComponent(JSON.stringify({cities:t,travels:n,countries:r},null,2))),download:"globetravel.json",children:Object(g.jsx)(L.a,{icon:W.e})})},Q=function(e){var t=e.setCities,n=e.setTravels,r=e.setCountries;return Object(g.jsxs)("label",{title:"Import",className:"cursor-pointer flex items-center justify-center focus:outline-none focus:ring w-8 h-8 rounded bg-gray-800 hover:bg-gray-700",children:[Object(g.jsx)("input",{className:"hidden",type:"file",accept:"application/JSON",onChange:function(e){var s=new FileReader;s.readAsText(e.target.files[0],"UTF-8"),s.onload=function(e){var s=JSON.parse(e.target.result);t(s.cities),n(s.travels),r(s.countries)}}}),Object(g.jsx)(L.a,{icon:W.n})]})},Y=function(e){var t=e.setCities,n=e.setTravels,r=e.setCountries;return Object(g.jsx)("button",{onClick:function(){window.confirm("Do you really want to delete everything?")&&(t([]),n([]),r([]))},title:"Reset",className:"flex items-center justify-center focus:outline-none focus:ring w-8 h-8 rounded bg-gray-800 hover:bg-gray-700",children:Object(g.jsx)(L.a,{icon:W.m})})},Z=function(){return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)("div",{className:"justify-end flex items-center mt-4 mb-1 text-gray-400 text-xs",children:["Made by",Object(g.jsx)("span",{className:"mx-1",children:P("MX")}),Object(g.jsx)("a",{target:"_blank",rel:"noopener noreferrer",className:"text-blue-400",href:"https://github.com/lexcast",children:"Daniel Alejandro Cast"})]}),Object(g.jsxs)("div",{className:"text-right text-gray-400 text-xs",children:["Globetravel uses"," ",Object(g.jsx)("a",{target:"_blank",rel:"noopener noreferrer",className:"text-blue-400",href:"https://www.geonames.org/",children:"Geonames API"})]})]})},ee=n(42),te=n.n(ee),ne=["geonameId","name","countryCode","adminName1","lat","lng"],re=function(e){var t=e.cities,n=e.setCities,s=e.travels,c=e.setTravels,i=e.countries,o=e.setCountries,l=e.hideTravels,u=e.setHideTravels,j=e.hideCities,d=e.setHideCities,b=e.hideFlights,f=e.setHideFlights,h=Object(r.useState)(),x=Object(a.a)(h,2),m=x[0],O=x[1],v=Object(r.useState)(!1),y=Object(a.a)(v,2),p=y[0],C=y[1],N=function(e,t,n){return t.some((function(t){return t.countryCode===e}))||n.some((function(t){return t.start.countryCode===e||t.end.countryCode===e}))};return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)("button",{onClick:function(){return C(!p)},className:"z-20 md:hidden absolute top-0 right-0 mt-4 mr-4 focus:outline-none focus:ring rounded-full bg-gray-800 h-8 w-8 flex items-center justify-center text-gray-300 hover:bg-gray-700 font-bolt",children:Object(g.jsx)(L.a,{icon:p?W.k:W.b})}),Object(g.jsxs)("div",{className:"bg-gray-900 absolute w-full md:relative flex-1 flex-col flex-nowrap px-10 pt-14 pb-4 h-screen overflow-y-auto "+(p?"flex":"hidden md:flex"),children:[i.length>0&&Object(g.jsx)($,{countries:i}),Object(g.jsxs)("div",{className:"flex-1",children:[Object(g.jsxs)("div",{className:"flex justify-around mb-8",children:[Object(g.jsx)("button",{onClick:function(){return O("city"===m?null:"city")},className:"focus:outline-none focus:ring rounded-full bg-gray-800 h-8 px-4 flex items-center text-gray-300 hover:bg-gray-700 font-bolt",children:"Add City"}),Object(g.jsx)("button",{onClick:function(){return O("travel"===m?null:"travel")},className:"focus:outline-none focus:ring rounded-full bg-gray-800 h-8 px-4 flex items-center text-gray-300 hover:bg-gray-700 font-bolt",children:"Add Travel"})]}),"city"===m&&Object(g.jsx)(J,{onSelect:function(e){var r=te()(e,ne);n([].concat(Object(M.a)(t),[r])),i.includes(r.countryCode)||o([].concat(Object(M.a)(i),[r.countryCode]))}}),"travel"===m&&Object(g.jsx)(U,{onFinish:function(e,t,n){var r=te()(t,ne),a=te()(n,ne),l=t.geonameId+"_"+n.geonameId;c([].concat(Object(M.a)(s),[{type:e,start:r,end:a,id:l}])),i.includes(t.countryCode)||o((function(e){return[].concat(Object(M.a)(e),[t.countryCode])})),i.includes(n.countryCode)||o((function(e){return[].concat(Object(M.a)(e),[n.countryCode])}))}})]}),t.length>0&&Object(g.jsx)(X,{cities:t,onRemove:function(e){var r=e.geonameId,c=e.countryCode,a=t.filter((function(e){return r!==e.geonameId}));n(a),N(c,a,s)||o(i.filter((function(e){return e!==c})))},hide:j,setHide:d}),s.length>0&&Object(g.jsx)(q,{travels:s,onRemove:function(e){var n=e.id,r=e.start,a=e.end,i=s.filter((function(e){return n!==e.id}));c(i),N(r.countryCode,t,i)||o((function(e){return e.filter((function(e){return e!==r.countryCode}))})),N(a.countryCode,t,i)||o((function(e){return e.filter((function(e){return e!==a.countryCode}))}))},hide:l,setHide:u,hideFlights:b,setHideFlights:f}),Object(g.jsxs)("div",{className:"mt-6 flex items-center justify-end gap-4",children:[Object(g.jsx)(Y,{setCities:n,setTravels:c,setCountries:o}),Object(g.jsx)(Q,{setCities:n,setTravels:c,setCountries:o}),Object(g.jsx)(K,{cities:t,travels:s,countries:i})]}),Object(g.jsx)(Z,{})]})]})},se=function(){var e=i("@globetravel.cities",[]),t=Object(a.a)(e,2),n=t[0],r=t[1],s=i(!1),c=Object(a.a)(s,2),o=c[0],l=c[1],u=i("@globetravel.travels",[]),j=Object(a.a)(u,2),d=j[0],b=j[1],f=i(!1),h=Object(a.a)(f,2),x=h[0],m=h[1],O=i(!1),v=Object(a.a)(O,2),y=v[0],p=v[1],C=i("@globetravel.countries",[]),N=Object(a.a)(C,2),w=N[0],k=N[1];return Object(g.jsxs)("div",{className:"text-gray-300 w-screen h-screen bg-gray-900 flex overflow-hidden flex-no-wrap",children:[Object(g.jsx)("div",{className:"h-screen w-full md:w-2/3 bg-gray-900",children:Object(g.jsx)(S,{cities:n,travels:d,hideCities:o,hideTravels:x,hideFlights:y})}),Object(g.jsx)(re,{cities:n,setCities:r,travels:d,setTravels:b,countries:w,setCountries:k,hideCities:o,setHideCities:l,hideTravels:x,setHideTravels:m,hideFlights:y,setHideFlights:p})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(g.jsx)(se,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[153,1,2]]]);
//# sourceMappingURL=main.e8254a98.chunk.js.map