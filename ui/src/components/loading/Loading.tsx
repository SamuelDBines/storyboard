import ReactLoading from 'react-loading';

type LoadingProps = {
  type?: any;
  color?: string;
};
const Loading = ({ type = 'balls', color = '#3498db' }: LoadingProps) => (
  <ReactLoading type={type} color={color} />
);

export default Loading;