import 'jasmine';
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import Register from '../src/Register';

describe('something', () => {

  it('should work', () => {
    const testMessage: string = 'hello happy world';

    render(<div>{ testMessage }</div>);
   
    console.log(screen.queryByText(testMessage));
    console.log('test');
    

    expect (screen.queryByText(testMessage)?.outerHTML).toBe('<div>hello happy world</div>')
  })
  
  it('should have "username" set to "TestName"', () => {
    const testName = 'TestName';
    const { baseElement } = render(<div><Register/></div>);

    const usernameInput = baseElement.querySelector('input[name="username"]')! as HTMLInputElement;
   
    fireEvent.change(usernameInput, {target: {
      name: usernameInput.name,
      value: testName
    }})

    expect ((screen.getByDisplayValue(testName) as HTMLInputElement).name)
      .toBe('username');
  })
});