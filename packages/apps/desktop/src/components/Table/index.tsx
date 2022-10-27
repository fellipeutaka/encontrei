import { ReactNode } from "react";

import { Container } from "./styles";

interface TableProps {
  body: ReactNode;
}

export function Table({ body }: TableProps) {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Descrição</th>
            <th>Local</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Foto</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{body}</tbody>
      </table>
    </Container>
  );
}
