import React from 'react';
import { Button } from "@material-ui/core";

const Landing = () => {
    return (
    <section className='landing'>
        <div className='landing-inner'>
            <h1 className='x-large'>ADR Motorsport</h1>
            <div className='buttons'>
                <Button id="bl" variant="contained" color="primary" href="/project">
                    Project
                </Button>
                <Button variant="contained" color="primary" href="/item">
                    Item
                </Button>
                <Button id="br" variant="contained" color="primary" href="/employee">
                    Employee
                </Button>
            </div>
        </div>
    </section>
    );
}

export default Landing;