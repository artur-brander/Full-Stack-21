import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ text, value }) => (

  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>

)

const Statistics = (props) => {
  const n = props.good + props.neutral + props.bad
  const average = (props.good + 0 * props.neutral + -1 * props.bad) / n
  const percentage = (props.good / n) * 100 + "%"
  if (n === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={n} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={percentage} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => { setGood(good + 1) }
  const increaseNeutral = () => { setNeutral(neutral + 1) }
  const increaseBad = () => { setBad(bad + 1) }

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={increaseGood}
        text='good'
      />
      <Button
        handleClick={increaseNeutral}
        text='neutral'
      />
      <Button
        handleClick={increaseBad}
        text='bad'
      />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App