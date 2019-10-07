import React from 'react';
import { shallow } from 'enzyme';
import { Config } from '../../../enzyme'
import DropDownWithSearch from './DropDownWithSearch'

Config

describe("Drop Down Component With Search option", () => {
       
    const data = [{id:1, name : "test"}]
    const MockclearField = jest.fn()
    const mockSelect = jest.fn()
    const props = {
        data: data,
        clearField: MockclearField,
        Select: mockSelect
    }
    const app = shallow(<DropDownWithSearch {...props} />)
    it("Component Snap Shot", () => {
        expect(app).toMatchSnapshot()
    })
    it("initial Value", () => {
        expect(app.state().InputValue).toEqual("")
        expect(app.state().ShowControler).toEqual(false)
        expect(app.state().data).toEqual([])
    })
    it("Change input field value and Show Drop down",()=>{
        app.find("input").simulate("click")
        expect(app.state().ShowControler).toEqual(true)
    })
})
