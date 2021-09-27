const Header = ({ name }) => {
  console.log('course name (header):', name)
  return (
    <h1>{name}</h1>
  )
}

const Part = ({ content, exercises }) => {
  console.log('content and exercises (part):', content, exercises)
  return (
    <p>{content} {exercises}</p>
  )
}

const Content = ({ parts }) => {
  console.log('parts (content):', parts)
  const mappedContent = parts.map(part =>
    <Part key={part.id} content={part.name} exercises={part.exercises} />
  )
  return (
    <div>
      {mappedContent}
    </div>
  )
}

const Total = ({ parts }) => {
  console.log('parts (total):', parts)
  return (
    <b>total of {parts.reduce((sum, x) => sum + x.exercises, 0)} exercises</b>
  )
}

const Course = ({ courses }) => {
  console.log('a list of all the courses:', courses)

  const mappedCourses = courses.map(course =>
    <div key={course.id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
  console.log(mappedCourses);

  return (
    <div>
      {mappedCourses}
    </div>
  )
}

export default Course;