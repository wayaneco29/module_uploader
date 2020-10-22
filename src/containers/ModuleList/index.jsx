import React from 'react';
import { useParams } from 'react-router-dom';
import Hero from '../../components/Hero';
import Navbar from '../../components/Nav';

const ModuleList = ({ user }) => {
    const { subject } = useParams();
    const [title, setTitle] = React.useState('');

    React.useEffect(() => {
        if (subject === 'araling_panlipunan') {
            setTitle('Araling Panlipunan')
        } else {
            setTitle(subject)
        }
    }, []);

    return (
        <div>
            <Navbar user={user} url="/dashboard" />
            <Hero user={user} title={title} hasUploadButton={false} />
        </div>
    )
}

export default ModuleList;