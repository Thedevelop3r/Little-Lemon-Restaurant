import { fireEvent, render, screen } from "@testing-library/react";
// import App from "./App";
import ReservationForm from "./components/sections/reservePages/BookingForm"
import { fetchAPI } from "./bookingsAPI";
import { BrowserRouter } from "react-router-dom";

// faster components retesting
const RevervationComponent = (props) => {
  return (<BrowserRouter><ReservationForm availableTimes={fetchAPI(new Date())} /></BrowserRouter>);
};


test("Booking form tests and validation firstname || input exists?", () => {

  render(
    <RevervationComponent />
  );

  const firstNameInput = screen.getByLabelText(/First Name/);
  expect(firstNameInput).toBeInTheDocument();

});

test("Booking form firstname input required?", () => {
  render(
    <RevervationComponent />
  );

  const firstNameInput = screen.getByLabelText(/First Name/);
  expect(firstNameInput).toBeRequired();

});

test("Booking form firstname input min-max lenght?", () => {

  render(
    <RevervationComponent />
  );

  const firstNameInput = screen.getByLabelText(/First Name/);
  expect(firstNameInput).toHaveAttribute("minLength", "2");
  expect(firstNameInput).toHaveAttribute("maxLength", "50");

});

test("Booking form tests and validation lastname || input exists?", () => {

  render(
    <RevervationComponent />
  );

  const firstNameInput = screen.getByLabelText(/Last Name/);
  expect(firstNameInput).toBeInTheDocument();

});

test("Booking form lastname input not required?", () => {
  render(
    <RevervationComponent />
  );

  const firstNameInput = screen.getByLabelText(/Last Name/);
  expect(firstNameInput).not.toBeRequired();

});

test("Booking form lastname input min-max lenght?", () => {

  render(
    <RevervationComponent />
  );

  const firstNameInput = screen.getByLabelText(/Last Name/);
  expect(firstNameInput).toHaveAttribute("minLength", "2");
  expect(firstNameInput).toHaveAttribute("maxLength", "50");

});

const inputFieldsNames = ["First Name", "Last Name", "Email", "Phone Number", "Number of People", "Select Date", "Select Time", "Occasion", "Seating preferences", "Additional Comments"];


test("Booking form all input field checks 6 inputs? 3 selects? 1 TextArea?:", () => {

  render(<RevervationComponent />);


  const inputFields = inputFieldsNames.map(name => {
    return screen.getByLabelText(name);
  })


  inputFields.map(inputField => {

    expect(inputField).toBeInTheDocument();
    return inputField;
  });

});

test("Form Validtion Test for all inputs:", () => {

  render(
    <RevervationComponent />
  );
  const inputFields = inputFieldsNames.map(name => {
    return screen.getByLabelText(name);
  })

  // first name ?
  fireEvent.change(inputFields[0], {
    target: {
      value: "Bilal"
    }
  })
  // last name
  fireEvent.change(inputFields[1], {
    target: {
      value: "Amjad"
    }
  })
  // email
  fireEvent.change(inputFields[2], {
    target: {
      value: "Bilalamjad@mail.com"
    }
  })
  // phone numeber
  fireEvent.change(inputFields[3], {
    target: {
      value: "0312345678910"
    }
  })
  // number of peoples
  fireEvent.change(inputFields[4], {
    target: {
      value: 4
    }
  })
  // date
  fireEvent.change(inputFields[5], {
    target: {
      value: "02/27/2023"
    }
  })
  // time
  fireEvent.change(inputFields[6], {
    target: {
      value: "16:00"
    }
  })
  // occasion
  fireEvent.change(inputFields[7], {
    target: {
      value: "None"
    }
  })
  // seating prefrence
  fireEvent.change(inputFields[8], {
    target: {
      value: "Indoors"
    }
  })
  // comments

  fireEvent.change(inputFields[9], {
    target: {
      value: "with coke pepsi soda and a nice girl with beautiful eyes..."
    }
  })

  const submitButton = screen.getByText("Book Table");
  fireEvent.click(submitButton)

});


