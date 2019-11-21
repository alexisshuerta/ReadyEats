import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

import MenuCard from './tempmenucard';
import { Row, Col, Container } from 'react-bootstrap';

export default function Menu(props) {
    const business = useSelector(state => state.auth.user);
    const [menu, setMenu] = React.useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

    const result = menu.map((x, i) => {
        return i % 3 === 0 ? menu.slice(i, i + 3) : null;
    }).filter(x => x != null);

    React.useEffect(() => {
        axios.get("/api/menu/get", {
            params: {
                shopid: business.id
            }
        })
            .then(res => {setMenu(res.data.menu); console.log(res.data.menu)})
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Container>
            {result.map((row, index) => {
                return (
                    <Row key={index}>
                        {row.map((item, index) =>
                            <Col key={index} xs={15}>
                                <MenuCard
                                    name = {item.name}
                                    shop = {item.shopName}
                                    desc = {item.description}
                                    img = {item.imagePath}
            />
                            </Col>
                        )}
                    </Row>
                )
            })}
        </Container>
    )
}