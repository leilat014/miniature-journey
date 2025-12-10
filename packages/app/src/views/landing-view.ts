import { css, html, LitElement } from "lit";
import { define } from "@calpoly/mustang";
import { tripSectionElement as TripWrapper } from "../components/trip-wrapper.ts";
import { tripSectionElement as TripSection } from "../components/tripSection.ts";
export class LandingView extends LitElement {
  static uses = define({
    "trip-element": TripWrapper,
    "trip-section": TripSection
  });

  render() {
    return html`
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
    `;
  }

  static styles = css`
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
  `;
}