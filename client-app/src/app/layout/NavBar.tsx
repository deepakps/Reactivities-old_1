import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";

// below code has been recfactored as react states have been managed using modx.
// date - 19th Aug, 2021.

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                {/* exact keyword in Route tag will strictly check for the route path.
                    This is needed otherwise matching NavLink will get highlighted. 
                    date - 23rd Sept, 2021*/}
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '10px' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item name='Activities'>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                </Menu.Item>

            </Container>
        </Menu>
    )
}