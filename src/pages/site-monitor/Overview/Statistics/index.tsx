import CardDecoration from '../components/CardDecoration';
import DescriptionCard from '../components/CardDescription';
import { columns } from './config';

const Statistics = () => {
  return (
    <CardDecoration>
      {columns.map((column) => {
        return <DescriptionCard key={column.title} config={column} />;
      })}
    </CardDecoration>
  );
};

export default Statistics;
