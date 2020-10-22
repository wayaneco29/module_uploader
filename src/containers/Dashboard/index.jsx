import React from 'react';

import Hero from '../../components/Hero';
import Navbar from '../../components/Nav';
import Subjects from '../../containers/Subjects';
// 764248
const Dashboard = ({ user }) => {
    return (
       <div>
            <Navbar user={user} url="/" />
            <Hero user={user} title="Subjects" hasUploadButton={true} />
            <Subjects/>
       </div>
    )
}

export default Dashboard;