import React, { useState, useEffect } from "react";
import history from "../modules/history";
import { Header, Segment, Container, Menu, Icon } from "semantic-ui-react";
import { fbPositionsDB } from "../firebase/firebase.config";
import tmplPosition from "../constants/positionInfo";

export default function PositionDetailPage({ match }) {
    const [position, setposition] = useState({ ...tmplPosition });
    const key = match.params.id;

    useEffect(() => {
        fbPositionsDB.child(key).on("value", data => {
            if (data.val()) {
                setposition({ ...tmplPosition, ...data.val() });
            } else {
                history.push("/");
            }
        });
        return () => fbPositionsDB.off("value");
    }, [key]);

    if (position) {
        const position_id = position.position_id ? `(${position.position_id})` : "";
        const contract = position.contract ? `${position.contract} - ` : "";
        const level = position.level ? `${position.level}` : "";
        const dash = position.level && position.skill_summary ? "-" : "";
        const location = position.location ? `Location: ${position.location}` : "";

        return (
            <div>
                <Container>
                    <Menu fluid attached="top" size="huge" borderless className="no-print">
                        <Menu.Item
                            onClick={() => {
                                history.goBack();
                            }}>
                            <Icon name="arrow left" />
                        </Menu.Item>
                    </Menu>
                    <Segment attached padded>
                        <Segment vertical padded>
                            <Header size="large">
                                {contract} {position.title} {position_id}
                                <Header.Subheader>
                                    <div>
                                        {level} {dash} {position.skill_summary}
                                    </div>
                                    <div>{location}</div>
                                </Header.Subheader>
                            </Header>
                            <div>{position.description}</div>
                        </Segment>
                    </Segment>
                </Container>
            </div>
        );
    }
}
