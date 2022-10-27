import { useState } from "react";

import Item from "@encontrei/components/Layout/Item";
import {
  Container,
  ItemList,
  ItemsContainer,
} from "@encontrei/screens/App/Home/styles";

export default function Refused() {
  const [list, setList] = useState([
    {
      id: "1",
      title: "Kit de lápis",
      location: "Quadra",
      photo_url:
        "https://images.unsplash.com/photo-1593171333952-6a8da72d1877?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ]);

  return (
    <Container>
      <ItemsContainer>
        <ItemList
          data={list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item
              title={item.title}
              location={item.location}
              photo_url={item.photo_url}
            />
          )}
        />
      </ItemsContainer>
    </Container>
  );
}
