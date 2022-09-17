import { Wrapper } from "./Alert.style";


type Props = {
    message: string;
}

const Alert: React.FC<Props> = ({ message }) => {
    return (
        <Wrapper>
            <div className="alert">
                <strong>{message}</strong>
            </div>
        </Wrapper>
    )
}

export default Alert;