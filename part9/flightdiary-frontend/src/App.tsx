import React, {useEffect, useState} from 'react';
import {DiaryEntry} from './types/DiaryTypes';
import AddDiaryEntry from "./components/NewAppDiaryEntry";
import axios from "axios";
import AppDiaryEntry from "./components/AppDiaryEntry";

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3003/api/diaries')
      .then((response) => {
        setDiaries(response.data);
      })
      .catch(() => {
        setError(`Failed to fetch diaries.`);
      });
  }, []);

  const addEntry = (newEntry: Omit<DiaryEntry, 'id'>) => {
    axios.post('http://localhost:3003/api/diaries', newEntry)
      .then((response) => {
        setDiaries([...diaries, response.data]);
      })
      .catch((error) => {
        setError(`Error: ${error.response?.data || 'An unknown error occurred.'} `);
      });
  };

  return (
    <div>
      <h1>Diaries</h1>
      {error && <p>{error}</p>}
      <AddDiaryEntry addEntry={addEntry}/>
      <AppDiaryEntry diaries={diaries}/>
    </div>
  );
};

export default App;