import React from 'react';
import { Link } from 'react-router-dom';
import Head from './Head';
import styles from './Produtos.module.css';

const Produtos = () => {
  // Colocando a resposta do fetch em um estado reativo.
  const [produtos, setProdutos] = React.useState(null);

  // Utilizando o hook use.Effect() para renderizar
  // apenas uma vez, quando a página for carregada.
  React.useEffect(() => {
    fetch('https://ranekapi.origamid.dev/json/api/produto')
      .then((r) => r.json())
      // Setando a resposta do fetch (json) em um estado reativo.
      .then((json) => setProdutos(json));
  }, []);

  // Se o retorno do fetch for vazio, retorna vazio para evitar o erro.
  if (produtos === null) return null;
  return (
    <section className={`${styles.produtos} animeLeft`}>
      <Head title="Lista-Itens" description="Descrição do site Lista-Itens" />
      {/* Todo map() é necessário que o elemento de retorno tenha uma key */}
      {produtos.map((produto) => (
        <Link to={`produto/${produto.id}`} key={produto.id}>
          <img src={produto.fotos[0].src} alt={produto.fotos[0].titulo} />
          <h1 className={styles.nome}>{produto.nome}</h1>
        </Link>
      ))}
    </section>
  );
};

export default Produtos;
