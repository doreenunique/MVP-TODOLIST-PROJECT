import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();
  const [user, setuser] = useState({
    _id: "",
    email: "",
  });
  

  useEffect(() => {
    if(localStorage.getItem("token")) {
      axios.post("http://localhost:3636/user/verify", {token: localStorage.getItem("token")}).then(({data}) =>{
        if(data._id) {
          setuser(data);
        } else {
          navigate("/");
        }
    })
    .catch(error =>{
      alert(`${error}`);
    })
    } else {
      navigate("/");
    }
  },[navigate])

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="App">

      <h1>This is the account of {user.email} </h1>
      <button
      onClick={()=>logout()}
      className="button"
      >
        Logout
      </button>      
    </div>
  );
}

export default Profile;