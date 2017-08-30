import 'mocha';
import './mocha.jsdom';
import React, { Component } from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { ReactEventEmitter } from '../src';
// import ReactEventTest from './core/ReactEventTest';

class ReactEventTest extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: 'test mode'
        };
        this.handleOnClick = this.handleOnClick.bind(this);
    }
    handleOnClick () {
        this.setState({
            title: 'after click title'
        });
    }
    render () {
        return (
            <div>
                <button>test button</button>
            </div>
        );
    }
}

describe('ReactEventEmitter test', () => {
    let TestComponent = null;
    before(() => {

        const EventComponent = ReactEventEmitter(ReactEventTest);
        TestComponent = mount(<EventComponent test="property" />);
    });

    it('ReactEventEmitter\'s type is function', () => {
        expect(typeof ReactEventEmitter).to.eq('function');
    });
    it('ReactEventEmitter should be return class or function', () => {
        expect(typeof TestComponent.component).to.eq('object');
    });
    it('ReactEventEmitter component\'s prop should hav onRaiseEvent property', () => {
        const buttonElment = TestComponent.find('button').at(0);
        buttonElment.simulate('click');
        console.log(buttonElment.html());
        console.log(TestComponent.props());
    });
});
