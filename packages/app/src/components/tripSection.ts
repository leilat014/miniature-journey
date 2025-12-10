import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";
// import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import reset from "../styles/reset.css.ts";

export class tripSectionElement extends LitElement {
  @property()
  "icon-href"?: string;

  @property()
  "section-class"?: string;

  override render() {
    return html`<section class="${this["section-class"]}">
      <h2>
        <slot name="icon"></slot>
        <slot name="title"></slot>
      </h2>
      <slot name="links"></slot>
    </section> `;
  }

  static styles = [
    reset.styles,
    css`
      svg.icon {
        display: inline;
        height: 2em;
        width: 2em;
        vertical-align: top;
        fill: currentColor;
      }
      section {
        order: 0;
        padding: 1.5em;
      }
      h2 {
        color: var(--color-main);
        padding: 1em;
        font-family: "Fjalla One", sans-serif;
        font-style: normal;
        font-weight: 400;
        display: flex;
        align-items: center;
        gap: 0.5em;
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
      ::slotted(span[slot="title"]) {
        color: var(--color-main) !important;
        font-family: "Fjalla One", sans-serif !important;
        font-style: normal !important;
        font-weight: 400 !important;
      }
      ::slotted(ul) {
        font-family: "Rubik", sans-serif;
        font-style: normal;
        font-weight: 500;
        padding-bottom: 2em;
      }
    `,
  ];
}
