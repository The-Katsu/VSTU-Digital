import {useState} from "react";
import Papa from 'papaparse';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {API_URL} from "../config";
import {json} from "react-router-dom";

function HomePage() {
    // State to store parsed data
    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    //State to store the values
    const [values, setValues] = useState([]);

    const sentData = async () => {
        const data = values.map((x) => ({
            username: x[0],
            firstName: x[1],
            lastName: x[2],
            patronymic: x[3],
            groupName: x[4],
            password: x[5],
            isTeacher: x[6] === "true"
        }))

        const jsonData = JSON.stringify({users: data});

        const response = await fetch(`${API_URL}/createUsers`, {
            method: 'POST',
            mode: 'cors',
            body: jsonData,
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        if (response.status === 200) {
            setValues([])
        }
    }

    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];

                // Iterating data to get column name and their values
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                });

                setParsedData(results.data);
                setTableRows(rowsArray[0]);
                setValues(valuesArray);
            },
        });
    };

    console.log(values)

    return (
        <div className="container">
            <div className="jumbotron">
                <h1 className="display-4">Добро пожаловать в систему управления пользователями!</h1>
                <hr className="my-4" />
            </div>
            <div>
                {/* File Uploader */}
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control type="file"
                                  name="file"
                                  accept=".csv"
                                  onChange={changeHandler} />
                </Form.Group>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        {tableRows.map((rows, index) => {
                            return <th key={index}>{rows}</th>;
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {values.map((value, index) => {
                        return (
                            <tr key={index}>
                                {value.map((val, i) => {
                                    return <td key={i}>{val}</td>;
                                })}
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
            <div style={{textAlign: "center"}}>
                <Button
                    variant="outline-dark"
                    onClick={() => sentData()}
                >Отправить</Button>
            </div>

        </div>
    );
}

export default HomePage;
