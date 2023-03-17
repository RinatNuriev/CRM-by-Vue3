"use strict";(self["webpackChunkvue_crm"]=self["webpackChunkvue_crm"]||[]).push([[770],{3998:function(e,a,i){i.r(a),i.d(a,{default:function(){return M}});var s=i(3396),l=i(9242),t=i(7139);const r={class:"card-content"},n=(0,s._)("span",{class:"card-title"},"Домашняя бухгалтерия",-1),d={class:"input-field"},m=(0,s._)("label",{for:"email"},"Email",-1),o={class:"input-field"},u=(0,s._)("label",{for:"password"},"Пароль",-1),c={class:"input-field"},p=(0,s._)("label",{for:"name"},"Имя",-1),$=(0,s._)("span",null,"С правилами согласен",-1),v={class:"card-action"},w=(0,s._)("div",null,[(0,s._)("button",{class:"btn waves-effect waves-light auth-submit",type:"submit"},[(0,s.Uk)(" Зарегистрироваться "),(0,s._)("i",{class:"material-icons right"},"send")])],-1),h={class:"center"};function g(e,a,i,g,_,y){const f=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("form",{class:"card auth-card",onSubmit:a[4]||(a[4]=(0,l.iM)(((...e)=>y.submitHandler&&y.submitHandler(...e)),["prevent"]))},[(0,s._)("div",r,[n,(0,s._)("div",d,[(0,s.wy)((0,s._)("input",{id:"email",type:"text","onUpdate:modelValue":a[0]||(a[0]=a=>e.email=a),class:(0,t.C_)({invalid:e.v$.email.$dirty&&!e.v$.email.required||e.v$.email.$dirty&&!e.v$.email.email})},null,2),[[l.nr,e.email,void 0,{trim:!0}]]),m,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.v$.email.$errors,(e=>((0,s.wg)(),(0,s.iD)("small",{class:"helper-text invalid",key:e.$uid},(0,t.zw)(e.$message),1)))),128))]),(0,s._)("div",o,[(0,s.wy)((0,s._)("input",{id:"password",type:"password","onUpdate:modelValue":a[1]||(a[1]=a=>e.password=a),class:(0,t.C_)({invalid:e.v$.password.$dirty&&!e.v$.password.required||e.v$.password.$dirty&&!e.v$.password.minLength})},null,2),[[l.nr,e.password,void 0,{trim:!0}]]),u,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.v$.password.$errors,(e=>((0,s.wg)(),(0,s.iD)("small",{class:"helper-text invalid",key:e.$uid},(0,t.zw)(e.$message),1)))),128))]),(0,s._)("div",c,[(0,s.wy)((0,s._)("input",{id:"name",type:"text","onUpdate:modelValue":a[2]||(a[2]=a=>e.name=a),class:(0,t.C_)({invalid:e.v$.name.$dirty&&!e.v$.name.required||e.v$.name.$dirty&&!e.v$.name.minLength})},null,2),[[l.nr,e.name,void 0,{trim:!0}]]),p,((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(e.v$.name.$errors,(e=>((0,s.wg)(),(0,s.iD)("small",{class:"helper-text invalid",key:e.$uid},(0,t.zw)(e.$message),1)))),128))]),(0,s._)("p",null,[(0,s._)("label",null,[(0,s.wy)((0,s._)("input",{type:"checkbox","onUpdate:modelValue":a[3]||(a[3]=a=>e.agree=a)},null,512),[[l.e8,e.agree]]),$])])]),(0,s._)("div",v,[w,(0,s._)("p",h,[(0,s.Uk)(" Уже есть аккаунт? "),(0,s.Wm)(f,{to:"/login"},{default:(0,s.w5)((()=>[(0,s.Uk)("Войти!")])),_:1})])])],32)}i(7658);var _=i(3053),y=i(9117),f={name:"register",setup:()=>({v$:(0,_.Xw)()}),data:()=>({email:"",password:"",name:"",agree:!1}),validations:{email:{email:y.BM.withMessage("Введите корректный Email",y.Do),required:y.BM.withMessage("Поле Email не должно быть пустым",y.C1)},password:{required:y.BM.withMessage("Введите пароль",y.C1),minLength:y.BM.withMessage((({$params:e,$model:a})=>`Пароль должен быть ${e.min} символов. Сейчас он  ${a.length}`),(0,y.Ei)(6))},name:{required:y.BM.withMessage("Введите имя",y.C1),minLength:y.BM.withMessage((({$params:e,$model:a})=>`Имя должно быть от ${e.min} символов. Сейчас оно ${a.length}`),(0,y.Ei)(3))},agree:{checked:e=>e}},methods:{async submitHandler(){if(this.v$.$invalid)return void this.v$.$touch();const e={email:this.email,password:this.password,name:this.name};try{await this.$store.dispatch("register",e),this.$router.push("/")}catch(a){a.message}}}},b=i(89);const k=(0,b.Z)(f,[["render",g]]);var M=k}}]);
//# sourceMappingURL=770.53701cf8.js.map