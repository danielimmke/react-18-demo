import { useEffect, useState, Suspense, lazy } from 'react'
import useSWR from 'swr'
import './App.css'

// Helper functions
const sleep = (ms) => new Promise(r => setTimeout(r, ms))

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Spinner = () => <div className="spinner"><div></div><div></div><div></div><div></div></div>

// Common pattern is to use a piece of state or something like React Query that provides the loading state for you.
const ExampleNoSuspense = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const simulateLoading = async () => {
      await sleep(2000)

      setIsLoading(false)
    }

    simulateLoading()
  }, []);

  if(isLoading) return <Spinner />

  return <div className="box red">This component doesn't use Suspense. Lame! 😡</div>
}

// Suspense - You describe the loading state in the JSX and can do dynamic imports of components. No data fetching support yet.
const ExampleSuspense = () => {
  const ExampleSuspenseBox = lazy(async () => {
    await sleep(4000); // Simulate loading for 3 seconds

    return import('./ExampleSuspenseBox');
  });

  return (
    <Suspense fallback={<Spinner />}>
      <ExampleSuspenseBox />
    </Suspense>
  )
}

// Suspense with Data Fetching using a third party library that has integrated the APIs.
const ExampleSuspenseDataFetching = () => {
  const { data } = useSWR('http://localhost:4000/data', fetcher, { suspense: true })

  return <div className="box dark-green">{data.message}</div>
}

function App() {
  return (
    <div className="App">
      <h1>Client Side Loading Patterns</h1>
      <ExampleNoSuspense />
      <ExampleSuspense />
      <Suspense fallback={<Spinner />}>
        <ExampleSuspenseDataFetching />
      </Suspense>
    </div>
  );
}

export default App
