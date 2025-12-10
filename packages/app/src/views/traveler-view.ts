import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

interface Traveler {
  userid: string;
  name?: string;
  email?: string;
  // Add other fields from your Traveler model
}

export class TravelerViewElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "miniature:auth");
  _user?: Auth.User;

  @property({ attribute: "user-id" })
  userid?: string;

  @state()
  traveler?: Traveler;

  @state()
  loading = false;

  @state()
  error?: string;

  get src() {
    return `/api/travelers/${this.userid}`;
  }

  get authorization(): HeadersInit | undefined {
    return this._user?.authenticated
      ? {
          Authorization: `Bearer ${
            (this._user as Auth.AuthenticatedUser).token
          }`,
        }
      : undefined;
  }

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;

      if (this._user?.authenticated && this.userid) {
        this.loadTravelerData();
      }
    });
  }

  loadTravelerData() {
    this.loading = true;
    this.error = undefined;

    fetch(this.src, {
      headers: this.authorization,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("Unauthorized - please log in");
        } else if (res.status === 404) {
          throw new Error("Traveler not found");
        }
        throw new Error("Failed to fetch traveler data");
      })
      .then((data: Traveler) => {
        this.traveler = data;
        this.loading = false;
      })
      .catch((err) => {
        console.error("Error loading traveler data:", err);
        this.error = err.message;
        this.loading = false;
      });
  }

  render() {
    if (this.loading) {
      return html`<div class="loading">Loading traveler profile...</div>`;
    }

    if (this.error) {
      return html`<div class="error">Error: ${this.error}</div>`;
    }

    if (!this.traveler) {
      return html`<div class="empty">
        Please log in to view traveler profiles.
      </div>`;
    }

    return html`
      <article class="traveler-profile">
        <h1>Traveler Profile: ${this.traveler.name || this.traveler.userid}</h1>

        <section class="profile-details">
          <dl>
            <dt>User ID:</dt>
            <dd>${this.traveler.userid}</dd>

            ${this.traveler.name
              ? html`
                  <dt>Name:</dt>
                  <dd>${this.traveler.name}</dd>
                `
              : ""}
            ${this.traveler.email
              ? html`
                  <dt>Email:</dt>
                  <dd>${this.traveler.email}</dd>
                `
              : ""}
          </dl>
        </section>

        <section class="profile-actions">
          <a href="/app" class="back-link">← Back to Home</a>
        </section>
      </article>
    `;
  }

  static styles = css`
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
  `;
}
