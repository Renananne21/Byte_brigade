// import React, { useState, useEffect } from 'react';
// import { sentix_backend } from 'declarations/sentix_backend';

// const AccountInfo = () => {
//   const [accountInfo, setAccountInfo] = useState('Loading...');
//   const [depositInfo, setDepositInfo] = useState('Loading...');

//   useEffect(() => {
//     const fetchAccountInfo = async () => {
//       try {
//         const info = await sentix_backend.get_account_info();
//         setAccountInfo(info);
//       } catch (error) {
//         console.error("Error fetching account info:", error);
//         setAccountInfo('Error fetching account info');
//       }
//     };

//     const fetchDepositInfo = async () => {
//       try {
//         const info = await sentix_backend.get_deposit_info();
//         setDepositInfo(JSON.stringify(info, null, 2));
//       } catch (error) {
//         console.error("Error fetching deposit info:", error);
//         setDepositInfo('Error fetching deposit info');
//       }
//     };

//     fetchAccountInfo();
//     fetchDepositInfo();
//   }, []);

//   return (
//     <div>
//       <h1>Account Information</h1>
      
//       <div className="info-container">
//         <h2>Account Info</h2>
//         <pre>{accountInfo}</pre>
//       </div>

//       <div className="info-container">
//         <h2>Deposit Info</h2>
//         <pre>{depositInfo}</pre>
//       </div>
//     </div>
//   );
// };

// export default AccountInfo;