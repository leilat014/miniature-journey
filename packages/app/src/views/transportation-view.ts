import { html, css } from "lit";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";

export class TransportationViewElement extends View<Model, Msg> {
  static styles = css`
    :host {
      display: block;
      padding: 1rem;
      font-family: "Fjalla One", sans-serif;
    }

    h2,
    h3 {
      font-family: "Fjalla One", sans-serif;
      margin: 0.5rem 0 1rem;
      letter-spacing: 0.5px;
    }

    p,
    li,
    label {
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
    .ticket {
      display: flex;
      flex-direction: column;
      border: 2px dashed #333;
      padding: 16px;
      margin: 20px 0;
      border-radius: 12px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      margin: 4px 0;
    }
    h2 {
      margin-bottom: 8px;
    }
  `;

  constructor() {
    super("miniature:auth");
  }

  renderTicket(title: string, from: string, to: string, date: string) {
    return html`
      <div class="ticket">
        <h3>${title}</h3>
        <div class="row"><strong>From:</strong> ${from}</div>
        <div class="row"><strong>To:</strong> ${to}</div>
        <div class="row"><strong>Date:</strong> ${date}</div>
      </div>
    `;
  }

  render() {
    return html`
      <h2>Flight Tickets</h2>

      ${this.renderTicket(
        "Flight to Seville",
        "Paris (CDG)",
        "Seville (SVQ)",
        "2025-03-15"
      )}
      ${this.renderTicket(
        "Return Flight",
        "Seville (SVQ)",
        "Paris (CDG)",
        "2025-03-31"
      )}
    `;
  }
}

customElements.define("transportation-view", TransportationViewElement);
