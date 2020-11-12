import React, { useState, useEffect } from "react"
import { fbPositionsDB } from "../firebase.config"
import tmplPosition from "../constants/positionInfo"
import history from "../modules/history"
import { Header, Segment, Container, Menu, Icon } from "semantic-ui-react"
import classnames from "classnames"
import { format } from "date-fns"
import Markdown from "markdown-to-jsx"

export default function PositionDetailPage({ match }) {
    const [position, setposition] = useState(null)
    const [pageloading, setpageloading] = useState(false)
    const key = match.params.id

    useEffect(() => {
        var unsub = fbPositionsDB.doc(key).onSnapshot((doc) => {
            if (doc.exists) {
                setposition({ ...tmplPosition, ...doc.data() })
            } else {
                history.push("/")
            }
        })

        return () => unsub()
    }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        setpageloading(!pageloading)
    }, [position]) // eslint-disable-line react-hooks/exhaustive-deps

    if (position) {
        const position_id = position.position_id ? `Position #${position.position_id}` : ""
        const contract = position.contract ? `${position.contract} ` : ""
        const level = position.level ? `Level: ${position.level}` : ""
        const skill_summary = position.skill_summary ? (
            <Segment vertical>
                <Markdown>{position.skill_summary}</Markdown>
            </Segment>
        ) : (
            ""
        )
        const location = position.location ? `Location: ${position.location}` : ""

        return (
            <div className="padded">
                <Container fluid>
                    <Menu attached="top" size="huge" borderless className="no-print">
                        <Menu.Item
                            onClick={() => {
                                history.goBack()
                            }}
                        >
                            <Icon name="arrow left" />
                        </Menu.Item>
                    </Menu>
                    <Segment attached>
                        <Segment vertical>
                            <Header>
                                <Header.Content>{position.title}</Header.Content>
                                <Header.Subheader>
                                    <div>Contract: {contract} </div>
                                    <div>{position_id}</div>
                                    <div>{level}</div>
                                    <div>{location}</div>
                                </Header.Subheader>
                            </Header>
                            {skill_summary}
                        </Segment>
                        <Segment vertical>
                            <Markdown>{position.description}</Markdown>
                        </Segment>
                    </Segment>
                </Container>
            </div>
        )
    } else {
        return null
    }
}
