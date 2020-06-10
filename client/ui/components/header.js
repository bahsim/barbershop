import React, { useState } from 'react';
import { connect } from "react-redux";

import { 
  Button,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
} from "react-bootstrap";

import { genders } from '../../const';

import { 
  filterDataByAge, 
  filterDataByGender,
  searchInData,
} from "../../modules/global";

const HeaderBase = ({
  filterGender, filterAge, 
  filterDataByGender, filterDataByAge,
  searchInData,
}) => {

  const [search, setSearch] = useState('')
  
  const handleOnGenderClick = value => {
    filterDataByGender(value)
  }

  const handleOnAgeClick = value => {
    filterDataByAge(value)
  }

  const handleOnSearchInput = e => {
    const { value } = e.target
    
    if (!value) {
      searchInData(null)
    }
    
    setSearch(e.target.value)
  }

  const handleOnSearch = () => {
    if (search) {
      searchInData(search)
    }
  }

  const genderLabel = filterGender ? genders[filterGender] : 'пол';
  
  const ageLabel = filterAge ? `${filterAge[0]}-${filterAge[1]}` : 'возраст';

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Barbershop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title={genderLabel}>
            <NavDropdown.Item onClick={() => handleOnGenderClick('')}>
              все
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleOnGenderClick('male')}>
              {genders.male}
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleOnGenderClick('female')}>
              {genders.female}
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title={ageLabel}>
            <NavDropdown.Item onClick={() => handleOnAgeClick('')}>
              все
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleOnAgeClick([18,25])}>
              18-25
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleOnAgeClick([26,35])}>
              26-35
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => handleOnAgeClick([36,40])}>
              36-40
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl 
            type="text" placeholder="ввести..." 
            className="mr-sm-2"
            value={search}
            onChange={handleOnSearchInput}
          />
          <Button variant="outline-success" onClick={handleOnSearch}>
            найти
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = ({ 
  global: { filterGender, filterAge },
}) => ({
  filterGender, filterAge,
});

const mapDispatchToProps = dispatch => ({
  filterDataByAge: value => dispatch(filterDataByAge(value)),
  filterDataByGender: value => dispatch(filterDataByGender(value)),
  searchInData: value => dispatch(searchInData(value)),
})

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderBase)