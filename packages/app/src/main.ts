import { LandingView } from "./views/landing-view.ts";
import { Auth, define, History, Switch } from "@calpoly/mustang";
import { html } from "lit";
import { HeaderElement } from "./components/header.ts";
import { TransportationViewElement } from "./views/transportation-view";
import { RestaurantViewElement } from "./views/restaurants-view";
import { SightseeingViewElement } from "./views/sightseeing-view";
import { PackingViewElement } from "./views/packing-view";
import { BudgetViewElement } from "./views/budget-view";

const routes = [
  {
    path: "/app/transportation",
    view: () => html` <transportation-view></transportation-view> `,
  },
  {
    path: "/app/restaurants",
    view: () => html` <restaurants-view></restaurants-view> `,
  },
  {
    path: "/app/sightseeing",
    view: () => html` <sightseeing-view></sightseeing-view> `,
  },
  {
    path: "/app/packing",
    view: () => html` <packing-view></packing-view> `,
  },
  {
    path: "/app/budget",
    view: () => html` <budget-view></budget-view> `,
  },
  {
    path: "/app/traveler/:userid",
    view: (params: Switch.Params) => html`
      <traveler-view userid=${params.userid}></traveler-view>
    `,
  },
  {
    path: "/app",
    view: () => html` <landing-view></landing-view> `,
  },
  {
    path: "/",
    redirect: "/app",
  },
];

// Define all custom elements
define({
  "landing-view": LandingView,
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "miniature:history", "miniature:auth");
    }
  },
  "app-header": HeaderElement,
  "transportation-view": TransportationViewElement,
  "restaurants-view": RestaurantViewElement,
  "sightseeing-view": SightseeingViewElement,
  "packing-view": PackingViewElement,
  "budget-view": BudgetViewElement,
});

// Dark mode toggle functionality
document.body.addEventListener("dark-mode:toggle", (event) => {
  const page = event.currentTarget as HTMLElement;
  const checked = (event as CustomEvent).detail.checked;
  page.classList.toggle("dark-mode", checked);
});

declare global {
  interface Window {
    toggleDarkMode: (target: HTMLElement, checked: boolean) => void;
  }
}

window.toggleDarkMode = function (target: HTMLElement, checked: boolean) {
  const customEvent = new CustomEvent("dark-mode:toggle", {
    bubbles: true,
    detail: { checked },
  });
  target.dispatchEvent(customEvent);
};
