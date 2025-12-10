import { css, html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";
import { Observer, Auth } from "@calpoly/mustang";

export class tripSectionElement extends LitElement {
  _authObserver = new Observer<Auth.Model>(this, "miniature:auth");
  _user?: Auth.User;

  @property()
  src?: string;

  @property()
  userid?: string;

  @state()
  sections: Array<Section> = [];

  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${(this._user as Auth.AuthenticatedUser).token}`,
      }
    );
  }

  render() {
    return html`${this.sections.map(
      (section) => html`
        <trip-section section-class="${section.sectionClass}">
          <svg class="icon" slot="icon">
            <use href="${section.icon}" />
          </svg>
          <span slot="title" class="section-title">${section.title}</span>
          <ul slot="links">
            ${section.links.map(
              (link) => html`
                <li><a href="${link.href}">${link.text} &rarr;</a></li>
              `
            )}
          </ul>
        </trip-section>
      `
    )}`;
  }

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;

      if (this._user?.authenticated) {
        if (this.userid) {
          this.hydrate(`/api/travelers/${this.userid}`);
        } else if (this.src) {
          this.hydrate(this.src);
        }
      } else if (this.src) {
        this.hydrate(this.src);
      }
    });
  }

  hydrate(url: string) {
    const isApiCall = url.startsWith("/api/");

    const fetchOptions =
      isApiCall && this.authorization ? { headers: this.authorization } : {};

    fetch(url, fetchOptions)
      .then((res) => {
        if (res.status === 401) {
          throw new Error("Unauthorized - please log in");
        }
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((json: object) => {
        if (json) {
          const data = json as {
            sections: Array<Section>;
          };
          this.sections = data.sections;
        }
      })
      .catch((error) => {
        console.error("Error loading data:", error);
      });
  }

  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2em;
      padding: 2em;
    }
  `;
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
