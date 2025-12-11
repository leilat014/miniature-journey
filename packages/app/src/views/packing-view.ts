import { html, css } from "lit";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";

export class PackingViewElement extends View<Model, Msg> {
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
    ul {
      list-style: none;
      padding: 0;
    }
    li {
      margin: 8px 0;
    }
  `;

  constructor() {
    super("miniature:auth");
    this.items = [
      "7 shirts",
      "3 pairs of pants",
      "7 sets of underwear",
      "Sleepwear",
      "Walking shoes",
      "Toiletries",
      "Travel adapter",
      "Medication",
      "Light jacket",
      "Portable charger",
    ].map((text) => ({ text, checked: false }));
  }

  items: { text: string; checked: boolean }[];

  toggle(index: number) {
    this.items[index].checked = !this.items[index].checked;
    this.requestUpdate();
  }

  render() {
    return html`
      <h2>Packing Checklist</h2>

      <ul>
        ${this.items.map(
          (i, idx) => html`
            <li>
              <label>
                <input
                  type="checkbox"
                  .checked=${i.checked}
                  @change=${() => this.toggle(idx)}
                />
                ${i.text}
              </label>
            </li>
          `
        )}
      </ul>
    `;
  }
}

customElements.define("packing-view", PackingViewElement);
