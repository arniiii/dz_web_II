import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// BEGIN (write your solution here)
const LanguagePanel = ({ children }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="App">
      <div className="btn-group mb-3" role="group">
        {['en', 'ru'].map((language) => (
          <button key={language} type="button" data-testid={language}
            className={i18n.language === language ? 'btn btn-primary' : 'btn btn-outline-primary'}
            onClick={() => i18n.changeLanguage(language)}>{t(`languages.${language}`)}</button>
        ))}
      </div>
      <br />
      {children}
    </div>
  );
};

const FactorialButtons = ({ onSelect }) => {
  const { t } = useTranslation();
  return (
    <div className="btn-group mb-3" role="group">
      {[1, 5, 10, 20].map((number) => (
        <button key={number} type="button" className="btn btn-outline-primary" onClick={() => onSelect(number)}>
          {`${t('factorial')} ${number}`}
        </button>
      ))}
    </div>
  );
};

const Factorial = ({ number }) => {
  let result = 1;
  for (let factor = 2; factor <= number; factor += 1) result *= factor;
  return <div>{`Factorial of ${number} is ${result}`}</div>;
};

const Calculator = () => {
  const [number, setNumber] = useState(0);
  return <><FactorialButtons onSelect={setNumber} /><Factorial number={number} /></>;
};

const App = () => <LanguagePanel><Calculator /></LanguagePanel>;
// END

export default App;
