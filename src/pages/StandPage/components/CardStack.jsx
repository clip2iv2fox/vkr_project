import React, { useState } from 'react';
import './CardStack.css';

const CardStack = ({ card, openModal }) => {
  const [isOpen, setIsOpen] = useState(false); // открытие dropdown

  // разворот при нажатии dropdown
  const dropdownItems = [
    <button key="action" onClick={() => openModal(true, card)}>
      Log
    </button>,
  ];

  // наполнение карточки
  const CardInfo = () => (
    card.status === "EMPTY" ? (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ margin: 0 }}>Пусто</span>
        <hr style={{ width: "275px", margin: 0 }} />
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
          <span style={{ margin: 0 }}>{card.device}</span>
          <span style={{ margin: 0 }}>{card.percent}</span>
        </div>
        <hr style={{ width: "275px", margin: 0 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: 0 }}>
          <span style={{ margin: 0 }}>Время</span>
          <span style={{ margin: 0 }}>{card.status === "PASS" ? "Завершено" :
            card.status === "INTERACT_LOC" || card.status === "INTERACT_REM" ? "Действие" :
              card.status === "FAIL" ? "Ошибка" :
                card.status === "ERROR" ? "Не отвечает" :
                  card.status === "PROGRES" ? "Тестирование" :
                    "Пусто"}</span>
        </div>
      </div>
    )
  );

  return (
    <div
      className={
        card.status === "PASS" ? "success" :
          card.status === "INTERACT_LOC" || card.status === "INTERACT_REM" ? "loading" :
            card.status === "FAIL" ? "danger" :
              card.status === "ERROR" ? "none" :
                card.status === "PROGRES" ? "info" :
                  "empty"
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <button onClick={() => setIsOpen(!isOpen)}>▼</button>
        </div>
        <div>
          {dropdownItems}
        </div>
      </div>
      <div>
        <CardInfo />
      </div>
    </div>
  );
};

export default CardStack;