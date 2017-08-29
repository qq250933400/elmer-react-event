import { EventEmitter } from 'events';
import React, { Component } from 'react';

const ReactEventEmitter = (ChildComponent) => {
    const initEvent = () => {
        window.elmer = window.elmer || {};
        window.elmer.events = window.elmer.events || {
            emitter: new EventEmitter()
        };
    };
    const onRaiseEvent = (eventName, data) => {
        const eventEmit = window.elmer.events;
        eventEmit.emit(eventName, data);
    };
    const onAddEvent = (eventName, callBack, isMultiple) => {
        const eventEmit = new EventEmitter();
        if (isMultiple) {
            eventEmit.addListener(eventName, callBack);
        } else {
            let isExists = false;
            eventEmit.eventNames().map((tmpEventName) => {
                if (eventName === tmpEventName) {
                    isExists = true;
                }
            });
            if (isExists) {
                throw new Error(`event:"${eventName}" event already exists`);
            } else if (eventEmit.getMaxListeners() <= eventEmit.listenerCount()) {
                throw new Error('Listen for an event number is beyond maximum limit!');
            }
            // eventEmit.addListener(eventName, callBack);
        }
    };
    const EventEmitterComponent = (props) => {
        return (
            <ChildComponent {...props} onRaiseEvent={onRaiseEvent} onAddEvent={onAddEvent} />
        );
    };
    initEvent();
    return EventEmitterComponent;
};

export default ReactEventEmitter;
