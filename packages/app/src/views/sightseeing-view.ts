import { html, css } from "lit";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";

export class SightseeingViewElement extends View<Model, Msg> {
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
    img {
      max-width: 100%;
      border-radius: 12px;
      margin: 12px 0;
    }
  `;

  constructor() {
    super("miniature:auth");
  }

  render() {
    return html`
      <h2>Sightseeing in Seville</h2>

      <h3>Top Attractions</h3>
      <ul>
        <li>Seville Cathedral & Giralda Tower</li>
        <li>Plaza de España</li>
        <li>Real Alcázar</li>
        <li>Metropol Parasol (Las Setas)</li>
        <li>Torre del Oro</li>
      </ul>

      <h3>Map of Seville</h3>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Sevilla_map.png"
        alt="Map of Seville"
      />
    `;
  }
}

customElements.define("sightseeing-view", SightseeingViewElement);
