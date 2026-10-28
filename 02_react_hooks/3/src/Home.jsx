import React, { useContext } from 'react';

import ThemeContext from './contexts';

const Home = () => {
  // BEGIN (write your solution here)
  const { theme } = useContext(ThemeContext);
  const { className } = theme;
  // END

  return (
    <article className={className}>
      Текст для вкладки Home
    </article>
  );
};

export default Home;
