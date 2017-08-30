import { EventEmitter } from 'events';
import React, { Component } from 'react';

const getReactEvent = () => {
    window.elmer = window.elmer || {};
    window.elmer.events = window.elmer.events || {
        emitter: new EventEmitter()
    };
    return window.elmer.events.emitter;
};

export const ReactEvent = getReactEvent();

export const onRaiseEvent = (eventName, data) => {
    const eventEmit = getReactEvent();
    eventEmit.emit(eventName, data);
};

export const onAddEvent = (eventName, callBack, isMultiple) => {
    const eventEmit = getReactEvent();
    if (isMultiple) {
        eventEmit.addListener(eventName, callBack);
    } else {
        if (eventEmit.listenerCount(eventName) > 0) {
            throw new Error(`event:"${eventName}" event already exists`);
        } else {
            eventEmit.addListener(eventName, callBack);
        }
    }
};

const ReactEventEmitter = (ChildComponent) => {
    const EventEmitterComponent = (props) => {
        return (
            <ChildComponent {...props} onRaiseEvent={onRaiseEvent} onAddEvent={onAddEvent} />
        );
    };
    return EventEmitterComponent;
};

export const RaiseError = (msg) => {
    const eventEmit = getReactEvent();
    eventEmit.emit('error', msg);
};

export const ConfigListeners = (config) => {
    if (config) {
        for (const key in config) {
            const tmpCallBack = config[key];
            if (typeof tmpCallBack === 'function') {
                onAddEvent(key, tmpCallBack);
            } else {
                RaiseError(`Configuration Error the Event ${key} callback is not function`);
            }
        }
    }
};

export default ReactEventEmitter;
