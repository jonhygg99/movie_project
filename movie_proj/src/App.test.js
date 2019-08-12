import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home'
import { shallow } from 'enzyme'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('page value', () => {
  const wrapper = shallow(<Home />)
  const countState = wrapper.state().page
  expect(countState).toEqual(1)
});

it('next page', () => {
  const wrapper = shallow(<Home />)
  //const text = wrapper.find('p').text()
  const incrementPage = wrapper.find('button.incrementPage')
  incrementPage.simulate('click')
  const countState = wrapper.state().page
  expect(countState).toEqual(2)
  //expect(text).toEqual('1')
});