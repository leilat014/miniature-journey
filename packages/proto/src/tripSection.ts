import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class tripSectionElement extends LitElement {
  @property()
  "icon-href"?: string;

  @property()
  "section-class"?: string;

  override render() {
    return html`<section class="${this["section-class"]}">
      <h2>
        <svg class="icon">
          <use href="${this["icon-href"]}" />
        </svg>
        <slot name="title"></slot>
      </h2>
      <slot name="links"></slot>
    </section> `;
  }

  static styles = css`
    svg.icon {
      display: inline;
      height: 2em;
      width: 2em;
      vertical-align: top;
      fill: currentColor;
    }

    section {
      order: 0;
      width: 300px;
      border: 2px solid var(--color-accent);
      padding: 1.5em;
    }

    h2 {
      color: var(--color-main);
      padding: 1em;
      font-family: "Fjalla One", sans-serif;
      font-style: normal;
      font-weight: 400;
    }

    ul {
      font-family: "Rubik", sans-serif;
      font-style: normal;
      font-weight: 500;
      padding-bottom: 2em;
    }

    a {
      font-family: "Rubik", sans-serif;
      font-style: normal;
      font-weight: 500;
    }
  `;
}
