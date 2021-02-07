import api from "../utils/api";

function SignoutAction() {

    let result = "";

    api.get('/signout')
    .then((res) => {
        result = res.data;
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
    })
    .catch((error) => {
        result = error.response;
    });
    return (<>{result}</>);
}

export default function Signout(props) {

    return (
        <SignoutAction />
    );
  }