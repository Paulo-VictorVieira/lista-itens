import React from 'react';
import { useParams } from 'react-router-dom';
import Head from './Head';
import styles from './Produto.module.css';

const Produto = () => {
  // Colocando a resposta do fetch em um estado reativo.
  const [produto, setProduto] = React.useState(null);
  // Estado de loading para ser usado quando iniciar o fetch.
  const [loading, setLoading] = React.useState(false);
  // Estado de erro para ser usado no catch.
  const [error, setError] = React.useState(null);

  // Para ter acesso ao parâmetro da rota atual utiliza-se o useParams()
  // que retorna um objeto com essa informação.
  const { id } = useParams();

  // Utilizando o useEffect() para fazer um fetch inicial toda vez
  // que o id da array de depedência for alterado.
  React.useEffect(() => {
    async function fetchProduto(url) {
      try {
        setLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        // Setando a resposta do fetch (json) em um estado reativo.
        setProduto(json);
        // catch, pega todos os erros ocorridos no try.
      } catch (erro) {
        setError('Um erro ocorreu');
        // finally, utilizado quando tudo acabar
        // independente de erro ou acerto
      } finally {
        setLoading(false);
      }
    }
    fetchProduto(`https://ranekapi.origamid.dev/json/api/produto/${id}`);
  }, [id]);

  // Se o loading for verdadeiro, retorna uma pequena animação.
  if (loading) return <div className="loading"></div>;
  // Se existir erro, retorna a mensagem de erro.
  if (error) return <p>{error}</p>;
  // Verifica a existência dos produtos no fetch.
  if (produto === null) return null;
  return (
    <section className={`${styles.produto} animeLeft`}>
      <Head
        title={`Lista-Itens | ${produto.nome}`}
        description={`Lista-Itens | Esse é um produto: ${produto.nome}`}
      />
      <div>
        {' '}
        {produto.fotos.map((foto) => (
          <img key={foto.src} src={foto.src} alt={foto.titulo} />
        ))}
      </div>
      <div>
        <h1>{produto.nome}</h1>
        <span className={styles.preco}>R$: {produto.preco}</span>
        <p className={styles.descricao}>{produto.descricao}</p>
      </div>
    </section>
  );
};

export default Produto;
