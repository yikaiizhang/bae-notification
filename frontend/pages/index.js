import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import WeatherList from "../components/WeatherList";
import WeeklyInspoNotification from "../components/WeeklyInspoNotification";
import DigitalReviewNotification from "../components/DigitalReviewNotification";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Bae Notification</title>
        <meta name='description' content='Bae Notification' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Hello 👋</h1>
        <WeatherList />
        <WeeklyInspoNotification />
        <DigitalReviewNotification />
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
