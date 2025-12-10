import{i as l,O as j,x as r,a as n,n as m,r as p,d as S,e as D,h as R,b as M,_ as U}from"./state-VT-r88xb.js";var W=Object.defineProperty,_=(i,e,a,h)=>{for(var t=void 0,s=i.length-1,o;s>=0;s--)(o=i[s])&&(t=o(e,a,t)||t);return t&&W(e,a,t),t},d;let v=(d=class extends l{constructor(){super(...arguments),this._authObserver=new j(this,"miniature:auth"),this.sections=[]}get authorization(){return this._user?.authenticated&&{Authorization:`Bearer ${this._user.token}`}}render(){return r`${this.sections.map(e=>r`
        <trip-section section-class="${e.sectionClass}">
          <svg class="icon" slot="icon">
            <use href="${e.icon}" />
          </svg>
          <span slot="title" class="section-title">${e.title}</span>
          <ul slot="links">
            ${e.links.map(a=>r`
                <li><a href="${a.href}">${a.text} &rarr;</a></li>
              `)}
          </ul>
        </trip-section>
      `)}`}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated?this.userid?this.hydrate(`/api/travelers/${this.userid}`):this.src&&this.hydrate(this.src):this.src&&this.hydrate(this.src)})}hydrate(e){const h=e.startsWith("/api/")&&this.authorization?{headers:this.authorization}:{};fetch(e,h).then(t=>{if(t.status===401)throw new Error("Unauthorized - please log in");if(!t.ok)throw new Error(`HTTP error! status: ${t.status}`);return t.json()}).then(t=>{if(t){const s=t;this.sections=s.sections}}).catch(t=>{console.error("Error loading data:",t)})}},d.styles=n`
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2em;
      padding: 2em;
    }
  `,d);_([m()],v.prototype,"src");_([m()],v.prototype,"userid");_([p()],v.prototype,"sections");const q=n`
  * {
    margin: 0;
    box-sizing: border-box;
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
`,J={styles:q};var G=Object.defineProperty,A=(i,e,a,h)=>{for(var t=void 0,s=i.length-1,o;s>=0;s--)(o=i[s])&&(t=o(e,a,t)||t);return t&&G(e,a,t),t};const P=class P extends l{render(){return r`<section class="${this["section-class"]}">
      <h2>
        <slot name="icon"></slot>
        <slot name="title"></slot>
      </h2>
      <slot name="links"></slot>
    </section> `}};P.styles=[J.styles,n`
      svg.icon {
        display: inline;
        height: 2em;
        width: 2em;
        vertical-align: top;
        fill: currentColor;
      }
      section {
        order: 0;
        padding: 1.5em;
      }
      h2 {
        color: var(--color-main);
        padding: 1em;
        font-family: "Fjalla One", sans-serif;
        font-style: normal;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 0.5em;
      }
      ul {
        font-family: "Rubik", sans-serif;
        font-style: normal;
        font-weight: 500;
        padding-bottom: 2em;
      }
      a {
        font-family: "Rubik", sans-serif;
        font-style: normal;
        font-weight: 500;
      }
      ::slotted(span[slot="title"]) {
        color: var(--color-main) !important;
        font-family: "Fjalla One", sans-serif !important;
        font-style: normal !important;
        font-weight: 400 !important;
      }
      ::slotted(ul) {
        font-family: "Rubik", sans-serif;
        font-style: normal;
        font-weight: 500;
        padding-bottom: 2em;
      }
    `];let u=P;A([m()],u.prototype,"icon-href");A([m()],u.prototype,"section-class");const f=class f extends l{render(){return r`
      <article>
        <trip-element src="/journey.json">
          <trip-section section-class="itinerary">
            <svg class="icon" slot="icon">
              <use href="/icons/itinerary.svg#icon-map" />
            </svg>
            <span slot="title" class="section-title">Itinerary</span>
            <ul slot="links">
              <li>
                <a href="/app/transportation">Planes, Trains and Automobiles &rarr;</a>
              </li>
              <li><a href="/app/restaurants">Places to eat &rarr;</a></li>
              <li><a href="/app/sightseeing">Check out the view! &rarr;</a></li>
            </ul>
          </trip-section>

          <trip-section section-class="preparations">
            <svg class="icon" slot="icon">
              <use href="/icons/preparations.svg#icon-suitcase" />
            </svg>
            <span slot="title" class="section-title">Preparations</span>
            <ul slot="links">
              <li><a href="/app/packing">Packing list &rarr;</a></li>
              <li>
                <a href="https://www.united.com">Book flights &rarr;</a>
              </li>
            </ul>
          </trip-section>

          <trip-section section-class="budget">
            <svg class="icon" slot="icon">
              <use href="/icons/budget.svg#icon-money" />
            </svg>
            <span slot="title" class="section-title">Budget</span>
            <ul slot="links">
              <li><a href="/app/budget">Calculator &rarr;</a></li>
            </ul>
          </trip-section>
        </trip-element>

        <section class="traveler-intro">
          <h2>Meet the travelers</h2>
          <a href="/app/traveler/someuser" class="traveler-link">
            <img
              src="/france.jpeg"
              alt="Our group traveling"
              class="traveler-image"
            />
          </a>
        </section>
      </article>
    `}};f.uses=S({"trip-element":v,"trip-section":u}),f.styles=n`
    article {
      padding: 1rem;
    }

    .traveler-intro {
      margin-top: 2rem;
      text-align: center;
    }

    .traveler-intro h2 {
      font-family: "Fjalla One", sans-serif;
      margin-bottom: 1rem;
    }

    .traveler-link {
      display: inline-block;
    }

    .traveler-image {
      max-width: 600px;
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  `;let y=f;var K=Object.defineProperty,N=(i,e,a,h)=>{for(var t=void 0,s=i.length-1,o;s>=0;s--)(o=i[s])&&(t=o(e,a,t)||t);return t&&K(e,a,t),t};const C=class C extends l{constructor(){super(...arguments),this._authObserver=new j(this,"miniature:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:a}=e;a&&a.authenticated?(this.loggedIn=!0,this.userid=a.username):(this.loggedIn=!1,this.userid=void 0)})}render(){return r`
      <header>
        <h1>Miniature Journey</h1>
        <nav>
          <a href="/app">Home</a>
          <a href="/app/transportation">Transportation</a>
          <a href="/app/restaurants">Restaurants</a>
          <a href="/app/sightseeing">Sightseeing</a>
          <a href="/app/packing">Packing</a>
          <a href="/app/budget">Budget</a>
          ${this.loggedIn?r`
                <span>Hello, ${this.userid}!</span>
                ${this.renderSignOutButton()}
              `:this.renderSignInButton()}
        </nav>
      </header>
    `}renderSignOutButton(){return r`
      <button
        @click=${e=>{D.relay(e,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInButton(){return r`
      <a href="/login.html">Sign In</a>
    `}static initializeOnce(){}};C.styles=n`
    :host {
      display: block;
    }
    
    header {
      padding: 1rem 2rem;
      background: #333;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    h1 {
      margin: 0;
      font-size: 1.5rem;
      font-family: "Fjalla One", sans-serif;
    }
    
    nav {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      flex-wrap: wrap;
    }
    
    nav a {
      color: white;
      text-decoration: none;
      font-size: 0.95rem;
    }
    
    nav a:hover {
      text-decoration: underline;
    }
    
    span {
      color: #ddd;
      font-size: 0.9rem;
    }
    
    button {
      padding: 0.5rem 1rem;
      background: #f44336;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    
    button:hover {
      background: #da190b;
    }
  `;let g=C;N([p()],g.prototype,"loggedIn");N([p()],g.prototype,"userid");const z=class z extends l{render(){return r`
      <article>
        <h1>Transportation</h1>
        <p>Planes, Trains and Automobiles information will go here.</p>
        <nav>
          <a href="/app">← Back to Home</a>
          <a href="/app/restaurants">Next: Restaurants →</a>
        </nav>
      </article>
    `}};z.styles=n`
    article {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-family: "Fjalla One", sans-serif;
      color: var(--color-main, #333);
      margin-bottom: 1rem;
    }

    nav {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    nav a {
      padding: 0.75rem 1.5rem;
      background: var(--color-main, #333);
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }

    nav a:hover {
      opacity: 0.9;
    }
  `;let w=z;const B=class B extends l{render(){return r`
      <article>
        <h1>Restaurants</h1>
        <p>Some quite good places to eat will go here.</p>
        <nav>
          <a href="/app">← Back to Home</a>
          <a href="/app/sightseeing">Next: Sightseeing →</a>
        </nav>
      </article>
    `}};B.styles=n`
    article {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-family: "Fjalla One", sans-serif;
      color: var(--color-main, #333);
      margin-bottom: 1rem;
    }

    nav {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    nav a {
      padding: 0.75rem 1.5rem;
      background: var(--color-main, #333);
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }

    nav a:hover {
      opacity: 0.9;
    }
  `;let x=B;const F=class F extends l{render(){return r`
      <article>
        <h1>Sightseeing</h1>
        <p>The best places to see and information will go here.</p>
        <nav>
          <a href="/app">← Back to Home</a>
          <a href="/app/transportation">Next: Transportation →</a>
        </nav>
      </article>
    `}};F.styles=n`
    article {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-family: "Fjalla One", sans-serif;
      color: var(--color-main, #333);
      margin-bottom: 1rem;
    }

    nav {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    nav a {
      padding: 0.75rem 1.5rem;
      background: var(--color-main, #333);
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }

    nav a:hover {
      opacity: 0.9;
    }
  `;let k=F;const I=class I extends l{render(){return r`
      <article>
        <h1>Packing</h1>
        <p>What to pack as a list will go here.</p>
        <nav>
          <a href="/app">← Back to Home</a>
          <a href="/app/budget">Next: Budget →</a>
        </nav>
      </article>
    `}};I.styles=n`
    article {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-family: "Fjalla One", sans-serif;
      color: var(--color-main, #333);
      margin-bottom: 1rem;
    }

    nav {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    nav a {
      padding: 0.75rem 1.5rem;
      background: var(--color-main, #333);
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }

    nav a:hover {
      opacity: 0.9;
    }
  `;let $=I;const T=class T extends l{render(){return r`
      <article>
        <h1>Budget</h1>
        <p>How to convert euros to dollars information will go here.</p>
        <nav>
          <a href="/app">← Back to Home</a>
          <a href="/app/transportation">Next: Transportation →</a>
        </nav>
      </article>
    `}};T.styles=n`
    article {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-family: "Fjalla One", sans-serif;
      color: var(--color-main, #333);
      margin-bottom: 1rem;
    }

    nav {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    nav a {
      padding: 0.75rem 1.5rem;
      background: var(--color-main, #333);
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }

    nav a:hover {
      opacity: 0.9;
    }
  `;let O=T;var L=Object.defineProperty,b=(i,e,a,h)=>{for(var t=void 0,s=i.length-1,o;s>=0;s--)(o=i[s])&&(t=o(e,a,t)||t);return t&&L(e,a,t),t};const H=class H extends l{constructor(){super(...arguments),this._authObserver=new j(this,"miniature:auth"),this.loading=!1}get src(){return`/api/travelers/${this.userid}`}get authorization(){return this._user?.authenticated?{Authorization:`Bearer ${this._user.token}`}:void 0}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{this._user=e.user,this._user?.authenticated&&this.userid&&this.loadTravelerData()})}loadTravelerData(){this.loading=!0,this.error=void 0,fetch(this.src,{headers:this.authorization}).then(e=>{if(e.status===200)return e.json();throw e.status===401?new Error("Unauthorized - please log in"):e.status===404?new Error("Traveler not found"):new Error("Failed to fetch traveler data")}).then(e=>{this.traveler=e,this.loading=!1}).catch(e=>{console.error("Error loading traveler data:",e),this.error=e.message,this.loading=!1})}render(){return this.loading?r`<div class="loading">Loading traveler profile...</div>`:this.error?r`<div class="error">Error: ${this.error}</div>`:this.traveler?r`
      <article class="traveler-profile">
        <h1>Traveler Profile: ${this.traveler.name||this.traveler.userid}</h1>

        <section class="profile-details">
          <dl>
            <dt>User ID:</dt>
            <dd>${this.traveler.userid}</dd>

            ${this.traveler.name?r`
                  <dt>Name:</dt>
                  <dd>${this.traveler.name}</dd>
                `:""}
            ${this.traveler.email?r`
                  <dt>Email:</dt>
                  <dd>${this.traveler.email}</dd>
                `:""}
          </dl>
        </section>

        <section class="profile-actions">
          <a href="/app" class="back-link">← Back to Home</a>
        </section>
      </article>
    `:r`<div class="empty">
        Please log in to view traveler profiles.
      </div>`}};H.styles=n`
    :host {
      display: block;
      padding: 2rem;
    }

    .traveler-profile {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-family: "Fjalla One", sans-serif;
      color: var(--color-main, #333);
      margin-bottom: 2rem;
    }

    .profile-details {
      background: var(--color-background-secondary, #f5f5f5);
      padding: 2rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    dl {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 1rem;
    }

    dt {
      font-weight: bold;
      color: var(--color-text-secondary, #666);
    }

    dd {
      margin: 0;
    }

    .loading,
    .error,
    .empty {
      padding: 2rem;
      text-align: center;
      border-radius: 8px;
    }

    .error {
      background: #ffebee;
      color: #c62828;
      border: 1px solid #ef5350;
    }

    .empty {
      background: #fff3e0;
      color: #e65100;
      border: 1px solid #fb8c00;
    }

    .back-link {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background: var(--color-main, #333);
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }

    .back-link:hover {
      opacity: 0.9;
    }
  `;let c=H;b([m({attribute:"user-id"})],c.prototype,"userid");b([p()],c.prototype,"traveler");b([p()],c.prototype,"loading");b([p()],c.prototype,"error");const Q=[{path:"/app/transportation",view:()=>r` <transportation-view></transportation-view> `},{path:"/app/restaurants",view:()=>r` <restaurants-view></restaurants-view> `},{path:"/app/sightseeing",view:()=>r` <sightseeing-view></sightseeing-view> `},{path:"/app/packing",view:()=>r` <packing-view></packing-view> `},{path:"/app/budget",view:()=>r` <budget-view></budget-view> `},{path:"/app/traveler/:userid",view:i=>r`
      <traveler-view userid=${i.userid}></traveler-view>
    `},{path:"/app",view:()=>r` <landing-view></landing-view> `},{path:"/",redirect:"/app"}];S({"landing-view":y,"mu-auth":M.Provider,"mu-history":R.Provider,"mu-switch":class extends U.Element{constructor(){super(Q,"miniature:history","miniature:auth")}},"app-header":g,"transportation-view":w,"restaurants-view":x,"sightseeing-view":k,"packing-view":$,"budget-view":O,"traveler-view":c});document.body.addEventListener("dark-mode:toggle",i=>{const e=i.currentTarget,a=i.detail.checked;e.classList.toggle("dark-mode",a)});window.toggleDarkMode=function(i,e){const a=new CustomEvent("dark-mode:toggle",{bubbles:!0,detail:{checked:e}});i.dispatchEvent(a)};
