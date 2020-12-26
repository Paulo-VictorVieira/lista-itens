import React from 'react';

const Head = (props) => {
  // Utilizado para fazer a mudança reativa
  // do título e descrição da página.

  React.useEffect(() => {
    document.title = props.title;
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', props.description);
  }, [props]);

  return <></>;
};

export default Head;
