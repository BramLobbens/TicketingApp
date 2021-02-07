import { render } from "react-dom";

export default function Footer(props) {
    return (<footer>{props.children}</footer>);
}

// export default function FooterContainer(props) {
//     return (
//         <>
//             <Footer.Header></Footer.Header>
//         </>
//     );
// }

// function Footer.Header(props) {
//     return (
//         <p>props</p>
//     );
// };