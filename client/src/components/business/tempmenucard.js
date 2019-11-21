
import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Card';

export default function MenuCard(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.img} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    <span>{props.shop}<br></br></span>
                    {props.desc}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}