import { LitElement, html, css } from "lit";

export class TransportationViewElement extends LitElement {
  render() {
    return html`
      <article>
        <h1>Transportation</h1>
        <p>Planes, Trains and Automobiles information will go here.</p>
        <nav>
          <a href="/app">← Back to Home</a>
          <a href="/app/restaurants">Next: Restaurants →</a>
        </nav>
      </article>
    `;
  }

  static styles = css`
    article {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-family: "Fjalla One", sans-serif;
      color: var(--color-main, #333);
      margin-bottom: 1rem;
    }

    nav {
      margin-top: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    nav a {
      padding: 0.75rem 1.5rem;
      background: var(--color-main, #333);
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }

    nav a:hover {
      opacity: 0.9;
    }
  `;
}