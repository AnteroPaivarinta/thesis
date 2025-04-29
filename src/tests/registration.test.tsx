import React from 'react';
import "@testing-library/jest-dom";
import { render, fireEvent, act } from '@testing-library/react';
import Registration from "../views/Registration";
import axios from 'axios';

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    get: jest.fn(),
    create: () => ({
      post: jest.fn(),
      get: jest.fn(),
    }),
  },
}));


describe('Registration', () => {

 
  
  it('Making sure that user can send data with form', async () => {

    (axios.post as jest.Mock).mockResolvedValue({ data: 'OK' });

    const flushPromises = () => new Promise(resolve => setTimeout(resolve, 0));
    let inputValue = {target: {value: 'value'}};
    const { getByTestId, getByText } = render(<Registration/>);
    const firstNameInput = getByTestId("firstName");
    const lastNameInput = getByTestId("lastName");
    const emailInput = getByTestId("email");
    const ageInput = getByTestId("age");
    const genderInput = getByTestId("gender");
    const teamInput = getByTestId("team");
    const phoneInput = getByTestId("phone");
    const licenseCard = getByTestId("licenseCard");
    const robotButton = getByTestId("robotButton");
    const submitButton = getByTestId("sendButtonTwo");
    const dayButton = getByTestId("first");

    fireEvent.change(firstNameInput, {...inputValue, value: "firstName"});
    fireEvent.change(lastNameInput, {...inputValue, value: "lastName"});
    fireEvent.change(emailInput, {...inputValue, value: "antero.paivarinta@gmail.com"});
    fireEvent.change(ageInput, {...inputValue, value: "25"});
    fireEvent.change(genderInput, {...inputValue, value: "Male"});
    fireEvent.change(teamInput, {...inputValue, value: "TeamA"});
    fireEvent.change(phoneInput, {...inputValue, value: "324233094"});
    fireEvent.change(licenseCard, {...inputValue, value: true});
    await flushPromises();
    fireEvent.click(dayButton);
    await flushPromises();
    fireEvent.click(robotButton);
    await flushPromises();
    fireEvent.click(submitButton);
    
    await flushPromises();
    expect(axios.post).toHaveBeenCalled();
  })
});