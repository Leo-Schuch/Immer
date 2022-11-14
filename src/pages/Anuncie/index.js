import Header from "components/Header";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Anuncie.module.scss";
import { useForm } from "react-hook-form";
import { Button } from "components/Button";
import { cadastrarItem } from "store/reducers/itens";

export default function Anuncie() {
  const dispatch = useDispatch();
  const categorias = useSelector((state) =>
    state.categorias.map(({ nome, id }) => ({ nome, id }))
  );
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoria: "",
    },
  });
  const { errors } = formState;

  function cadastrar(data) {
    dispatch(cadastrarItem(data))
  }

  console.log(errors); // Para ver o objeto errors mudando!

  return (
    <div className={styles.container}>
      <Header
        titulo="Anuncie aqui!"
        descricao="Anuncie seu produto no melhor site do Brasil!"
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <input
          className={errors.nome ? styles["input-erro"] : ""}
          {...register("titulo", { required: true })}
          placeholder="Nome do produto"
          alt="nome do produto"
        />
        {errors.nome && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.nome.message}{" "}
          </span>
        )}
        <input
          className={errors.descricao ? styles["input-erro"] : ""}
          {...register("descricao", {
            required: true,
          })}
          placeholder="Descrição do produto"
          alt="descrição do produto"
        />
        {errors.descricao && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.descricao.message}{" "}
          </span>
        )}
        <input
          className={errors.imagem ? styles["input-erro"] : ""}
          {...register("foto", { required: true })}
          placeholder="URL da imagem do produto"
          alt="URL da imagem do produto"
        />
        {errors.imagem && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.imagem.message}{" "}
          </span>
        )}
        <select
          className={errors.categoria ? styles["input-erro"] : ""}
          {...register("categoria", {
            required: true,
          })}
        >
          <option value="" disabled>
            {" "}
            Selecione a categoria{" "}
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        {errors.categoria && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.categoria.message}{" "}
          </span>
        )}
        <input
          className={errors.preco ? styles["input-erro"] : ""}
          {...register("preco", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Preço do produto"
        />
        {errors.preco && (
          <span className={styles["mensagem-erro"]}>
            {" "}
            {errors.preco.message}{" "}
          </span>
        )}
        <Button type="submit">Cadastrar produto</Button>
      </form>
    </div>
  );
}
