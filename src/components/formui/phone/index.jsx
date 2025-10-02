// import { useState } from "react";

// import PhoneInput, {
//   formatPhoneNumber,
//   formatPhoneNumberIntl,
//   isValidPhoneNumber,
//   isPossiblePhoneNumber,
// } from "react-phone-number-input";

// function PhoneNumber() {
//   const [phone, setPhone] = useState(null);
//   const handleOnChange = (value) => {
//     setPhone(value);
//   };
//   return (
//     <>
//       <PhoneInput
//         placeholder="Enter phone number"
//         value={phone}
//         onChange={handleOnChange}
//         error={
//           phone
//             ? isValidPhoneNumber(phone)
//               ? undefined
//               : "Invalid phone number"
//             : "Phone number required"
//         }
//       />

//       <div>
//         Is possible: {phone && isPossiblePhoneNumber(phone) ? "true" : "false"}
//         Is valid: {phone && isValidPhoneNumber(phone) ? "true" : "false"}
//         National: {phone && formatPhoneNumber(phone)}
//         International: {phone && formatPhoneNumberIntl(phone)}
//       </div>
//     </>
//   );
// }
// export default PhoneNumber;
