import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import WeatherList from "../components/Weather/WeatherList";
import WeeklyInspoNotification from "../components/WeeklyInspoNotification";
import DigitalReviewNotification from "../components/DigitalReviewNotification";
import Title from "../components/Title";
import Books from "../components/Books/Books";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bae Notification</title>
        <meta name='description' content='Bae Notification' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Title />
        <WeatherList />
        <WeeklyInspoNotification />
        <DigitalReviewNotification />
        <Books />
      </main>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
