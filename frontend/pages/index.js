import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import WeatherList from "../components/Weather/WeatherList";
import WeeklyInspoNotification from "../components/WeeklyInspoNotification";
import DigitalReviewNotification from "../components/DigitalReviewNotification";
import BirthdayNotification from "../components/BirthdayNotification";
import Title from "../components/Title";
import Books from "../components/Books/Books";
import { fetchStrapiAPI } from "../lib/api";

export default function Home({ books, events, cities, members }) {
  return (
    <div>
      <Head>
        <title>Bae Notification</title>
        <meta name='description' content='Bae Notification' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Title />
        <WeatherList cities={cities} />
        <WeeklyInspoNotification events={events} />
        <DigitalReviewNotification events={events} />
        <BirthdayNotification members={members} />
        <Books books={books} />
      </main>

      <footer className={styles.footer}>
        <a href='https://vercel.com' target='_blank' rel='noopener noreferrer'>
          Powered by{" "}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const books = await fetchStrapiAPI("/books");
  const events = await fetchStrapiAPI("/events");
  const cities = await fetchStrapiAPI("/cities");
  const members = await fetchStrapiAPI("/members");

  if (!books || !events || !cities) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      books,
      events,
      cities,
      members,
    },
    revalidate: 43200,
  };
}
