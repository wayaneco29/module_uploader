import React from 'react';

import Hero from '../../components/Hero';
import Navbar from '../../components/Nav';
import Footer from '../../components/Footer';
import Subjects from '../../containers/Subjects';
// 764248
const Dashboard = ({ user }) => {
    return (
       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height:'100vh' }}>
            <React.Fragment>
                <Navbar user={user} url={user ? '/dashboard' : '/'} />
                <Hero user={user} title="Subjects" hasUploadButton={true} />
                <Subjects/>
            </React.Fragment>
            <Footer />
       </div>
    )
}

export default Dashboard;