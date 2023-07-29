import { useState } from "react";
const StatisticLine = ({ text, value }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            {text} {value}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
const Estadistics = ({ good, neutral, bad, all, average }) => {
  if (all == 0) {
    return <p>No feedback given</p>;
  } else {
    return (
      <>
        <h1>staditics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average / all} />
        <StatisticLine text="positive" value={(good / all) * 100 + "%"} />
      </>
    );
  }
};

const Button = ({ text, handle }) => {
  return <button onClick={handle}>{text}</button>;
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);

  const goodPress = () => {
    setGood(good + 1);
    setAll(all + 1);
    setAverage(average + 1);
  };

  const neutralPress = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
    setAverage(average + 0);
  };

  const badPress = () => {
    setBad(bad + 1);
    setAll(all + 1);
    setAverage(average - 1);
  };
  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handle={goodPress} />
      <Button text="neutral" handle={neutralPress} />
      <Button text="bad" handle={badPress} />
      <Estadistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
      />
    </div>
  );
};

export default App;
