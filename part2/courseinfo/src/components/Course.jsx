const Header = ({ course }) => {
    return (
      <div>
        <h1>{course}</h1>
      </div>
    );
  };
  
  const Part = ({ name, number }) => {
    return (
      <div>
        <p>
          {name} {number}
        </p>
      </div>
    );
  };
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => (
          <Part key={part.id} name={part.name} number={part.exercises} />
        ))}
      </div>
    );
  };
  
  const Total = ({ parts }) => {
    const initialValue = 0;
    const sum = parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      initialValue
    );
    return (
      <div style={{ fontWeight: "bold" }}>
        <p>total of {sum} exercises</p>
      </div>
    );
  };
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };
export default Course;
