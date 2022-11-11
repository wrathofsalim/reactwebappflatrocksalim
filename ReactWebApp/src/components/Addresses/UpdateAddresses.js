// import * as addressServices from '../../services/AddressService';
// import { useAuthContext } from '../../contexts/AuthContext';
// import React, { useEffect, useState } from 'react';
// import Cities from "../../constants/bg.json"



// export default function UpdateAddress(prop) {
//     const { user } = useAuthContext();
//     let counter = 0;

//     const [id, SetId] = useState("");
//     const [name, SetName] = useState("");
//     const [street, SetStreet] = useState("");
//     const [city, SetCity] = useState("");

//     useEffect(() => {
//         addressServices.getById(prop.id)
//             .then(addressResult => {
//                 SetId(addressResult[0])
//                 SetName(addressResult[1]);
//                 let tempName = addressResult[1]
//                 let position = tempName.indexOf(',')
//                 let cityName = tempName.substring(0, position)
//                 let streetName = tempName.substring(position + 1, tempName.length)
//                 SetCity(cityName)
//                 SetStreet(streetName)
//             });
//     }, []);

//     const onAddressUpdate = (e) => {
//         e.preventDefault();
//         addressServices.edit({
//             id, name
//         }, user.accessToken);
//         window.location.reload(false);
//     }

//     const onAddressDelete = (e) => {
//         e.preventDefault();
//         addressServices.deleteById(id, user.accessToken)
//             .then(result => {
//                 console.log(result)
//                 window.location.reload(false);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }

//     const handleChangeSetCity = (e) => {
//         SetCity(e.target.value);
//         handleName(e.target.value, street);
//     };

//     const handleChangeSetStreet = (e) => {
//         SetStreet(e.target.value)
//         handleName(city, e.target.value);
//     }

//     const handleName = (city, street) => {
//         SetName(city + "," + street);
//     }

//     return (

//         <>
//             {user.userRoles[0] == 'Admin' ?
//                 <figure>
//                     <form onSubmit={onAddressUpdate} method="put">
//                         <div className="address_box">
//                             <h2>Create Address</h2>
//                             <h3>Select a city:</h3>
//                             <select value={city} onChange={handleChangeSetCity}>
//                                 {
//                                     Cities && Cities.map(city =>
//                                         <option key={counter++} value={city.city}>{city.city}</option>
//                                     )
//                                 }
//                             </select>
//                             <br />
//                             <br />
//                             <input value={street} onChange={handleChangeSetStreet}
//                                 className="inputs" type="text" name="street" id="street"
//                                 placeholder='Street name'
//                             />
//                             <p>{name}</p>                        </div>
//                         <div className="buttons">
//                             <button className="btn-img col-sm-3" type='submit'>
//                                 <img src="https://cdn-icons-png.flaticon.com/512/2387/2387613.png" alt="" />
//                             </button>
//                             <button className="btn-img col-sm-3 offset-sm-2" onClick={onAddressDelete}>
//                                 <img src="https://cdn-icons-png.flaticon.com/512/2602/2602768.png" alt="" />
//                             </button>
//                         </div>
//                         <br />
//                     </form>
//                 </figure>
//                 : "You are not allowed"}
//         </>
//     )
// }
