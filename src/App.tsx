import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Card } from "./components/Card";
import { items, Items } from "./items";
function App() {
  const [cards, setCards] = useState(items);
  const [currentCards, setCurrentCards] = useState<Items[]>([]);
  const [attempts, setAttempts] = useState(0);
  const selectCard = (item: Items) => {
    changeDisplayCard(item, "inline");
    onChangeCurrentCard(item);
  };
  const onChangeCurrentCard = (item: Items) => {
    if (item.display === "none") {
      setCurrentCards((state) => [...state, item]);
    }
  };
  const notIsEqual = (previuos: Items, last: Items) => {
    return previuos.value !== last.value;
  };
  const changeDisplayCard = (item: Items, display: any) => {
    const oldCardsState: Items[] = cards.map((e) => {
      if (e.id === item.id) {
        return { ...e, display };
      }
      return e;
    });
    setCards(oldCardsState);
  };
  const clearAll = () => {
    const oldCardsState: Items[] = cards.map((e) => {
      return { ...e, display: "none" };
    });
    setCards(oldCardsState);
    setCurrentCards([]);
    setAttempts(0);
  };
  const isPair = useCallback(() => {
    if (currentCards.length === 2) {
      if (notIsEqual(currentCards[0], currentCards[1])) {
        changeDisplayCard(currentCards[1], "inline");
        setAttempts((state) => state + 1);
        setTimeout(() => {
          const oldCardsState: Items[] = cards.map((e) => {
            if (e.id === currentCards[0].id || e.id === currentCards[1].id) {
              return { ...e, display: "none" };
            }
            return e;
          });
          setCards(oldCardsState);
        }, 350);
        setCurrentCards([]);
        return;
      }
      setCurrentCards([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCards]);
  useEffect(() => {
    isPair();
    return () => {};
  }, [currentCards, isPair]);

  return (
    <div>
      <h5>Attempts {attempts}</h5>
      <div className="App">
        {cards.map((e, index) => {
          return <Card value={e} key={index} onClick={selectCard} />;
        })}
      </div>
      <button onClick={clearAll}>Clear all</button>
    </div>
  );
}
export default App;
