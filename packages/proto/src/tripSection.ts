import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class tripSectionElement extends LitElement {
  override render() {
    return html`
      <section class="itinerary">
        <h2>
          <svg class="icon">
            <use href="/icons/itinerary.svg#icon-map" />
          </svg>
          Itinerary
        </h2>
        <ul>
          <li>
            <a href="transportation.html">Transportation &rarr;</a>
          </li>
          <li>
            <a href="restaurants.html">Restaurants &rarr;</a>
          </li>
          <li>
            <a href="sightseeing.html">Sightseeing &rarr;</a>
          </li>
          <li>
            <a href="activities.html">Activities &rarr;</a>
          </li>
        </ul>
      </section>
    `;
  }

  static styles = css``;
}
