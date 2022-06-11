import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Segment, Header, Icon, Accordion, Transition } from "semantic-ui-react"
import { format } from "date-fns"
import Markdown from "markdown-to-jsx"
import Files from "../CommonComponents/Files"

function PositionSummary({ position }) {
    const [showdescription, setshowdescription] = useState(false)

    const position_id = position.info.position_id ? `Position #${position.info.position_id}` : ""
    const contract = position.info.contract ? `${position.info.contract} ` : ""
    const level = position.info.level ? `Level: ${position.info.level}` : ""
    const skill_summary = position.info.skill_summary ? (
        <p>
            <Markdown>{position.info.skill_summary}</Markdown>
        </p>
    ) : (
        ""
    )
    const location = position.info.location ? `Location: ${position.info.location}` : ""
    const created = position.info.added_on ? (
        <Header color="grey" size="tiny" textAlign="center" attached="bottom">
            <Icon name="wait" />
            Created on {format(position.info.added_on.toDate(), "MMM d, yyyy")}
        </Header>
    ) : (
        ""
    )
    const more_info = position.info.description ? (
        <Accordion>
            <Accordion.Title
                onClick={(ev) => {
                    ev.stopPropagation()
                    ev.preventDefault()
                    setshowdescription(!showdescription)
                }}
            >
                <Icon name="expand arrows alternate"></Icon>more info
            </Accordion.Title>
            <Transition visible={showdescription} animation="slide down" duration={250}>
                <Accordion.Content active={showdescription}>
                    <Markdown>{position.info.description}</Markdown>
                </Accordion.Content>
            </Transition>
        </Accordion>
    ) : (
        ""
    )

    return (
        <div key={position.key} className="candidate-table-row">
            <Link to={`/${position.key}`}>
                <Segment>
                    <Header>
                        <Header.Content>{position.info.title}</Header.Content>
                        <Header.Subheader>
                            <div>Contract: {contract} </div>
                            <div>{position_id}</div>
                            <div>{level}</div>
                            <div>{location}</div>
                        </Header.Subheader>
                    </Header>
                    {skill_summary}
                    {more_info}
                </Segment>
            </Link>
            <Files id={position.key} />
        </div>
    )
}

export default PositionSummary
