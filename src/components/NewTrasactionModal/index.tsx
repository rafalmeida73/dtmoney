import { FormEvent, useState } from "react";
import Modal from "react-modal";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { api } from "../../services/api";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTrasactionModalProps {
  isNewTransactionModalOpen: boolean;
  handleCloseNewTransactionModal: () => void;
}

export function NewTrasactionModal({
  handleCloseNewTransactionModal,
  isNewTransactionModalOpen,
}: NewTrasactionModalProps) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState(0);
  const [type, setType] = useState("deposit");

  const handleCreateNewTransaction = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      title,
      value,
      category,
      type,
    };

    api.post("/transactions", data);
  };

  return (
    <Modal
      isOpen={isNewTransactionModalOpen}
      onRequestClose={handleCloseNewTransactionModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        onClick={handleCloseNewTransactionModal}
        className="react-modal-close"
        type="button"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transacao</h2>

        <input
          type="text"
          placeholder="Titulo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="number"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(Number(e.target.value))}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
