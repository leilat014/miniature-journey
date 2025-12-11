import { html, css, LitElement } from "lit";
import { state } from "lit/decorators.js";
import { Observer, Auth, Events } from "@calpoly/mustang";

export class HeaderElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "miniature:auth");

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;
      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }

  render() {
    return html`
      <header>
        <h1>Miniature Journey</h1>
        <nav>
          <a href="/app">Home</a>
          <a href="/app/transportation">Transportation</a>
          <a href="/app/restaurants">Restaurants</a>
          <a href="/app/sightseeing">Sightseeing</a>
          <a href="/app/activities">Activities</a>
          <a href="/app/packing">Packing</a>
          <a href="/app/budget">Budget</a>
          ${this.loggedIn
            ? html`
                <span>Hello, ${this.userid}!</span>
                ${this.renderSignOutButton()}
              `
            : this.renderSignInButton()
          }
        </nav>
      </header>
    `;
  }

  renderSignOutButton() {
    return html`
      <button
        @click=${(e: UIEvent) => {
          Events.relay(e, "auth:message", ["auth/signout"]);
        }}
      >
        Sign Out
      </button>
    `;
  }

  renderSignInButton() {
    return html`
      <a href="/login">Sign In</a>
    `;
  }

  static initializeOnce() {
    // Any one-time initialization if needed
  }

  static styles = css`
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
  `;
}