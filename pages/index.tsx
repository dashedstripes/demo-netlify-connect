import Head from 'next/head'
import Image from 'next/image'
export async function getStaticProps() {
  const QUERY = `
    query AllDrupalNodeArticle {
      allDrupalNodeArticle {
        nodes {
          id
          title
          created
        }
      }
    }
  `;

  const res = await fetch('https://adam-drupal-7tkaj7-prod.valhalla-api.io/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: QUERY
    })
  })

  const json = await res.json();

  return {
    props: {
      data: json?.data?.allDrupalNodeArticle?.nodes || []
    }
  }
}

const Home: React.FC<{ data: any }>  = ({ data }) => {

  return (
    <>
      <Head>
        <title>About Schwab</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container mx-auto px-20'>
        <img src="/header.png" alt="header" className='w-full'/>
        <img src="/hero.png" alt="hero" className='w-full'/>

        <div className='py-6'>
          <h2 className='text-2xl'>Recent News and Articles!</h2>

          <div className='grid grid-cols-3 gap-8 py-6'>
            {data?.map((item: any) => (
              <div key={item?.id} className='bg-slate-200 p-4'>
                <small>{new Date(item?.created).toDateString()}</small>
                <h3 className='text-xl mt-2'>{ item?.title }</h3>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default Home;