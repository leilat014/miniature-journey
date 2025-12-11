// packages/app/src/views/traveler-view.ts
import { define, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";
import { Traveler } from "server/models";
import { Msg } from "../messages";
import { Model } from "../model";

export class TravelerViewElement extends View<Model, Msg> {
  @property({ attribute: "userid" })
  userid?: string;

  @state()
  get profile(): Traveler | undefined {
    return this.model.profile;
  }

  constructor() {
    super("miniature:store");
  }

  static styles = css`
  :host {
    display: block;
    padding: 1rem;
    font-family: "Fjalla One", sans-serif;
  }

  h2, h3 {
    font-family: "Fjalla One", sans-serif;
    margin: 0.5rem 0 1rem;
    letter-spacing: 0.5px;
  }

  p, li, label {
    font-family: "Fjalla One", sans-serif;
  }

  ul {
    padding-left: 1.2rem;
  }

  a {
    color: #0077cc;
    text-decoration: none;
    font-family: "Fjalla One", sans-serif;
  }

  a:hover {
    text-decoration: underline;
  }

  /* Card-like containers (optional, but nice) */
  .card {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    margin: 1rem 0;
}
`;

  attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null) {
    super.attributeChangedCallback(name, oldVal, newVal);

    if (name === "userid" && newVal && newVal !== oldVal) {
      this.dispatchMessage(["profile/request", { userid: newVal }]);
    }
  }

  render() {
    const p = this.profile;

    if (!p) {
      return html`
        <div class="card">
          <h2>Loading traveler…</h2>
        </div>
      `;
    }

    return html`
      <div class="card">
        <h2>${p.name}</h2>
        <p><strong>Home:</strong> ${p.home}</p>
        <p><strong>Planned Trips:</strong> ${p.plannedTrips}</p>
        ${p.bio ? html`<p><strong>Bio:</strong> ${p.bio}</p>` : ""}
      </div>
    `;
  }
}

define({ "traveler-view": TravelerViewElement });
