import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { get_id, get, get_time } from '../../configs/axios_configs';

const DashBoardPage = () => {
    const [time, setTime] = useState("");                           
    const [stand, setStand] = useState({ id: "", name: "", x: "0", y: "0", create_at: "", modified_at: "" });
    const [devices, setDevices] = useState([]);
    const [loadingStand, setLoadingStand] = useState(true);        
    const [loadingDevices, setLoadingDevices] = useState(true);    
    const [errorTime, setErrorTime] = useState(false);                     
    const [errorData, setErrorData] = useState(false);                     
    const [isModalOpen, setIsModalOpen] = useState(false);          
    const [logsCard, setCardLogs] = useState();
    const logs = [];
    const id = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingStand(true);
                setLoadingDevices(true);

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

                const devicesData = await get(`test?id_zone=${id.pathname.replace("/", "")}&`);
                if (Array.isArray(devicesData)) {
                    const devices = devicesData.map((device) => ({
                        id: device.id != undefined ? device.id : "",
                        device: device.id_device,
                        zone: device.id_zone,
                        x: device.x_coord,
                        y: device.y_coord,
                        user: device.id_user,
                        percent: device.id_stage,
                        ip: device.ip,
                        status: device.status,
                        beginning: device.create_at != undefined ? device.create_at : "",
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
                setErrorData(true);
                setLoadingStand(false);
                setLoadingDevices(false);
            }
        };

        fetchData();

        const interval = setInterval(() => {
            const bd_time_promise = get_time();
            bd_time_promise.then((bd_time) => {
                setTime((prevTime) => {
                    if (bd_time[0].modified_at !== prevTime) {
                        fetchData();
                        return bd_time[0].modified_at;
                    }
                    return prevTime;
                });
                setErrorTime(false)
            }).catch((error) => {
                setErrorTime(true)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [id, time]);

    const openModal = (flag, card) => {

    }

    function repeatX(y) {
        const elements = [(
            <div key={`${y}- coordinate`} style={{ color: "#6a6e73", paddingTop: "21px" }}>
                {y + 1}
            </div>
        )];
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
        };

        for (let i = 0; i <= parseInt(stand.x) - 1; i++) {
            const foundDevice = devices.find(device => device.x === `${i + 1}` && device.y === `${y + 1}`);
            elements.push(
                <div key={`${i}-${y}`} style={{ paddingLeft: "10px" }}>
                    {foundDevice ? foundDevice.device : newFound.device}
                </div>
            );
        }

        return elements;
    }

    function repeatY() {
        const elements = [];

        for (let i = 0; i <= parseInt(stand.y) - 1; i++) {
            elements.push(
                <div key={i} style={{ display: "flex" }}>
                    <div style={{ paddingRight: "10px" }}>
                        {repeatX(i)}
                    </div>
                </div>
            );
        }

        return elements;
    }

    return (
        <div>
            <div style={{ overflowY: "scroll", overflow: "hidden", height: "100vh", padding: "15px" }}>
                {repeatY()}
            </div>
        </div>
    );
};

export default DashBoardPage;
