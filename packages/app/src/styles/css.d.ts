declare module "*.css.js" {
  import { CSSResult } from "lit";
  const styles: { styles: CSSResult };
  export default styles;
}