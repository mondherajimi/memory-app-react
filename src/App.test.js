import { expect } from 'chai'
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme'
import GuessCount from './GuessCount'
import sinon from 'sinon'
import App, { SYMBOLS } from './App'
import Card from './Card'
//import { expect } from 'chai'

/*it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});*/

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
  })
  it('contains a zero-guess counter', () => {
    const wrapper = shallow(<App />)

    expect(wrapper).to.contain(<GuessCount guesses={0} />)
  })
  it('has 36 cards', () => {
  const wrapper = shallow(<App />)
  expect(wrapper.find('Card')).to.have.length(36)
  })
  /*it('should match its reference snapshot', () => {
  const wrapper = shallow(<App />)

  expect(wrapper).to.matchSnapshot()
  })*/
  it('should match its reference snapshot', () => {
  const mock = sinon
    .stub(App.prototype, 'generateCards')
    .returns([...SYMBOLS.repeat(2)])
  try {
    const wrapper = shallow(<App />)

    expect(wrapper).to.matchSnapshot()
  } finally {
    mock.restore()
  }
})
})

describe('<Card/>', () => {
  it('should trigger its `onClick` prop when clicked', () => {
    const onClick = sinon.spy()
    const wrapper = shallow(
      <Card card="😁" feedback="hidden" index={0} onClick={onClick} />
    )

    wrapper.simulate('click')
    expect(onClick).to.have.been.calledWith(0)
  })
  it('should match its reference snapshot', () => {
  const onClick = sinon.spy()
  const wrapper = shallow(
    <Card card="😁" feedback="hidden" index={0} onClick={onClick} />
  )

  expect(wrapper).to.matchSnapshot()
})
})