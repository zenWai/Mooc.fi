import {ChangeEvent, FC, useState} from 'react';
import {Weather, Visibility, DiaryEntry} from '../types/DiaryTypes';

interface Props {
  addEntry: (newEntry: Omit<DiaryEntry, 'id'>) => void;
}

const AddDiaryEntry: FC<Props> = ({addEntry}) => {
  const [newEntry, setNewEntry] = useState({
    date: '',
    weather: Weather.Sunny,
    visibility: Visibility.Great,
    comment: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setNewEntry({...newEntry, [name]: value});
  };

  const handleSubmit = () => {
    addEntry(newEntry);
    setNewEntry({
      date: '',
      weather: Weather.Sunny,
      visibility: Visibility.Great,
      comment: '',
    });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <div>
        <label>Date: </label>
        <input type="date" name="date" value={newEntry.date} onChange={handleInputChange}/>
      </div>
      <div>
        <label>Weather: </label>
        <select name="weather" value={newEntry.weather} onChange={handleInputChange}>
          {Object.values(Weather).map((weather) => (
            <option key={weather} value={weather}>
              {weather}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Visibility: </label>
        <select name="visibility" value={newEntry.visibility} onChange={handleInputChange}>
          {Object.values(Visibility).map((visibility) => (
            <option key={visibility} value={visibility}>
              {visibility}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Comment: </label>
        <input type="text" name="comment" value={newEntry.comment} onChange={handleInputChange}/>
      </div>
      <button onClick={handleSubmit}>Add Entry</button>
    </div>
  );
};

export default AddDiaryEntry;