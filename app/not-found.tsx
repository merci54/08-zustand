import { Metadata } from "next";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "An error has occurred. This page was not found",
  openGraph: {
    title: "404 - Page not found",
    description: "An error has occurred. This page was not found",
    images: [
      {
        url: "https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_1280.jpg",
        width: 1200,
        height: 630,
        alt: "Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
