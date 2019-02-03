import React from 'react'
import { shallow, mount } from 'enzyme'
import withLabel from '../withLabel'
import { Input } from './Input'

describe('<Input />', () => {
  const baseProps = {
    name: 'inputTest',
    onFocus: jest.fn(),
    onBlur: jest.fn(),
    onAnimationStart: jest.fn(),
    formik: {
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      setFieldValue: jest.fn(),
      setFieldTouched: jest.fn(),
      touched: {},
      errors: {},
      values: {
        inputTest: '',
      },
    },
  }

  const WrappedComponent = withLabel('input')(Input)

  it('should render', () => {
    const wrapper = shallow(<WrappedComponent {...baseProps} />)

    expect(wrapper).toBeDefined()
  })

  it('should allow custom className', () => {
    const props = {
      ...baseProps,
      className: 'Custom',
    }
    const wrapper = shallow(<WrappedComponent {...props} />)

    expect(wrapper.hasClass(props.className)).toBe(true)
  })

  it('should have custom type', () => {
    const props = {
      ...baseProps,
      type: 'text',
    }
    const wrapper = mount(<WrappedComponent {...props} />)

    expect(wrapper.find('input').prop('type')).toBe(props.type)
  })

  it('should have a label', () => {
    const props = {
      ...baseProps,
      label: 'Custom',
    }
    const wrapper = mount(<WrappedComponent {...props} />)

    expect(wrapper.find('label').length).toBe(1)
  })

  it('should have a hint', () => {
    const props = {
      ...baseProps,
      hint: 'hintTest',
    }
    const wrapper = mount(<WrappedComponent {...props} />)

    expect(wrapper.find('.hint').length).toBe(1)
    expect(wrapper.find('.hint').text()).toBe(props.hint)
  })

  it('should be disabled', () => {
    let wrapper

    wrapper = mount(<WrappedComponent {...baseProps} disabled />)
    expect(wrapper.find('input').prop('disabled')).toBe(true)

    wrapper = shallow(<WrappedComponent {...baseProps} disabled />)
    expect(wrapper.prop('className').includes('disabled'))
  })

  it('should call onChange', () => {
    const wrapper = mount(<WrappedComponent {...baseProps} />)
    wrapper.find('input').simulate('change')

    expect(baseProps.formik.handleChange).toHaveBeenCalled()
  })
})