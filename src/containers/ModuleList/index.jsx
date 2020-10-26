import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Hero from '../../components/Hero';
import Icon from '../../components/Icon';
import Footer from '../../components/Footer';
import Navbar from '../../components/Nav';
import Loader from '../../components/Loader';

import { store, storage } from '../../firebase';

import { DateTime as DT } from 'luxon';

import styled from 'styled-components';
import DeleteModal from './Modal';

const requiredSubjects = [
    'english',
    'filipino',
    'mathematics',
    'science',
    'araling_panlipunan',
    'epp',
    'tle',
    'mapeh',
];

const Div1 = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    & > a {
        margin-right: 0.7rem;
    }
`;

const Div2 = styled.div`
    @media (max-width: 650px) {
        min-height: calc(100vh - 140px) !important;
    }
`;

const A = styled.a`
    &:hover {
        color: #3273dc !important;
    }
`;

const ModuleList = ({ user }) => {
    const history = useHistory();
    const { subject } = useParams();
    const [title, setTitle] = React.useState('');
    const [modules, setModules] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [selectedModule, setSelectedModule] = React.useState({});

    const handleToggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

    React.useEffect(() => {
        const isValid = requiredSubjects.includes(subject);
        
        if (!isValid) {
            history.push('/NotFound');
        }
    })

    React.useEffect(() => {
        if (subject === 'araling_panlipunan') {
            setTitle('Araling Panlipunan')
        } else {
            setTitle(subject)
        }
    }, [subject]);

    React.useEffect(() => {
        try {
            setLoading(true)
            const collectionRef = store.collection(`modules/PP28US4d6VvdP16dpx7L/${subject}`).orderBy('date_uploaded');

            collectionRef.get().then(async (data) => {
                const modulesData = [];

                data.docs.forEach(obj => {
                    const item = {
                        ...obj.data(),
                        id: obj.id,
                    };
                    modulesData.push(item);
                });
                setModules(modulesData);
                setLoading(false)
            });
        } catch (error) {
            setLoading(false)
        }
    }, []);

    return (
        <div>
            <Navbar user={user} url="/dashboard" navigation={(
                <React.Fragment>
                    <Icon className="mdi-arrow-left"/> <p>GO BACK</p>
                </React.Fragment>
            )} />
            <Hero user={user} title={title} hasUploadButton={false} />
            <Div2 style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight:'calc(100vh - 173px)' }}>
                <React.Fragment>
                    <div className="hero-body" style={{ paddingTop: '0px', paddingBottom: '30px'}}>
                        <div className="container" style={{ overflowX: 'auto', height: '100%' }}>
                            {loading ? <Loader /> : (
                                modules && modules.length ? (
                                    <div className="table-container" style={{ minWidth: '590px' }}>
                                        <table className="table is-striped is-hoverable is-fullwidth">
                                            <thead>
                                                <tr>
                                                    <th>Uploaded by</th>
                                                    <th>Name</th>
                                                    <th>Uploaded on</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {modules.map(xModule => (
                                                <tr key={xModule.id}>
                                                    <td style={{ verticalAlign: 'middle' }}>{xModule.author}</td>
                                                    <td style={{ verticalAlign: 'middle' }}>{xModule.name}</td>
                                                    <td style={{ verticalAlign: 'middle' }}>{DT.fromISO(xModule.date_uploaded).toFormat('DDD @ t')}</td>
                                                    <td style={{ width: '10px' }}>
                                                        <Div1>
                                                            <A href={xModule.url} target="_blank" rel="noopener noreferrer" download>
                                                                <Icon className="mdi-download" style={{ cursor: 'pointer', fontSize: '20px' }} />
                                                            </A>
                                                            {user && (
                                                                <div>
                                                                    <Icon 
                                                                        className="mdi-delete has-text-danger" 
                                                                        style={{ cursor: 'pointer', fontSize: '20px' }} 
                                                                        onClick={() => {
                                                                            setSelectedModule(xModule);
                                                                            handleToggleDeleteModal();
                                                                        }} 
                                                                    />
                                                                </div>
                                                            )}
                                                        </Div1>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div style={{ fontSize: '1.3rem', textAlign: 'center', fontWeight: 'bold', height: '100%' }}>
                                        <Icon style={{ fontSize: '6rem', marginTop: '5rem' }} className="mdi-emoticon-sad" />
                                        <p style={{ marginTop: '1.3rem' }} >No modules available yet.</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </React.Fragment>
                <Footer />
            </Div2>
            {openDeleteModal && (
                <DeleteModal 
                    isOpen={openDeleteModal} 
                    closeModal={handleToggleDeleteModal}
                    selectedModule={selectedModule}
                    setSelectedModule={setSelectedModule}
                    subject={subject}
                    modules={modules}
                    setModules={setModules}
                />
            )}
        </div>
    )
}

export default ModuleList;