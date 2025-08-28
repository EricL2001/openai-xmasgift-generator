import React from 'react';
import Head from "next/head";
import { useState, FormEvent } from "react";
import styles from "./index.module.css";
import Footer from "./footer";

type Gender = 'man' | 'woman';

interface GiftFormData {
  gender: Gender;
  age: number | undefined;
  priceMin: number | undefined;
  priceMax: number | undefined;
  hobbies: string;
}

interface ApiResponse {
  result?: string;
  error?: {
    message: string;
  };
}

export default function Home(): JSX.Element {
  const [gender, setGender] = useState<Gender>('man');
  const [age, setAge] = useState<number | undefined>();
  const [priceMin, setPriceMin] = useState<number | undefined>();
  const [priceMax, setPriceMax] = useState<number | undefined>();
  const [hobbies, setHobbies] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | undefined>();

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (loading) {
      return;
    }

    // Validate required fields
    if (!age || !priceMin || !priceMax || !hobbies.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/generate-gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
      });

      const data: ApiResponse = await response.json();
      if (response.status !== 200) {
        throw new Error(data.error?.message || `Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setLoading(false);

      
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert(errorMessage);
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>Generate Xmas Gifts</title>
        <link rel="icon" href="/santa-claus.png" />
      </Head>

      <main className={styles.main}>
        <img src="/santa-claus.png" className={styles.icon} />
        <h3>Christmas Gift Generator</h3>
          <div className={styles.typewriter}>
            <p className={styles.ai}>Powered by OpenAI</p>
          </div>

        <form onSubmit={onSubmit}>
          <label className={styles.label}>Who is the gift for?</label>
          <select
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
          >
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>

          <label>Age</label>
          <input
            type="number"
            min={1}
            max={99}
            name="age"
            placeholder="Enter the age"
            value={age || ''}
            onChange={(e) => setAge(e.target.value ? parseInt(e.target.value, 10) : undefined)}
          />

          <label>Minimum Price</label>
          <input
            type="number"
            min={1}
            name="priceMin"
            placeholder="Set minimum price"
            value={priceMin || ''}
            onChange={(e) => setPriceMin(e.target.value ? parseInt(e.target.value, 10) : undefined)}
          />

          <label>Maximum Price</label>
          <input
            type="number"
            max={10000}
            name="priceMax"
            placeholder="Set maximum price"
            value={priceMax || ''}
            onChange={(e) => setPriceMax(e.target.value ? parseInt(e.target.value, 10) : undefined)}
          />

          <label>Interests or Hobbies</label>
          <input
            type="text"
            name="hobbies"
            placeholder="Enter each separated by comma"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
          />
          <input type="submit" value="Generate Gift Ideas" />
        </form>

        {loading && (
          <div>
            <h4>...searching for the best gift ideas 🎁</h4>
          </div>
        )}
        {result && (
          <div className={styles.result}>
            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
              {result}
            </pre>
          </div>
        )}
      </main>
      <Footer/>
    </div>
  );
}
