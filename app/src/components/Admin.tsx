import { useSeasonStore } from '../store/seasonStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import useSelectDateError from '../hooks/useSelectDateError';

const Admin = () => {
  const { allSeasons, currentSeason, currentSeasonId } = useSeasonStore(
    state => ({
      seasons: state.allSeasons,
      currentSeason: state.currentSeason,
      currentSeasonId: state.currentSeasonId,
    }),
  );

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
  });

  const handleOnChangeStartDate = (date, selected) => {
    setStartDate(date);
    const unixTimestampSelectedDate = Math.round(date.getTime() / 1000);
    const unixTimestampCurrentSeasonEndDate = Math.round(
      Date.parse(currentSeason.endDate) / 1000,
    );
    console.log('start date', startDate);
    console.log('start date timestamp', Math.round(startDate.getTime() / 1000));
    console.log('selected date is', date);
    console.log('selected date timestamp', Math.round(date.getTime() / 1000));
    console.log('currentSeason end date', currentSeason.endDate);
    console.log(
      'currentSeason end date timestamp',
      Math.round(Date.parse(currentSeason.endDate) / 1000),
    );

    console.log('errors', errors);

    if (unixTimestampSelectedDate < unixTimestampCurrentSeasonEndDate) {
      setErrors({
        ...errors,
        startDate:
          'Start date of the new season should be later than the end date of the current season',
      });
    }
  };

  const handleClick = () => {
    console.log('create a new season');
    const createSeason = {
      start_date: Math.round(startDate.getTime() / 1000),
      end_date: Math.round(endDate.getTime() / 1000),
    };
    console.log('createSeason is', createSeason);
  };

  // console.log('start date', startDate);
  // console.log('start date timestamp', Math.round(startDate.getTime() / 1000));
  // console.log('end date', endDate);
  // console.log('end date timestamp', Math.round(endDate.getTime() / 1000));
  // console.log('errors', errors);
  return (
    <div>
      <h1>Seasons</h1>
      <div className="flex flex-col">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Season</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody>
            {allSeasons.map(season => {
              return (
                <tr key={season.seasonId}>
                  <td>Season {season.seasonId}</td>
                  <td>{season.startDate.slice(0, 10)}</td>
                  <td>{season.endDate.slice(0, 10)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex flex-col">
          <button onClick={handleClick}>Create a new season</button>
          <div className="flex flex-row">
            <label htmlFor="startDate">
              Start date:
              <DatePicker
                name="startDate"
                selected={startDate}
                onChange={handleOnChangeStartDate}
              />
            </label>
            {errors.startDate && <h3>{errors.startDate}</h3>}
            <label htmlFor="endDate">
              End date:
              <DatePicker
                name="endDate"
                selected={endDate}
                onChange={date => setEndDate(date)}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
