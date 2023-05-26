import { useState } from 'react';

const useScreenModel = () => {
  const [outlined, setOutlined] = useState<boolean>(true);
  return {
    outlined,
    setOutlined,
  };
};

export default useScreenModel;
