import React, {useState, useEffect, useRef} from 'react';
import TokenService from './TokenService';
import eventBus from '../../eventBus';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';

export function UserBarComponent(props:any) {
    const [name, setName] = useState<string>("");
    const menu = useRef<Menu>(null);
    const items = [
        {
            items: [
                {
                    label: 'Выйти',
                    icon: 'pi pi-times',
                    command: () => {
                        logout();
                    }
                }
            ]
        }
    ];

    useEffect(() => {
        const user = TokenService.getUser();
        setName(user?.userName || "");

        eventBus.on("loggedIn", (e:any) => {
            const user = TokenService.getUser();
            setName(user?.userName || "");
        });
        
        return () => {
            eventBus.remove("loggedIn");
        };
    }, []);

    const logout = () => {
        TokenService.removeUser();
        setName("");
    };

    return (
        <React.Fragment>
            <Menu model={items} popup ref={menu} id="popup_menu" />
            {name && <Button label={name} icon="pi pi-bars" className="p-button-rounded p-button-text" onClick={(event: React.SyntheticEvent<Element, Event>) => menu && menu.current && menu.current.toggle(event)} aria-controls="popup_menu" aria-haspopup />}
        </React.Fragment>
    )
}
