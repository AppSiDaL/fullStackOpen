import React from "react"; // Asegúrate de importar React

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;
interface ContentProps {
  courseParts: CoursePart[];
}

interface PartProps {
  courseParts: CoursePart[];
}

interface PartProps {
  courseParts: CoursePart[];
}

const Part: React.FC<PartProps> = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part, index) => (
        <div key={index}>
          <strong>
            {part.name} {part.exerciseCount}
            </strong>
          {part.kind === "basic" && (
            <>
              <p>{part.description}</p>
            </>
          )}
          {part.kind === "group" && (
            <>
              <p>Project exercises {part.groupProjectCount}</p>
            </>
          )}
          {part.kind === "background" && (
            <>
              <p>{part.description}</p>
              <p>submit to {part.backgroundMaterial}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Part;
