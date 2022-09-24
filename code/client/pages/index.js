import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'

const styles = {
  wrapper: 'flex justify-center items-center h-screen w-screen bg-balck text-white',
  columns: 'flex justify-between h-full w-full text-center  text-white gap-0.5',
  sides: 'basis-1/4 bg-slate-900',
  feed: 'basis-1/2 bg-slate-800',
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Blog-x</title>
        <meta name="description" content="Blog-x" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={styles.wrapper}>
          <div className={styles.columns}>
            <h1 className={styles.sides}><Sidebar /></h1>
            <h1 className={styles.feed}>feed</h1>
            <h1 className={styles.sides}>widgets</h1>
          </div>
        </div>
      </main>
    </>
  )
}
