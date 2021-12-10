import TopNav, { TopNavVariant } from "../top-nav";
import styles from "./styles.module.css";

export const LayoutVariant = {
  LandingPage: "landing-page",
  SearchPage: "search-page",
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
    <>
      <TopNav variant={TopNavVariant.Small} title={variantToTitle[variant]} />
      <div className={styles.container}>{children}</div>
    </>
  );
}
