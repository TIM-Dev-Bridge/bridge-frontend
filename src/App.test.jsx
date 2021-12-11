import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

// const mockLocation = new URL('http://test.com/bridgebase')
//     delete window.location
//     window.location = mockLocation

describe("Test app.tsx", ()=> {

  // beforeEach(()=> {
  //   const mockLocation = new URL('http://test.com/bridgebase')
  //   delete window.location
  //   window.location = mockLocation
  // })

  test('renders learn react link', () => {
    render(<App />);
  });

  test(`Navigation not display on '/'`, ()=> {
    window.history.pushState({},'','/')
    render(<App />)
    expect(screen.queryByTestId('navbar')).toBeNull()
  })

  test(`Navigation not display on '/lobby'`, ()=> {
    window.history.pushState({},'','/lobby')
    render(<App />)
    expect(screen.queryByTestId('navbar')).toBeNull()
  })

  test(`Navigation display on '/bridgebase'`, ()=> {
    window.history.pushState({},'','/bridgebase')
    render(<App />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  test("Route to Edit Info", ()=> {
    window.history.pushState({},'','/bridgebase')
    render(<App />)
    userEvent.click(screen.getByTestId('user-icon'))
    expect(window.location.pathname).toEqual('/edit-information')
  })
})

