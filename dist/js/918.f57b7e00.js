"use strict";(self["webpackChunkvue_crm"]=self["webpackChunkvue_crm"]||[]).push([[918],{7918:function(e,t,r){r.r(t),r.d(t,{default:function(){return m}});var i=r(3396),n=r(7139);const o={class:"page-title"},s=(0,i._)("h3",null,"Планирование",-1),l={key:1,class:"center"},c={key:2},a={class:"progress"};function u(e,t,r,u,d,g){const p=(0,i.up)("loader"),w=(0,i.up)("router-link"),h=(0,i.Q2)("tooltip");return(0,i.wg)(),(0,i.iD)("div",null,[(0,i._)("div",o,[s,(0,i._)("h4",null,(0,n.zw)(g.currencyFilter(e.info.bill)),1)]),d.loading?((0,i.wg)(),(0,i.j4)(p,{key:0})):d.categories.length?((0,i.wg)(),(0,i.iD)("section",c,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(d.categories,(e=>((0,i.wg)(),(0,i.iD)("div",{key:e.id},[(0,i._)("p",null,[(0,i._)("strong",null,(0,n.zw)(e.title+":"),1),(0,i.Uk)(" "+(0,n.zw)(g.currencyFilter(e.spend))+" из "+(0,n.zw)(g.currencyFilter(e.limit)),1)]),(0,i.wy)(((0,i.wg)(),(0,i.iD)("div",a,[(0,i._)("div",{class:(0,n.C_)(["determinate",[e.progressColor]]),style:(0,n.j5)({width:e.progressPercent+"%"})},null,6)])),[[h,e.tooltip]])])))),128))])):((0,i.wg)(),(0,i.iD)("p",l,[(0,i.Uk)("Категорий пока нет "),(0,i.Wm)(w,{to:"/categories"},{default:(0,i.w5)((()=>[(0,i.Uk)("Добавить категорию")])),_:1})]))])}var d=r(4667),g=r(65),p={name:"planing",data(){return{loading:!0,categories:[]}},async mounted(){const e=await this.$store.dispatch("fetchRecords"),t=await this.$store.dispatch("fetchCategories");this.categories=await t[0].map((t=>{const r=e[0].filter((e=>e.categoryId===t.id)).filter((e=>"outcome"===e.type)).reduce(((e,t)=>e+ +t.amount),0),i=100*r/t.limit,n=i>100?100:i,o=i<60?"green":i<100?"yellow":"red",s=t.limit-r,l=`${s<0?"Превышение на":"Осталось"} ${this.currencyFilter(Math.abs(s))}`;return{...t,progressPercent:n,progressColor:o,spend:r,tooltip:l}})),this.loading=!1},components:{Loader:d.Z},computed:{...(0,g.Se)(["info"])},methods:{currencyFilter(e,t="RUB"){return new Intl.NumberFormat("ru-RU",{style:"currency",currency:t}).format(e)}}},w=r(89);const h=(0,w.Z)(p,[["render",u]]);var m=h}}]);
//# sourceMappingURL=918.f57b7e00.js.map