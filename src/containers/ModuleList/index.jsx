import React from 'react';
import { useParams } from 'react-router-dom';
import Hero from '../../components/Hero';
import Icon from '../../components/Icon';
import Navbar from '../../components/Nav';
import Loader from '../../components/Loader';

import { store } from '../../firebase';

const ModuleList = ({ user }) => {
    const { subject } = useParams();
    const [title, setTitle] = React.useState('');
    const [modules, setModules] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (subject === 'araling_panlipunan') {
            setTitle('Araling Panlipunan')
        } else {
            setTitle(subject)
        }
    }, []);

    React.useEffect(() => {
        try {
            setLoading(true)
            const collectionRef = store.collection(`modules/PP28US4d6VvdP16dpx7L/${subject}`);

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
            <Navbar user={user} url="/dashboard" />
            <Hero user={user} title={title} hasUploadButton={false} />
            <div className="hero-body" style={{ paddingTop: '0px', paddingBottom: '0px'}}>
                <div className="container">
                    {loading ? <Loader /> : (
                        modules && modules.length ? (
                            <div className="table-container">
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
                                            <td style={{ verticalAlign: 'middle' }}>{xModule.date_uploaded}</td>
                                            <td style={{ width: '10px' }}>
                                                <a href={xModule.url} target="_blank" download>
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