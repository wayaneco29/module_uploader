import React from 'react';

import Hero from '../../components/Hero';
import Navbar from '../../components/Nav';
import Footer from '../../components/Footer';
import Subjects from '../../containers/Subjects';

const Dashboard = ({ user }) => {

    return (
       <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height:'100vh' }}>
            <React.Fragment>
                <Navbar user={user} url={user ? '/dashboard' : '/'} navigation={(
                    <React.Fragment>
                        {!user && (
                            'HOME'
                        )}
                    </React.Fragment>
                )}/>
                <Hero user={user} title="Subjects" hasUploadButton={true} />
                <Subjects/>
            </React.Fragment>
            <Footer />
       </div>
    )
}

export default Dashboard;