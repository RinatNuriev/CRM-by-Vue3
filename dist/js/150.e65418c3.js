"use strict";(self["webpackChunkvue_crm"]=self["webpackChunkvue_crm"]||[]).push([[150],{150:function(e,r,t){t.r(r),t.d(r,{default:function(){return _}});var c=t(3396),a=t(9242),d=t(7139);const o={class:"breadcrumb-wrap"},s={class:"row"},n={class:"col s12 m6"},i={class:"card-content white-text"};function l(e,r,t,l,u,m){const p=(0,c.up)("router-link");return(0,c.wg)(),(0,c.iD)("div",null,[(0,c._)("div",null,[(0,c._)("div",o,[(0,c.Wm)(p,{to:"/history",class:"breadcrumb"},{default:(0,c.w5)((()=>[(0,c.Uk)("История")])),_:1}),(0,c._)("a",{onClick:r[0]||(r[0]=(0,a.iM)((()=>{}),["prevent"])),class:"breadcrumb"},(0,d.zw)("income"===u.record.type?"Доход":"Расход"),1)]),(0,c._)("div",s,[(0,c._)("div",n,[(0,c._)("div",{class:(0,d.C_)(["card",{red:"outcome"===u.record.type,green:"income"===u.record.type}])},[(0,c._)("div",i,[(0,c._)("p",null,"Описание: "+(0,d.zw)(u.record.description),1),(0,c._)("p",null,"Сумма: "+(0,d.zw)(u.record.amount),1),(0,c._)("p",null,"Категория: "+(0,d.zw)(u.record.categoryName),1),(0,c._)("small",null,(0,d.zw)(u.record.date),1)])],2)])])])])}var u={name:"detail",data(){return{record:"a"}},async mounted(){const e=this.$route.params.id,r=await this.$store.dispatch("fetchRecordById",e),t=await this.$store.dispatch("fetchCategoryById",r[0].categoryId);this.record={...r[0],categoryName:t[0].title}}},m=t(89);const p=(0,m.Z)(u,[["render",l]]);var _=p}}]);
//# sourceMappingURL=150.e65418c3.js.map