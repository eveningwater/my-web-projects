interface CustomTagProps {
  color?: string;
  value?: string;
}
import './custom-tag.css';
const CustomTag = (props: CustomTagProps) => {
  const { color, value } = props;
  return (
    <span className="base-tag" style={{ background: color }}>
      {value}
    </span>
  );
};

export default CustomTag;
