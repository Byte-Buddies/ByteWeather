/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-geolocation-localstorage !*/
!function(n,e,o){function t(n,e){return typeof n===e}function a(){var n,e,o,a,r,l,f;for(var c in i)if(i.hasOwnProperty(c)){if(n=[],e=i[c],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(o=0;o<e.options.aliases.length;o++)n.push(e.options.aliases[o].toLowerCase());for(a=t(e.fn,"function")?e.fn():e.fn,r=0;r<n.length;r++)l=n[r],f=l.split("."),1===f.length?Modernizr[f[0]]=a:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),Modernizr[f[0]][f[1]]=a),s.push((a?"":"no-")+f.join("-"))}}var s=[],i=[],r={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(n,e){var o=this;setTimeout(function(){e(o[n])},0)},addTest:function(n,e,o){i.push({name:n,fn:e,options:o})},addAsyncTest:function(n){i.push({name:null,fn:n})}},Modernizr=function(){};Modernizr.prototype=r,Modernizr=new Modernizr,Modernizr.addTest("geolocation","geolocation"in navigator),Modernizr.addTest("localstorage",function(){var n="modernizr";try{return localStorage.setItem(n,n),localStorage.removeItem(n),!0}catch(e){return!1}}),a(),delete r.addTest,delete r.addAsyncTest;for(var l=0;l<Modernizr._q.length;l++)Modernizr._q[l]();n.Modernizr=Modernizr}(window,document);