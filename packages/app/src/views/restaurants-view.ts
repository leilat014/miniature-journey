import { html, css } from "lit";
import { View } from "@calpoly/mustang";
import { Model } from "../model";
import { Msg } from "../messages";

export class RestaurantsViewElement extends View<Model, Msg> {
  constructor() {
    super("miniature:auth");
  }

  renderList(city: string, items: string[]) {
    return html`
      <h3>${city}</h3>
      <ul>
        ${items.map((r) => html`<li>${r}</li>`)}
      </ul>
    `;
  }

  render() {
    return html`
      <h2>Restaurants</h2>

      ${this.renderList("Seville", [
        "El Rinconcillo",
        "La Azotea",
        "Eslava",
        "Becerrita",
      ])}
      ${this.renderList("Paris", [
        "Le Relais de l'Entrecôte",
        "Bouillon Chartier",
        "Le Comptoir du Relais",
        "Septime",
      ])}
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

customElements.define("restaurants-view", RestaurantsViewElement);
