import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home'
import { shallow, mount } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer'
import { MovieView } from './MovieView'
import { ChangePage } from './ChangePage';
import { PopularSelections } from './PopularSelections';
import { SearchBar } from './SearchBar';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('page intial value', () => {
  const wrapper = shallow(<Home />)
  const countState = wrapper.state().page
  expect(countState).toEqual(1)
})

it('count popularSelections', () => {
  const wrapper = shallow(<PopularSelections/>)
  expect(wrapper.find('button').length).toEqual(4)
})

// it('hide popularSelections', () => {
//   const home = mount(<Home/>)
//   const wrap = mount (<SearchBar/>)
//   const input = wrap.find('input')
//   input.value= 'Toy Story'
//   const wrapper = shallow(<PopularSelections/>)
//   expect(wrapper.find('button').length).toEqual(0)
// })

it('dummy test', () => {
  const wrapper = mount(<ChangePage value={1} max={2}/>)
  expect(wrapper.props().value).toEqual(1);

  // const text = wrapper.find('.PageNumber').text()
  // expect(text).toEqual('1')
})

it('previous page', () => {
  const wrapper = mount(<ChangePage value={1} max={2}/>)
  const decrementPage = wrapper.find('#decrement')
  decrementPage.simulate('click')
})

// it('next page', () => {
//   const wrapper = mount(<Home />)
//   wrapper.setState({max_pages: 2})
//   const incrementPage = wrapper.find('#increment')
//   incrementPage.simulate('click')
//   console.log(wrapper.find('.PageNumber').text())
//   const countState = wrapper.state().page
//   const text = wrapper.find('.PageNumber').text()
//   expect(countState).toEqual(2);
// })