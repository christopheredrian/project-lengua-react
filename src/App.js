import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Container, Row, Button, Col} from 'react-bootstrap';
import 'tachyons';
import axios from 'axios'

const ENDPOINT = 'https://project-lengua.herokuapp.com/api/sentiment/sentence';

function App() {

    const [sentence, setSentence] = useState("");
    const [response, setResponse] = useState("");

    const checkSentimentHandler = () => {

        axios({
            method: 'get',
            url: `${ENDPOINT}?sentence=${sentence}`,
        }).then(({data}) => {
            setResponse(data);
        });

    };

    return (
        <div className='vh-100 pt-3'>
            <Container>

                <Row>
                    <Col className='text-center'>
                        <h1 className='pb-3 border-bottom mb-5'>
                            Project Lengua
                        </h1>
                    </Col>
                </Row>

                <Row>
                    <Col xs={6}>

                        <Row>
                            <Col>
                                <Form.Control
                                    as="textarea"
                                    // rows="10"
                                    style={{height: "60vh"}}
                                    onChange={e => setSentence(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Row className='mt-3'>
                            <Col className='text-right'>
                                <Button
                                    size={'lg'}
                                    onClick={checkSentimentHandler}
                                >
                                    Check Sentiment
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col xs={6}>
                        {
                            response &&
                            <pre><code>{JSON.stringify(response, null, 2)}</code></pre>
                        }
                    </Col>
                </Row>

            </Container>

        </div>
    );
}

export default App;
