import React from 'react'
import { shallow } from 'enzyme'

import { SearchFormContainer } from './SearchFormContainer'

describe('tests form', () => {
  let wrapper
  const props = {
    classes: {},
    t: jest.fn(),
    requestCurrentWeather: jest.fn()
  }

  beforeEach(() => {
    wrapper = shallow(<SearchFormContainer {...props} />)
  })

  test('renders correctly according to snapshot', () => {
    expect(wrapper.renderProp('children')()).toMatchSnapshot()
  })

  test('When clicking the button the api request is made', () => {
    wrapper.simulate('submit', {
      preventDefault: () => {}
    })
    expect(props.requestCurrentWeather.mock.calls.length).toBe(1)
  })
})
