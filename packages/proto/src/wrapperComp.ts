import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

export class tripSectionElement extends LitElement {
  @property()
  src?: string;

  @state()
  sections: Array<Section> = [];

  render() {
    return html`${this.sections.map((section) => html`
      <trip-section section-class="${section.sectionClass}">
        <svg class="icon" slot="icon">
          <use href="${section.icon}" />
        </svg>
        <span slot="title" class="section-title">${section.title}</span>
        <ul slot="links">
          ${section.links.map((link) => html`
            <li><a href="${link.href}">${link.text} &rarr;</a></li>
          `)}
        </ul>
      </trip-section>
    `)}
  `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

hydrate(src: string) {
  fetch(src)
    .then((res) => res.json())
    .then((json: object) => {
      if (json) {
        const data = json as {
          sections: Array<Section>
        };
        this.sections = data.sections;
      }
    })
    .catch((error) => {
      console.error("Error loading data:", error);
    });
}
}

interface Section {
  icon: string;
  sectionClass: string;
  title: string;
  links: Array<Link>;
}

interface Link {
    text: string;
    href: string;
}
