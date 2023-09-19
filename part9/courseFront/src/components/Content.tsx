import Part from "./Part";

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

const Content = (props: ContentProps) => {
  return (
    <div>
      <Part courseParts={props.courseParts} />
    </div>
  );
};

export default Content;
