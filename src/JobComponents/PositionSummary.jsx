import React from "react"
import { Link } from "react-router-dom"
import { Segment, Header, Icon, Label } from "semantic-ui-react"
import { format } from "date-fns"
import Markdown from "markdown-to-jsx"

function PositionSummary({ position }) {
    const position_id = position.info.position_id ? `Position #${position.info.position_id}` : ""
    const contract = position.info.contract ? `${position.info.contract} ` : ""
    const level = position.info.level ? `Level: ${position.info.level}` : ""
    const skill_summary = position.info.skill_summary ? (
        <Segment basic>
            <Markdown>{position.info.skill_summary}</Markdown>
        </Segment>
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
        <Link to={`/${position.key}`}>
            <Icon name="expand arrows alternate"></Icon>more info
        </Link>
    ) : (
        ""
    )

    return (
        <div key={position.key} className="candidate-table-row">
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
        </div>
    )
}

export default PositionSummary
