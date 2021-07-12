import Head from "next/head";
import WeatherList from "../components/Weather/WeatherList";
import WeeklyInspoNotification from "../components/WeeklyInspoNotification";
import DigitalReviewNotification from "../components/DigitalReviewNotification";
import BirthdayNotification from "../components/BirthdayNotification";
import Title from "../components/Title";
import Books from "../components/Books/Books";
import Logo from "../components/Logo/Logo";
import { fetchStrapiAPI } from "../lib/api";
import AnniversaryNotification from "../components/AnniversaryNotification";

export default function Home({ books, events, cities, members }) {
  return (
    <div>
      <Head>
        <title>Bae Notification</title>
        <meta name='description' content='Bae Notification' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex flex-wrap'>
        <Logo />
        <Title />
        <WeatherList cities={cities} />
        <WeeklyInspoNotification events={events} />
        <DigitalReviewNotification events={events} />
        <BirthdayNotification members={members} />
        <AnniversaryNotification members={members} />
        <Books books={books} />
      </main>
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
