import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import LinearProgress from '@material-ui/core/LinearProgress';
import { User } from "../../model";
import { Author, Wrapper, Contents, Title } from "./Profile.style";
import { Container } from "@material-ui/core";


const Profile = () => {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        try {

            fetch(`http://${import.meta.env.VITE_BACKEND}:7700/user/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== 'success') {
                        setIsError(true);
                        setIsLoading(false);
                        return;
                    }
                    if (data.data === undefined) {
                        setUser({
                            "user_id": "-1",
                            "username": "Akafuyu",
                            "display_name": "Aka-nya",
                            "bio": "Hello! ",
                            "email": "akafy@arknight.ak"
                        })
                    } else {
                        let display_name = "";
                        let bio = "" ;
                        if(data.data.bio.Valid){
                            bio = data.data.bio.String
                        }

                        if(data.data.display_name){
                            display_name = data.data.display_name.String
                        }

                        console.log(display_name)
                        console.log(bio)

                        setUser({
                            "user_id": data.data.user_id,
                            "username": data.data.username,
                            "display_name": display_name,
                            "bio": bio,
                            "email": data.data.email
                        })

                    }

                    setIsLoading(false);
                })
        } catch (e) {
            if (e) {
                setIsError(true);
            }
        }
    }, []);

    if (isLoading) {
        return (
            <>
                <Navbar />
                <LinearProgress />
            </>
        );
    }

    if (isError) {
        return (
            <>
                <Navbar />
                Something went wrong...
            </>
        )
    }

    // console.log(user)
    return (
        <>
            <Navbar />
            <Wrapper>
                <Container>
                    <Contents>
                        <Title>{user?.username}</Title>

                        <p>Displayname: {user?.display_name}</p>

                        <h3>Bio</h3>
                        <Container>
                            <p>{user?.bio}</p>
                        </Container>

                        <p>Email: {user?.email}</p>

                    </Contents>
                </Container>
            </Wrapper>
        </>
    );
}

export default Profile;