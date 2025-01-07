import { useState } from "react";
import { Menu } from 'antd';

import { Link } from "react-router-dom";



const items = [
    {
        label: <Link to={"/"}>Home</Link>,
        key: 'home',
    },
    {
        label: <Link to={"/product"}>Product</Link>,
        key: 'product',
    },
];

const Header = () => {
    const [current, setCurrent] = useState('mail');

    const onClick = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

export default Header