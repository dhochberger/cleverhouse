import React from 'react';
import TestRenderer from 'react-test-renderer';
import DeviceDisplay from '../components/DeviceDisplay'

const testRenderer = TestRenderer.create(
    <DeviceDisplay icon={"https://image.flaticon.com/icons/png/512/333/333519.png"} text={"Display test"}/>
  );

const testInstance = testRenderer.root;

test("Test text of device diplay", () => {
    expect(testInstance.findByType(DeviceDisplay).props.text).toBe('Display test');
})