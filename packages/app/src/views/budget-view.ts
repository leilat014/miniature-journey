import { html, css } from "lit";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";

export class BudgetViewElement extends View<Model, Msg> {
  constructor() {
    super("miniature:auth");
    this.euros = 0;
    this.rate = 1.08; // example rate
  }

  euros: number;
  rate: number;

  setEuroValue(e: Event) {
    const input = e.target as HTMLInputElement;
    this.euros = Number(input.value || 0);
    this.requestUpdate();
  }

  render() {
    const dollars = (this.euros * this.rate).toFixed(2);

    return html`
      <h2>Euro → Dollar Converter</h2>

      <label>
        Euros:
        <input type="number" @input=${this.setEuroValue} placeholder="0" />
      </label>

      <p><strong>Dollars:</strong> $${dollars}</p>
      <p>Rate: €1 = $${this.rate}</p>
    `;
  }

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
  `;
}

customElements.define("budget-view", BudgetViewElement);
