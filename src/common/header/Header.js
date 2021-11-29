import React, { Fragment, useState } from 'react';
import logo from '../../assets/logo.svg';
import './Header.css';
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import SignInOutContainer from '../../screens/logInSignUp/signInOutContainer'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  

const Header = (props) => {
    const [userDetails, setUserDetails] = useState({
        "first_name": "",
        "last_name": "",
        "email_address": "",
        "mobile_number": "",
        "password": ""
    });
    const history = useHistory();
    const signUpSubmitHandler = (event, details) => {
        event.preventDefault();
        console.log("i m pressed");
        const params = {
            first_name: details.first_name,
            last_name: details.last_name,
            email_address: details.email_address,
            mobile_number: details.mobile_number,
            password: details.password
        };
        console.log("params=" + params.email_address);

        fetch(props.baseUrl + "signup", {
            body: JSON.stringify(params),
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            }
        }).then((rawResponse) =>  rawResponse.json() )
            .then((rawResponse) => {
                if (rawResponse.status === "ACTIVE") {                 
                    console.log("respoonse status="+rawResponse.status);
                    toggleModal();
                    history.push("/");
                }
                else {
                    // setRegisteredFlag(false);
                }
            }).catch(function (error) {
                console.error(error);
            });

    };
    const logInSubmitHandler = (event,details) => {
        event.preventDefault();
        console.log("details.email_address="+details.email_address);

        fetch(props.baseUrl + "auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Authorization:
                    "Basic " +
                    window.btoa(
                        details.email_address + ":" + details.password
                    ),
            }
        })
            .then((response) => {
                sessionStorage.setItem("access-token", response.headers.get("access-token"));
                return response.json();
            })
            .then((response) => {
                if (response.status === "ACTIVE") {
                    setLoggedInFlag(true);                    
                    console.log("loginrespoonse status="+response.status);                   
                    toggleModal();
                    history.push("/");
                }
            }).catch(function (error) {
                console.error(error);
            });

    };

    const [modalIsOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(!modalIsOpen);
    };
    const [loggedInFlag, setLoggedInFlag] = useState(sessionStorage.getItem("access-token") == null ? false : true);
    
    const [isLogInRegisterPressed, setloginregisterpressedflag] = useState(false);    
    const logInRegisterButtonHandler = () => {        
        setloginregisterpressedflag(true);
        setIsModalOpen(true);
    };
    
    const handleLogOut = (e) => {
        e.preventDefault();
        sessionStorage.removeItem("access-token");
        setLoggedInFlag(false);
    };
    const bookShowButtonHandler = () => {
        // setPopOverFlag(true);
        // <Popover
        //     anchorOrigin={{
        //         vertical: 'bottom',
        //         horizontal: 'left',
        //     }}
        // >
        //     <Typography sx={{ p: 2 }}>Please LogIn or Register to Book Show</Typography>
        //     console.log(registeredFlag);
        // </Popover>
    };

    return (
        <Fragment>
            <div className="HeaderMain">
                <div>
                    {<img src={logo} alt="logo" id="logo" />}
                </div>
                {loggedInFlag ?
                    (<div id="logInButton">
                        <div>
                            {/* <Link to="/logInSignUp"> */}
                            <Button
                                variant="contained"
                                onClick={handleLogOut}
                                color="default"
                            > LogOut
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                onClick={bookShowButtonHandler}
                                color="default"
                            > BookShow
                            </Button>
                        </div>
                    </div>)
                    :
                    (<div id="logInButton">
                        <div>
                            {/* <Link to="/logInSignUp"> */}
                            <Button
                                variant="contained"
                                onClick={logInRegisterButtonHandler}
                                color="default"
                            > LogIn/Register
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="default"
                            > BookShow
                            </Button>
                        </div>
                    </div>)
                }
            </div>
            {isLogInRegisterPressed ? (                
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={toggleModal}

                    style={customStyles}
                    contentLabel="ex Modal"

                >                    
                    <SignInOutContainer {...props} logInSubmitHandler={logInSubmitHandler} signUpSubmitHandler={signUpSubmitHandler} userDetails={userDetails} setUserDetails={setUserDetails} />
                    

                </Modal>
            ) : ("")}

            <div className="scrollBarTop" >
                Upcoming Movies
            </div>
            
        </Fragment>

    )
};
export default Header;
