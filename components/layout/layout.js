import TopNav, { TopNavVariant } from "../top-nav";
import styles from "./styles.module.css";

export const LayoutVariant = {
  LandingPage: "landing-page",
  SearchPage: "search-page",
};

const variantToTopNavVariant = {
  [LayoutVariant.LandingPage]: TopNavVariant.Large,
  [LayoutVariant.SearchPage]: TopNavVariant.Small,
};

const variantToTitle = {
  [LayoutVariant.LandingPage]: "Realm Functions Manager",
  [LayoutVariant.SearchPage]: "Realm Functions Manager - Search",
};

export default function Layout({
  variant = LayoutVariant.SearchPage,
  children,
}) {
  return (
    <div className={styles.background}>
      <div className={styles.foreground}>
        <TopNav
          variant={variantToTopNavVariant[variant]}
          title={variantToTitle[variant]}
        />
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
}
