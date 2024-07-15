import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor, fireEvent, getByTestId } from '@testing-library/react'
import Registration from './views/Registration';
import axios from 'axios';
import selectEvent from 'react-select-event'

jest.mock('axios');
describe('Registration', () => {
  it('Making sure that user can send data with form', async () => {
    const obj = {
      PersonID: '123',
      firstName: '123',
      lastName: '123',
      age: '123',
      email: '123',
      gender: '123',
      phone: '123',
      tshirt: '123',
      team: '123',
      licenseCard: true,
      hopes: '123',
      freeText: '123',
      tasks: [],
      date: '123',
      days: [],
    }
    render(<Registration />)
    const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));
    
    fireEvent.change(screen.getByTestId('firstName') ,  {target: {value: 'testi'}});
    fireEvent.change(screen.getByTestId('lastName'),  {target: {value: 'testi'}});
    fireEvent.change(screen.getByTestId('age') ,  {target: {value: '23'}});
    fireEvent.change(screen.getByTestId('gender'),  {target: {value: 'Mies'}});
    fireEvent.change(screen.getByTestId('email'),  {target: {value: 'sposti@gmail.com'}});
    fireEvent.change(screen.getByTestId('team'),  {target: {value: 'tiimi'}});
    fireEvent.change(screen.getByTestId('phone'),  {target: {value: 'phone'}});
    fireEvent.change(screen.getByTestId('licenseCard'), true);
    fireEvent.change(screen.getByTestId('hopes'),  {target: {value: 'toivomuksia'}});
    fireEvent.click(screen.getByTestId('first'));
    fireEvent.change(screen.getByTestId('freetextfield'),  {target: {value: 'Vapaateksti'}});
    
    expect(screen.getByTestId('form')).toHaveFormValues({})
    await selectEvent.select(screen.getByLabelText('selectionbox'), ['avustaja palkintojen jaossa'])
    fireEvent.click(screen.getByTestId('robotButton'));

    const mockedAxios = axios as jest.Mocked<typeof axios>; 
    mockedAxios.get.mockResolvedValueOnce({ data: [obj] });
    mockedAxios.post.mockResolvedValueOnce({ data: {loginResponse: 'Right user and password'}} );

    fireEvent.click(screen.getByTestId('sendButtonTwo'));


    await flushPromises()
    await waitFor(() => {
        expect(() => {screen.getByTestId('validInputError')}).toThrow('Unable to find an element by: [data-testid="validInputError"]');
        expect(() => {screen.getByTestId('errorMessage')}).toThrow('Unable to find an element by: [data-testid="errorMessage"]');
        expect(mockedAxios.post).toBeCalled();
    });
  })



});