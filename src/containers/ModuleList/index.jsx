import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Hero from '../../components/Hero';
import Icon from '../../components/Icon';
import Footer from '../../components/Footer';
import Navbar from '../../components/Nav';
import Loader from '../../components/Loader';

import { DateTime as DT } from 'luxon';
import { store } from '../../firebase';

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

const ModuleList = ({ user }) => {
    const history = useHistory();
    const { subject } = useParams();
    const [title, setTitle] = React.useState('');
    const [modules, setModules] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

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
                    GO BACK
                </React.Fragment>
            )} />
            <Hero user={user} title={title} hasUploadButton={false} />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height:'calc(100vh - 184px)' }}>
                <React.Fragment>
                    <div className="hero-body" style={{ paddingTop: '0px', paddingBottom: '30px'}}>
                        <div className="container" style={{ overflowX: 'auto' }}>
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
                                                        <a href={xModule.url} target="_blank" rel="noopener noreferrer" download>
                                                            <Icon className="mdi-download" style={{ cursor: 'pointer', fontSize: '20px' }} />
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : <div style={{ fontSize: '1.3rem', textAlign: 'center', fontWeight: 'bold' }}>You have no modules available.</div>
                                
                            )}
                        </div>
                    </div>
                </React.Fragment>
                <Footer />
            </div>
        </div>
    )
}

// onClick={() => {
//     const url = xModule.url;

//     const xhr = new XMLHttpRequest();
//     xhr.responseType = 'blob';
//     xhr.onload = (event) => {
//         const blob = xhr.responseType;
//     }
//     xhr.open('GET', url);
//     xhr.send();
// }}

export default ModuleList;