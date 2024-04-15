import React, { useEffect, useState } from 'react'
import CardStack from './components/CardStack';
import './StandPage.css'
import { useLocation } from 'react-router-dom';
import { get_id, get, get_time } from '../../configs/axios_configs';
import { Flex, FlexItem, Page, Split, SplitItem} from '@patternfly/react-core';

const StandPage = () => {
    const [time, setTime] = useState("");                           // время последнего обновления данных
    const [stand, setStand] = useState({
        id: "1",
        name: "Stand 1",
        x: "5",
        y: "5",
        create_at: "2024-04-15T08:00:00Z",
        modified_at: "2024-04-15T08:00:00Z"
    });
    const [devices, setDevices] = useState([                       // тестируемое данного стенда
        {
            id: "",
            device: "",
            zone: "",
            x: "",
            y: "",
            user: "",
            percent: "",
            ip: "",
            status: "",
            beginning: "",
            start_time: ""
        }
    ]);
    const [loadingStand, setLoadingStand] = useState(true);        // флаг проходит ли сейчас начальная загрузка стендов
    const [loadingDevices, setLoadingDevices] = useState(true);    // флаг проходит ли сейчас начальная загрузка тестируемого
    const [errorTime, setErrorTime] = useState(false);                      // ошибка при загрузке времени
    const [errorData, setErrorData] = useState(false);                      // ошибка при загрузке данных
    const [isModalOpen, setIsModalOpen] = useState(false)          // открыто ли модальное окно логов
    const [logsCard, setCardLogs] = useState()
    const logs = []

    // определение страницы для получения данных
    const id = useLocation();

    // Function to generate fake data for testing
    const generateFakeData = () => {
        // Generate fake stand data
        const fakeStand = {
            id: "1",
            name: "Stand 1",
            x: "5",
            y: "5",
            create_at: "2024-04-15T08:00:00Z",
            modified_at: new Date().toISOString()
        };

        // Generate fake device data
        const fakeDevices = [];
        for (let i = 1; i <= 5; i++) {
            for (let j = 1; j <= 5; j++) {
                fakeDevices.push({
                    id: `${i * j}`,
                    device: `Device ${i * j}`,
                    zone: "1",
                    x: `${i}`,
                    y: `${j}`,
                    user: `User ${i * j}`,
                    percent: `${Math.floor(Math.random() * 100)}`,
                    ip: `192.168.${i}.${j}`,
                    status: Math.random() > 0.5 ? "PASS" : "ERROR",
                    beginning: "2024-04-15T08:00:00Z",
                    start_time: "2024-04-15T08:00:00Z"
                });
            }
        }

        setStand(fakeStand);
        setDevices(fakeDevices);
    };

    // Use effect to generate fake data on component mount
    useEffect(() => {
        generateFakeData();
    }, []);
    // получение данных
    useEffect(() => {
        // получение данных
        const fetchData = async () => {
            try {
                setLoadingStand(true);
                setLoadingDevices(true);

                // получение стендов
                const standData = await get_id(`stand${id.pathname.replace("Zone", "")}`);
                if (typeof standData === "object") {
                    const stand = {
                        id: standData.id,
                        name: standData.stand_name,
                        x: standData.stand_x,
                        y: standData.stand_y,
                        create_at: standData.create_at,
                        modified_at: standData.modified_at,
                    };
                    setErrorData(false);
                    setStand(stand);
                } else {
                    setErrorData(true);
                    setLoadingStand(false);
                    setLoadingDevices(false);
                }
                setLoadingStand(false);

                // получение тестируемых
                const devicesData = await get(
                    `test?id_zone=${id.pathname.replace("/", "")}&`
                );
                if (Array.isArray(devicesData)) {
                    const devices = devicesData.map((device) => ({
                        id: device.id != undefined ? device.id : "",
                        device: device.id_device.substring(0, 18),
                        zone: device.id_zone,
                        x: device.x_coord,
                        y: device.y_coord,
                        user: device.id_user,
                        percent: device.id_stage,
                        ip: device.id_device.substring(19),
                        status: device.status,
                        beginning: device.create_at != undefined ? device.create_at : "",
                        start_time: device.start_time
                    }));
                    setErrorData(false);
                    setDevices(devices);
                } else {
                    setErrorData(true);
                    setLoadingStand(false);
                    setLoadingDevices(false);
                }
                setLoadingDevices(false);
            } catch (error) {
                // Handle errors
                setErrorData(true);
                setLoadingStand(false);
                setLoadingDevices(false);
            }
        };

        fetchData();

        // получение времени с ежесекундным запросом
        // когда время изменяется идёт запрос на получение данных
        const interval = setInterval(() => {
            const bd_time_promise = get_time();
            bd_time_promise.then((bd_time) => {
                setTime((prevTime) => {
                    if (bd_time[0].modified_at !== prevTime) { // Предполагается, что у вас только один объект в массиве
                        fetchData();
                        return bd_time[0].modified_at;
                    }
                    return prevTime;
                });
                setErrorTime(false)
            }).catch((error) => {
                // Обработка ошибки
                setErrorTime(true)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [id, time]);

    // открытие модального окна логов
    const openModal = (flag, card) => {
        setCardLogs(card)
        setIsModalOpen(flag)

    }

    // создание элементов в строке
    function repeatX(y){
        // массив для элементов в строке, где первый - это её номер
        const elements = [(
            <SplitItem key={`${y}- coordinate`}>
                <Flex>
                    <FlexItem>
                        <div style={{color: "#6a6e73", paddingTop: "21px"}}>
                            {y + 1}
                        </div>
                    </FlexItem>
                </Flex>
            </SplitItem>
        )];
        // элемент, которого нет в бд, но по размерности стенда о должен быть
        const newFound = {
            id: "",
            device: "name",
            zone: "",
            x: "",
            y: "",
            user: "",
            percent: "",
            ip: "",
            status: "EMPTY",
            beginning: "",
            start_time: ""
        };

        // создание элементов строки
        for (let i = 0; i <= parseInt(stand.x) - 1; i++) {
            const foundDevice = devices.find(device => device.x === `${i + 1}` && device.y === `${y + 1}`);
            elements.push(
                <SplitItem isFilled key={`${i}-${y}`}>
                    <CardStack
                        card={foundDevice ? foundDevice : newFound}
                        openModal={(flag, card)=>openModal(flag, card)}
                    />
                </SplitItem>
            );
        }

        return elements;
    }

    // создание строки
    function repeatY(){
        const elements = [];

        for (let i = 0; i <= parseInt(stand.y) - 1; i++) {
            elements.push(
                <FlexItem key={i}>
                    <Split hasGutter>
                        {repeatX(i)}
                    </Split>
                </FlexItem>
            );
        }

        return elements;
    }

    return (
        <Page>
            <div style={{ overflowY: "scroll", overflow: "hidden", height: "100vh", padding: "15px"}}>
                <Flex  direction={{ default: 'column' }}>
                    {repeatY()}
                </Flex>
            </div>
        </Page>
    );
};

export default StandPage