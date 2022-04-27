import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as service from "../../services/profile-service";

const EditProfile = () => {
    const [newUser,setNewUser] = useState({});
    const navigate = useNavigate();
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setNewUser({ ...newUser, profilePhoto: base64 });
    };
    const handleFileUploadHeader = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setNewUser({ ...newUser, headerImage: base64 });
    };
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const findMyProfile = () =>
        service.findUserById("my")
            .then(newUser => setNewUser(newUser));
    useEffect(findMyProfile, {});
    const editProfile = () =>
        service.updateUser("my",newUser)
            .then((user) => navigate('/profile/mytuits'))
            .catch(e => alert(e));
    return(
        <div className="ttr-edit-profile">
            <div className="border border-bottom-0">
                <Link to="/profile" className="btn btn-light rounded-pill fa-pull-left fw-bolder mt-2 mb-2 ms-2">
                    <i className="fa fa-close"/>
                </Link>
                <h4 className="p-2 mb-0 pb-0 fw-bolder">Edit profile</h4>
                <div className="mb-5 position-relative">
                    <img className="img" src={newUser.headerImage}/>
                    <div className="bottom-0 left-0 position-absolute">
                        <div className="position-relative">
                            <img className="position-relative ttr-z-index-1 ttr-top-40px ttr-width-150px"
                                 src={newUser.profilePhoto} height={40}/>
                        </div>
                    </div>
                </div>
            </div>
            <form onSubmit={editProfile}>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="username">Username</label>
                    <input id="username" title="Username" readOnly
                           className="p-0 form-control border-0"
                           placeholder="Username" value = {newUser.username}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="first-name">First name</label>
                    <input id="first-name" value = {newUser.firstName}
                           className="p-0 form-control border-0"
                           onChange={(e) =>
                               setNewUser({...newUser, firstName: e.target.value})}/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="last-name">Last name</label>
                    <input id="last-name"
                           className="p-0 form-control border-0" value = {newUser.lastName}
                           onChange={(e) =>
                               setNewUser({...newUser, lastName: e.target.value})}
                           placeholder="last-name"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="biography">Bio</label>
                    <textarea  value = {newUser.biography}
                        className="p-0 form-control border-0"
                        id="biography"
                        onChange={(e) =>
                        setNewUser({...newUser, biography: e.target.value})}
                               placeholder="biography" />
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label htmlFor="email">Email</label>
                    <input id="email" value = {newUser.email}
                           className="p-0 form-control border-0"
                           onChange={(e) =>
                               setNewUser({...newUser, email: e.target.value})}
                           type="email" placeholder="email"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label for="photo">Profile photo</label>
                    <input id="photo"
                           className="p-0 form-control border-0"
                           onChange={(e) =>
                               handleFileUpload(e)}
                           type="file"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label for="header">Header image</label>
                    <input id="header"
                           className="p-0 form-control border-0"
                           onChange={(e) =>
                               handleFileUploadHeader(e)}
                           type="file"/>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3">
                    <label>Select account</label>
                    <select className="p-0 form-control border-0"
                            id="accountType" value={newUser.accountType} onChange={(e) =>
                        setNewUser({...newUser, accountType: e.target.value})} >
                        <option value="Personal">Personal</option>
                        <option value="Academic">Academic</option>
                        <option value="Professional">Professional</option>
                    </select>
                </div>
                <div className="border border-secondary rounded-3 p-2 mb-3"> Marital Status
                    <label>
                        <input type="radio" value="Married"
                               checked={newUser.maritalStatus === 'Married'}
                               onChange={(e) =>
                                   setNewUser({...newUser, maritalStatus: e.target.value})} />
                        Married
                    </label>
                    <label>
                        <input type="radio" value="Single"
                               checked={newUser.maritalStatus === 'Single'}
                               onChange={(e) =>
                                   setNewUser({...newUser, maritalStatus: e.target.value})} />
                        Single
                    </label>
                    <label>
                        <input type="radio" value="Widowed"
                               checked={newUser.maritalStatus === 'Widowed'}
                               onChange={(e) =>
                                   setNewUser({...newUser, maritalStatus: e.target.value})} />
                        Widowed
                    </label>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary mb-5">Save></button>
                </div>
            </form></div>
    );
};
export default EditProfile;