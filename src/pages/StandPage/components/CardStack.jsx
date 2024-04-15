import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, Divider, Dropdown, DropdownItem, Flex, FlexItem } from '@patternfly/react-core';
import { KebabToggle } from '@patternfly/react-core/dist/js/components/Dropdown';
import { CardActions } from '@patternfly/react-core/dist/js/components/Card';
import './CardStack.css';

const CardStack = ({ card, openModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const useTimeConverter = (timeString) => {
    const [currentTime, setCurrentTime] = useState('00:00:00');

    useEffect(() => {
      const updateTimer = () => {
        const dateObject = new Date(timeString);
        const currentTimeObject = new Date();
        const timeDifference = currentTimeObject.getTime() - dateObject.getTime();
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const addLeadingZero = (value) => (value < 10 ? `0${value}` : `${value}`);
        const formattedTime = `${addLeadingZero(hours)}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`;
        setCurrentTime(formattedTime);
      };

      const timerInterval = setInterval(updateTimer, 1000);
      updateTimer();

      return () => {
        clearInterval(timerInterval);
      };
    }, [timeString]);

    return currentTime;
  };

  const currentTime = useTimeConverter(card.start_time);

  const dropdownItems = [
    <DropdownItem key="action" component="button" onClick={() => openModal(true, card)}>
      Log
    </DropdownItem>,
  ];

  const CardInfo = () => (
    card.status === "EMPTY" ?
      <Flex direction={{ default: 'column' }} style={{ margin: 0 }}>
        <FlexItem style={{ margin: 0 }}>Empty</FlexItem>
        <Divider style={{ width: "275px", margin: 0 }} />
      </Flex>
      :
      <Flex direction={{ default: 'column' }} style={{ color: "white" }}>
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} direction={{ default: 'row' }} style={{ margin: 0 }}>
          <FlexItem style={{ margin: 0 }}>{card.device}</FlexItem>
          <FlexItem style={{ margin: 0 }}>{card.percent}</FlexItem>
        </Flex>
        <Divider style={{ width: "275px", margin: 0 }} />
        <Flex justifyContent={{ default: 'justifyContentSpaceBetween' }} direction={{ default: 'row' }} style={{ margin: 0 }}>
          <FlexItem style={{ margin: 0 }}>{currentTime}</FlexItem>
          <FlexItem style={{ margin: 0 }}>{card.status === "PASS" ? "Completed" : card.status === "INTERACT_LOC" || card.status === "INTERACT_REM" ? "Action Required" : card.status === "FAIL" ? "Error" : card.status === "ERROR" ? "Unresponsive" : card.status === "PROGRES" ? "Testing" : "Empty"}</FlexItem>
        </Flex>
      </Flex>
  );

  return (
    <Card isFullHeight isCompact isRounded className={card.status === "PASS" ? "success" : card.status === "INTERACT_LOC" || card.status === "INTERACT_REM" ? "loading" : card.status === "FAIL" ? "danger" : card.status === "ERROR" ? "none" : card.status === "PROGRES" ? "info" : "empty"}>
      <CardHeader>
        <CardActions>
          <Dropdown onSelect={() => setIsOpen(!isOpen)} toggle={<KebabToggle onToggle={setIsOpen} />} isOpen={isOpen} isPlain dropdownItems={dropdownItems} position={'right'} />
        </CardActions>
        <CardTitle>
          <CardInfo />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default CardStack;
