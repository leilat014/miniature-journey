import{a as n,i as u,x as p,r as d,n as c,d as f,b as g}from"./state-VT-r88xb.js";const b=n`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    line-height: 1.5;
  }

  img {
    max-width: 100%;
  }

  ul,
  menu {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
  }
`,y={styles:b},v=n`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 0.5em;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }
`,D={styles:v};var S=Object.defineProperty,a=(l,s,t,r)=>{for(var e=void 0,i=l.length-1,m;i>=0;i--)(m=l[i])&&(e=m(s,t,e)||e);return e&&S(s,t,e),e};const h=class h extends u{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return p`
      <form
        @change=${s=>this.handleChange(s)}
        @submit=${s=>this.handleSubmit(s)}
      >
        <slot></slot>
        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">Login</button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(s){const t=s.target,r=t?.name,e=t?.value;switch(r){case"username":this.formData={...this.formData,username:e};break;case"password":this.formData={...this.formData,password:e};break}console.log("Form data updated:",this.formData),console.log("Can submit:",this.canSubmit)}handleSubmit(s){s.preventDefault(),this.canSubmit&&fetch(this?.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(t=>{if(t.status!==200)throw"Login failed";return t.json()}).then(t=>{const{token:r}=t,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:r,redirect:this.redirect}]});console.log("dispatching message",e),this.dispatchEvent(e)}).catch(t=>{console.log(t),this.error=t.toString()})}};h.styles=[y.styles,D.styles,n`
      .error:not(:empty) {
        color: var(--color-error);
        border: 1px solid var(--color-error);
        padding: var(--size-spacing-medium);
      }
    `];let o=h;a([d()],o.prototype,"formData");a([c()],o.prototype,"api");a([c()],o.prototype,"redirect");a([d()],o.prototype,"error");f({"mu-auth":g.Provider,"login-form":o});
