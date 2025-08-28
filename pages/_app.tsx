import { AppProps } from 'next/app';
import './styles.css';

// This default export is required in a new `pages/_app.tsx` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
