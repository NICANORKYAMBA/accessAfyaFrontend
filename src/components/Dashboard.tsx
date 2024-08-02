import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Clinic, Patient, Visit, Metric } from '../interface/interface';
import { Container, Row, Col, Form, Table, Spinner, Card, Navbar, Nav, Image } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/Dashboard.css';

// Import and register the necessary chart components
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GET_CLINICS = gql`
    query GetClinics {
        clinics {
            id
            name
            address
            patients {
                id
                firstName
                lastName
            }
            visits {
                id
                date
            }
            metrics {
                id
                date
                value
                type
            }
        }
    }
`;

const Dashboard = () => {
    const { loading, error, data } = useQuery(GET_CLINICS);
    const [filter, setFilter] = useState('');
    const [sortField, setSortField] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    const handleSortChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSortField(e.target.value as string);
    };
    
    const handleSortOrderChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setSortOrder(e.target.value as string);
    };

    const dummyData = {
        clinics: [
            {
                id: '1',
                name: 'Clinic A',
                address: '123 Main St',
                patients: [
                    { id: '1', firstName: 'John', lastName: 'Doe' },
                    { id: '2', firstName: 'Jane', lastName: 'Smith' },
                ],
                visits: [
                    { id: '1', date: '2023-07-01' },
                    { id: '2', date: '2023-07-02' },
                ],
                metrics: [
                    { id: '1', date: '2023-07-01', value: 75, type: 'temperature' },
                    { id: '2', date: '2023-07-02', value: 80, type: 'temperature' },
                ],
            },
            {
                id: '2',
                name: 'Clinic B',
                address: '456 Side St',
                patients: [
                    { id: '3', firstName: 'Alice', lastName: 'Johnson' },
                    { id: '4', firstName: 'Bob', lastName: 'Brown' },
                ],
                visits: [
                    { id: '3', date: '2023-07-03' },
                    { id: '4', date: '2023-07-04' },
                ],
                metrics: [
                    { id: '3', date: '2023-07-03', value: 70, type: 'temperature' },
                    { id: '4', date: '2023-07-04', value: 72, type: 'temperature' },
                ],
            },
        ],
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" variant="primary" />
            </Container>
        );
    }

    if (error) {
        console.error("Error loading data:", error);
    }

    const clinicsData = data?.clinics?.length ? data.clinics : dummyData.clinics;

    const filteredClinics = clinicsData.filter((clinic: Clinic) =>
        clinic.name.toLowerCase().includes(filter.toLowerCase()) ||
        clinic.address.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedClinics = filteredClinics.sort((a: Clinic, b: Clinic) => {
        switch (sortField) {
            case 'name':
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            case 'address':
                return sortOrder === 'asc' ? a.address.localeCompare(b.address) : b.address.localeCompare(a.address);
            default:
                return 0;
        }
    });

    const chartData = (metrics: Metric[]) => {
        return {
            labels: metrics.map(metric => new Date(metric.date).toLocaleDateString()),
            datasets: [
                {
                    label: 'Metric Value',
                    data: metrics.map(metric => metric.value),
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                },
            ],
        };
    };

    return (
        <div className="dashboard">
            <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            alt=""
                            src="/logo.svg"
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        AccessAfya
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto d-flex align-items-center justify-content-between w-100">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                            <Image src="/profile-pic.jpg" roundedCircle width="40" height="40" className="ml-3" />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid>
                <Row className="mb-4">
                    <Col>
                        <h1 className="text-center">Analytics Dashboard</h1>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={4} className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Filter by name or address"
                            value={filter}
                            onChange={handleFilterChange}
                        />
                    </Col>
                    <Col md={4} className="mb-3">
                        <Form.Control as="select" value={sortField} onChange={handleSortChange}>
                            <option value="name">Name</option>
                            <option value="address">Address</option>
                        </Form.Control>
                    </Col>
                    <Col md={4} className="mb-3">
                        <Form.Control as="select" value={sortOrder} onChange={handleSortOrderChange}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </Form.Control>
                    </Col>
                </Row>

                {sortedClinics.map((clinic: Clinic) => (
                    <Card className="mb-4" key={clinic.id}>
                        <Card.Body>
                            <Card.Title>{clinic.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{clinic.address}</Card.Subtitle>
                            <Row>
                                <Col md={6}>
                                    <h3>Patients</h3>
                                    <Table striped bordered hover size="sm" responsive>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clinic.patients.map((patient: Patient) => (
                                                <tr key={patient.id}>
                                                    <td>{patient.id}</td>
                                                    <td>{patient.firstName}</td>
                                                    <td>{patient.lastName}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                                <Col md={6}>
                                    <h3>Visits</h3>
                                    <Table striped bordered hover size="sm" responsive>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {clinic.visits.map((visit: Visit) => (
                                                <tr key={visit.id}>
                                                    <td>{visit.id}</td>
                                                    <td>{new Date(visit.date).toLocaleDateString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h3>Metrics</h3>
                                    <Line data={chartData(clinic.metrics)} />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    );
};

export default Dashboard;