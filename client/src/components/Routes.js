import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Project from './Project';
import ProjectDetails from './ProjectDetails';
import Item from './Item';
import Employee from './Employee';

const Routes = props => {
    return (
        <section className="container">
            <Switch>
                <Route exact path="/project" component={Project} />
                <Route exact path="/project/detail" component={ProjectDetails} />
                <Route exact path="/item" component={Item} />
                <Route exact path="/employee" component={Employee} />
            </Switch>
        </section>
    );
};

export default Routes;
