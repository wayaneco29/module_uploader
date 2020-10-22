import React from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { store } from '../../firebase';

import Card from '../../components/Card';

import styled from 'styled-components';

const GridDiv = styled.div`
    display: grid !important;
    grid-template-columns: repeat(auto-fill, minmax(24%, 1fr));
    grid-gap: 15px;
`;

const datas = [
    {
        name: 'English',
        link: 'english',
    },{
        name: 'Filipino',
        link: 'filipino',
    },{
        name: 'Mathematics',
        link: 'mathematics',
    },{
        name: 'Science',
        link: 'science',
    },{
        name: 'Araling Panlipunan',
        link: 'araling_panlipunan',
    },{
        name: 'EPP',
        link: 'epp',
    },{
        name: 'TLE',
        link: 'tle',
    },{
        name: 'MAPEH',
        link: 'mapeh',
    },
]

const Subjects = () => {
    const match = useRouteMatch();
    const [modules, setModules] = React.useState([]);

    return (
        <div className="hero-body" style={{ paddingTop: '0px', paddingBottom: '0px'}}>
            <div className="container">
                <GridDiv>
                    {datas.map(({ name, link }) => (
                        <React.Fragment key={name}>
                            <Link to={`${match.path}/${link}`}>
                                <Card  title={name} />
                            </Link>
                        </React.Fragment>
                    ))}
                </GridDiv>
            </div>
        </div>
    )
}

export default Subjects;