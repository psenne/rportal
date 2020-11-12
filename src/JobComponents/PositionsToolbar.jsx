import React, { useContext } from "react";
import PositionContext from "../contexts/PositionContext";
import { Input, Icon, Menu, Container } from "semantic-ui-react";
import ContractDropdown from "../CandidateComponents/ContractDropdown";
import classnames from "classnames";

export default ({ positions, contracts }) => {
    const { selectedcontract, setselectedcontract, searchterm, setsearchterm } = useContext(PositionContext);

    const SetSelectedContract = value => {
        setselectedcontract(value);
    };

    const SetSearchTerm = value => {
        setsearchterm(value);
    };

    const ClearFilters = () => {
        setselectedcontract("");
        setsearchterm("");
    };

    return (
        <Container fluid>
            <Menu className="no-print" style={{ margin: "1rem" }}>
                <Menu.Item>
                    <ContractDropdown text="Filter by Contract" clearable value={selectedcontract} contractsoverride={contracts} onChange={SetSelectedContract} />
                </Menu.Item>
                <Menu.Item className={classnames({ "form-hidden": !selectedcontract })}>
                    <label>{`Filtering for ${selectedcontract}`}</label>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Input placeholder="Search" value={searchterm} onChange={(ev, data) => SetSearchTerm(data.value)} />
                    </Menu.Item>
                    <Menu.Item>
                        <Icon.Group onClick={ClearFilters} title="Clear filters">
                            <Icon name="filter" size="large" link />
                            <Icon name="dont" size="large" color="red" link />
                        </Icon.Group>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </Container>
    )
};
