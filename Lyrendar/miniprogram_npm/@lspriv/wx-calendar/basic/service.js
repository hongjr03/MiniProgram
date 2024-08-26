"use strict";var e=this&&this.__awaiter||function(e,l,i,o){return new(i=i||Promise)(function(s,t){function n(e){try{r(o.next(e))}catch(e){t(e)}}function a(e){try{r(o.throw(e))}catch(e){t(e)}}function r(e){var t;e.done?s(e.value):((t=e.value)instanceof i?t:new i(function(e){e(t)})).then(n,a)}r((o=o.apply(e,l||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0}),exports.PluginService=exports.intercept=void 0;const s=require("./tools"),d=require("./constants"),y=require("../utils/shared"),p=require("../interface/calendar"),r="PLUGIN_ON_",l="PLUGIN_CATCH_";class i extends Error{constructor(e,t=0){super(e),this.code=t}}const t=e=>{throw new i(void 0,e)};exports.intercept=t;class n{constructor(e,t){this._plugins_=[],this.component=e,this._plugins_=(t||[]).flatMap(e=>e.construct.KEY?{key:e.construct.KEY,instance:new e.construct(e.options)}:[]),this.initialize()}initialize(){this.traversePlugins(e=>{var t;null!=(t=e.PLUGIN_INITIALIZE)&&t.call(e,this)})}walkForDate(s){const n={};return this.traversePlugins(e=>{var t=null==(t=e.PLUGIN_TRACK_DATE)?void 0:t.call(e,s);t&&(t.corner&&!n.corner&&(n.corner=t.corner),t.festival&&!n.festival&&(n.festival=t.festival),null!=(e=t.schedule)&&e.length&&(n.schedule=(n.schedule||[]).concat(t.schedule)),t.style)&&(e=(0,p.styleParse)(t.style),n.style=Object.assign(Object.assign({},e),n.style))}),(0,y.notEmptyObject)(n)?n:null}walkForYear(n){const a={};return this.traversePlugins((e,t)=>{var s=null==(s=e.PLUGIN_TRACK_YEAR)?void 0:s.call(e,n);s&&(s.subinfo&&(a.subinfo=[...(0,p.fillAnnualSubs)(t,n.year,s.subinfo)||[],...a.subinfo||[]]),null!=(e=s.marks))&&e.size&&(a.marks=(0,p.mergeAnnualMarks)(s.marks,a.marks))}),(0,y.notEmptyObject)(a)?a:null}catchMonth(r){return e(this,void 0,void 0,function*(){var e=yield(0,s.nextTick)(()=>{var s=[];for(let t=r.weeks.length;t--;){var n=r.weeks[t];for(let e=n.days.length;e--;){var a=n.days[e],a=this.walkForDate(a);a&&(a.style&&(a.style=(0,p.styleStringify)(a.style)),s.push({wdx:t,ddx:e,record:a}))}}return s});yield this.component._annual_.interaction(),this.setMonth({year:r.year,month:r.month,days:e})})}catchYear(t){return e(this,void 0,void 0,function*(){var e=yield(0,s.nextTick)(()=>this.walkForYear(t));yield this.component._annual_.interaction(),e&&this.setYear({year:t.year,result:e})})}setMonth(o){(0,s.nextTick)(()=>{var s=this.component.data.panels,n={};for(let t=s.length;t--;){var e=s[t];if(e.year===o.year&&e.month===o.month)for(let e=o.days.length;e--;){var{wdx:a,ddx:r,record:l}=o.days[e],i=s[t].weeks[a].days[r],a=`panels[${t}].weeks[${a}].days[${r}]`;(0,p.sameMark)(l.corner,i.corner)||(n[a+".corner"]=l.corner||null),(0,p.sameMark)(l.festival,i.mark)||(n[a+".mark"]=l.festival||null),(0,p.sameSchedules)(l.schedule,i.schedules)||(n[a+".schedules"]=l.schedule||null),l.style!==i.style&&(n[a+".style"]=l.style||"")}}(0,y.notEmptyObject)(n)&&this.component.setData(n)})}setYear(n){(0,s.nextTick)(()=>{var e=this.component.data.years,t={},s=e.findIndex(e=>e.year===n.year);0<=s&&((0,p.sameAnnualSubs)(n.result.subinfo,e[s].subinfo)||(t[`years[${s}].subinfo`]=n.result.subinfo||null),(0,p.sameAnnualMarks)(this.component._years_[s].marks,n.result.marks)||(this.component._years_[s].marks=n.result.marks||new Map,this.component._printer_.update([s]))),(0,y.notEmptyObject)(t)&&this.component.setData(t)})}setDates(h){return(0,s.nextTick)(()=>{var t=this.component.data.panels,s={};for(let e=h.length;e--;){var{year:n,month:a,day:r,record:l}=h[e];for(let e=t.length;e--;){var i,o,c,u=t[e];(u.year===n&&u.month===a||-1===(0,p.monthDiff)({year:n,month:a},u)&&r<=7||1===(0,p.monthDiff)({year:n,month:a},u)&&r>=d.GREGORIAN_MONTH_DAYS[a-1]-7)&&({wdx:i,ddx:o}=(0,p.getWeekDateIdx)({year:n,month:a,day:r},u.weeks),0<=i)&&(c=`panels[${e}].weeks[${i}].days[${o}]`,u=u.weeks[i].days[o],(0,p.sameMark)(u.corner,l.corner)||(s[c+".corner"]=l.corner||null),(0,p.sameMark)(u.mark,l.festival)||(s[c+".mark"]=l.festival||null),(0,p.sameSchedules)(u.schedules,l.schedule)||(s[c+".schedules"]=l.schedule||null),l.style!==u.style)&&(s[c+".style"]=l.style||"")}}(0,y.notEmptyObject)(s)&&this.component.setData(s)})}updateDates(n){return e(this,void 0,void 0,function*(){var e=this.component.data.panels,t=(n=n||e.flatMap(e=>e.weeks.flatMap(e=>e.days)),new Map);for(let e=n.length;e--;){var s=n[e];this.setUpdateRecord(t,s)}return yield this.component._annual_.interaction(),this.setDates([...t.values()])})}updateRange(u){return e(this,void 0,void 0,function*(){var e=this.component.data.panels,t=this.component.data.current,s=Math.floor(d.CALENDAR_PANELS/2),n=(0,p.timestamp)(e[(t-s+d.CALENDAR_PANELS)%d.CALENDAR_PANELS].weeks[0].days[0]),e=e[(t+s)%d.CALENDAR_PANELS],t=e.weeks[e.weeks.length-1],a=(0,p.timestamp)(t.days[t.days.length-1]),r=new Map;for(let e=0;e<u.length;e++){var l=u[e];if(l.length)if(1===l.length)this.setUpdateRecord(r,l[0]);else{var i=(0,p.timestamp)(l[0]),l=(0,p.timestamp)(l[1]);if(!(a<i||l<n)){let e=Math.max(i,n);for(var o=Math.min(l,a);e<=o;){var c=(0,p.normalDate)(e);this.setUpdateRecord(r,c),e+=d.MS_ONE_DAY}}}}return yield this.component._annual_.interaction(),this.setDates([...r.values()])})}setUpdateRecord(e,t){var s,n=`${t.year}_${t.month}_`+t.day;e.has(n)||(s=this.walkForDate(t))&&(s.style&&(s.style=(0,p.styleStringify)(s.style)),e.set(n,{year:t.year,month:t.month,day:t.day,record:s}))}updateAnnuals(i){return e(this,void 0,void 0,function*(){if(null!=i&&i.length){var e=this.component.data.years,s={},n=[];for(let t=i.length;t--;){var a,r,l=e.findIndex(e=>e.year===i[t]);0<=l&&(a=e[l],r=this.walkForYear(a))&&((0,p.sameAnnualSubs)(r.subinfo,a.subinfo)||(s[`years[${l}].subinfo`]=r.subinfo||null),(0,p.sameAnnualMarks)(this.component._years_[l].marks,r.marks)||(this.component._years_[l].marks=r.marks||new Map,n.push(l)))}yield this.component._annual_.interaction(),n.length&&this.component._printer_.update(n),(0,y.notEmptyObject)(s)&&this.component.setData(s)}})}getEntireMarks(n){const a={corner:[],festival:[],schedule:[],style:[]};return this.traversePlugins((e,t)=>{var s=null==(s=e.PLUGIN_TRACK_DATE)?void 0:s.call(e,n);s&&(s.style&&a.style.push(Object.assign(Object.assign({},(0,p.styleParse)(s.style)),{key:t})),s.corner&&a.corner.push(Object.assign(Object.assign({},s.corner),{key:t})),s.festival&&a.festival.push(Object.assign(Object.assign({},s.festival),{key:t})),null!=(e=s.schedule))&&e.length&&a.schedule.push(...s.schedule.map(e=>Object.assign(Object.assign({},e),{key:t})))}),a}dispatchEvent(e,...t){var s,n=""+r+(0,y.camelToSnake)(e).toUpperCase();try{for(let e=0;e<this._plugins_.length;e++){var a=this._plugins_[e];null!=(s=a.instance[n])&&s.call(a.instance,this,...t)}}catch(e){}}interceptEvent(e,t,s){var n=""+l+(0,y.camelToSnake)(e).toUpperCase();let a=!0;for(let e=this._plugins_.length;e--;){var r=this._plugins_[e].instance;try{r[n].call(r,this,t,exports.intercept)}catch(e){if(e instanceof i){if(!e.code)return;a=!1}}}return!a||null==s?void 0:s()}getPlugin(t){var e=this._plugins_.find(e=>e.key===t);return null==e?void 0:e.instance}traversePlugins(t){for(let e=this._plugins_.length;e--;){var s=this._plugins_[e];t(s.instance,s.key)}}}exports.PluginService=n;