import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home'
import { shallow, mount } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import { MovieView } from './MovieView'

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('page value', () => {
  const wrapper = shallow(<Home />)
  const countState = wrapper.state().page
  expect(countState).toEqual(1)
})

it('no previous page', () => {
  const wrapper = mount(<Home />)
  const decrementPage = wrapper.find('#decrement')
  decrementPage.simulate('click')
  const countState = wrapper.state().page
  const text = wrapper.find('.changePageNumber').text()
  expect(text).toEqual('1')
  expect(countState).toEqual(1)
})

it('next page', () => {
  const wrapper = mount(<Home />)
  wrapper.setState({max_pages: 2})
  const incrementPage = wrapper.find('#increment')
  incrementPage.simulate('click')
  console.log(wrapper.find('.changePageNumber').text())
  const countState = wrapper.state().page
  const text = wrapper.find('.changePageNumber').text()
  expect(countState).toEqual(2);
})

// it('snapshot test', () => {
//   const tree = renderer.create(<MovieView/>).toJSON()
//   expect(tree).toMatchSnapshot()
// })