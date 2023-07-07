import { Row } from 'antd';
import CardDecoration from '../components/CardDecoration';
import DescriptionCard from '../components/CardDescription';
import { columns } from './config';

const Statistics = () => {
  return (
    <>
      {columns.map((column) => {
        return <DescriptionCard key={column.title} config={column} />;
      })}
    </>
  );
};

export default Statistics;
